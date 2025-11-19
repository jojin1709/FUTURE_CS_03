// app.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

const ENC_DIR = path.join(__dirname, 'encrypted_files');
const DEC_DIR = path.join(__dirname, 'decrypted_temp');

if (!fs.existsSync(ENC_DIR)) fs.mkdirSync(ENC_DIR);
if (!fs.existsSync(DEC_DIR)) fs.mkdirSync(DEC_DIR);

// AES key from .env
const KEY_HEX = process.env.AES_KEY;
if (!KEY_HEX) {
  console.error('ERROR: AES_KEY not set in .env (must be 64 hex chars)');
  process.exit(1);
}
const AES_KEY = Buffer.from(KEY_HEX, 'hex');
if (AES_KEY.length !== 32) {
  console.error('ERROR: AES_KEY must be 32 bytes (64 hex chars)');
  process.exit(1);
}

// serve templates folder
app.use('/static', express.static(path.join(__dirname, 'templates')));

// home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'upload.html'));
});

// upload + encrypt route
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file || !req.file.originalname)
      return res.status(400).send('No file uploaded');

    const originalName = req.file.originalname;
    const fileBuffer = req.file.buffer;

    // generate random IV
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv);

    const encrypted = Buffer.concat([
      iv,
      cipher.update(fileBuffer),
      cipher.final()
    ]);

    const outPath = path.join(ENC_DIR, originalName + '.enc');
    fs.writeFileSync(outPath, encrypted);

    // show success page
    return res.sendFile(path.join(__dirname, 'templates', 'success.html'));

  } catch (error) {
    console.error(error);
    return res.status(500).send('Encryption error');
  }
});

// success page route (required)
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'success.html'));
});

// download page
app.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'download.html'));
});

// provide encrypted file list (API)
app.get('/api/files', (req, res) => {
  const files = fs.readdirSync(ENC_DIR).filter(f => f.endsWith('.enc'));
  res.json(files);
});

// decrypt + download route
app.get('/download/:filename', (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const encPath = path.join(ENC_DIR, filename);

    if (!fs.existsSync(encPath))
      return res.status(404).send('File not found');

    const encryptedBuffer = fs.readFileSync(encPath);
    const iv = encryptedBuffer.slice(0, 16);
    const ciphertext = encryptedBuffer.slice(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final()
    ]);

    const originalName = filename.replace(/\.enc$/, '');
    const tempPath = path.join(DEC_DIR, originalName);
    fs.writeFileSync(tempPath, decrypted);

    res.download(tempPath, originalName, err => {
      try { fs.unlinkSync(tempPath); } catch (_) {}
      if (err) console.error(err);
    });

  } catch (err) {
    console.error('Decryption error:', err);
    return res.status(500).send('Decryption failed');
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Secure file server running at http://localhost:${PORT}`);
});
