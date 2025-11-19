# 🔐 FUTURE_CS_03 — Secure File Sharing System (AES Encryption)

**Intern:** Jojin John  
**Track:** Cyber Security  
**Mentor:** Future Interns  
**Task:** 03 — Secure File Upload & Download System  
**Tech Stack:** Node.js, Express.js, AES-256-CBC, HTML/CSS/JS

---

## 📌 Project Overview
This project implements a **Secure File Sharing System** where users can:

✔ Upload files  
✔ Files are encrypted using **AES-256-CBC**  
✔ Encrypted files are stored securely  
✔ Files can be downloaded and decrypted on demand  
✔ Frontend includes drag-and-drop upload, progress bar, modern UI

This simulates a real-world secure storage system used in:

- 📁 Corporates  
- 🏥 Healthcare  
- ⚖️ Legal firms  
- 🛡️ Cybersecurity operations  

---

## 🔒 Encryption Details (Important for Cyber Security)
### **Algorithm Used**
- **AES-256-CBC** (256-bit symmetric encryption)
- Random **IV (Initialization Vector)** generated per file
- `.enc` encrypted files stored inside `encrypted_files/`
- Decryption restores the original file

### **Key Management**
- AES key stored in **.env**
- 32-byte key → must be **64 hex characters**

Example:
```
AES_KEY=4097645146b73a0a89ff2fa1fcce921d06703bcfaa9f918fd4d771e61e6ef486
```

---

## 📁 Folder Structure
```
FUTURE_CS_03/
│── app.js
│── package.json
│── package-lock.json
│── .gitignore
│── README.md
│── .env      (not uploaded for security)
│
├── templates/
│   ├── upload.html
│   ├── download.html
│
├── encrypted_files/
│   └── .gitkeep
│
└── decrypted_temp/
    └── .gitkeep
```

---

## 🚀 How to Run Locally

### **1️⃣ Install dependencies**
```
npm install
```

### **2️⃣ Create `.env` file**
```
AES_KEY=your_64_hex_key_here
```

To generate AES key:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **3️⃣ Start server**
```
node app.js
```

### **4️⃣ Open browser**
```
http://localhost:3000
```

---

## 🖥️ Features (UI + Security)

### 🔐 Security Features
- AES-256 encryption at rest
- Secure key handling
- Prevents plaintext storage
- No file execution (safe handling)

### 🎨 UI Features
- Drag & drop file upload  
- Progress bar during encryption  
- Beautiful dark themed dashboard  
- Success animation & redirect  
- Clean download page with decrypt button  

---

## 📸 Screenshots

### 🔼 Upload Page  
✔ Drag & Drop  
✔ File Preview  
✔ Progress Bar  

*(Screenshots can be added here in your GitHub repo)*

### ⬇️ Download Page  
✔ Shows encrypted files  
✔ Auto decrypt on download  

---

## 📝 Conclusion
This task helped me learn:

- AES encryption & IV handling  
- Secure backend file management  
- Node.js + Express development  
- Frontend UX for file transfer  
- Cybersecurity principles in real systems  

The project is fully functional and ready for evaluation.

---

## ⭐ Author
**Jojin John**  
Cyber Security Intern @ Future Interns  
🔗 LinkedIn: https://www.linkedin.com/in/jojin-john-74386bb34/
