# Prompt Repository 📚
**Prompt Repository** เป็นเว็บแอปพลิเคชัน (Web App) หน้าเดียวที่ถูกพัฒนาขึ้นเพื่อรวบรวม จดบันทึก และค้นหา Prompt ต่างๆ ของคุณได้อย่างสะดวกรวดเร็ว โดยทำงานประสานกับระบบฐานข้อมูลของ **Google Sheets** แบบเรียลไทม์ และออกแบบ User Interface (UI) ตามสไตล์ Modern Dark Orange Theme ที่พร้อมรองรับการใช้งานผ่านโทรศัพท์มือถือ (Mobile Responsive)

สงวนลิขสิทธิ์ &copy; 2026, โดย Tech for Ummah

![Prompt Repository UI Demo](https://img.shields.io/badge/UI-Responsive_Dark_Orange-ff7300?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/HTML5_|_CSS3_|_Vanilla_JS-1E1E1E?style=for-the-badge&logo=javascript)
![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script_|_Sheets_API-4285F4?style=for-the-badge&logo=google)

---

## ✨ ความสามารถหลักของระบบ (Features)
1. **ระบบความปลอดภัย (Login System):** เข้าใช้งานด้วยรหัสผ่านส่วนตัว (Password Protected) โดยตรวจสอบรหัสจาก Google Sheet โดยตรง
2. **เพิ่ม Prompt ใหม่ (Add Prompt):** สามารถกดบวก (➕) เพื่อเปิดฟอร์มสำหรับบันทึก Type, Use for, เนื้อหา Prompt และ Note เสริมได้
3. **ระบบค้นหาและกรอง (Search & Filter):** เรียกดูข้อมูลแยกตามหมวดหมู่ (Type) ได้อย่างว่องไว โดยการโหลดเฉพาะข้อมูลที่เรียกหา เพื่อป้องกันอาการหน้าเว็บกระตุก (Optimized Data Fetching)
4. **คัดลอกง่ายเพียงคลิก (One-Click Copy):** มีปุ่ม `📋 Copy Prompt` กดทีเดียวพร้อมนำไปวางใน ChatGPT, Gemini, หรือ Claude ได้เลย
5. **โหลดลื่นไหลสบายตา (Smooth Animations):** มาพร้อมการแสดงผลแบบมีชีวิตชีวา ทั้งหน้า Login แบบ Glassmorphism, ไอคอนหมุนโหลดข้อมูล, และ Animation Fade-in ของกล่องข้อมูล

---

## 🛠️ โครงสร้างไฟล์ (Project Structure)
- `index.html` - โครงสร้างหน้าเว็บหลัก พร้อมระบบ Login Overlay
- `style.css` - ตกแต่งสไตล์ โทน Dark Orange และ Responsive Design
- `script.js` - จัดการระบบ Authentication, รับส่งข้อมูลกับเซิร์ฟเวอร์ และจัดการ DOM
- `Code.gs` - ส่วนของ Backend สำหรับรันบน Google Apps Script

---

## 🚀 คู่มือการติดตั้ง (Installation Guide)

### ส่วนที่ 1: การเตรียมฐานข้อมูล (Google Sheets)
1. สร้าง **Google Sheet** ใหม่ในบัญชีของคุณ
2. **การตั้งค่า Sheet ข้อมูล:**
   - สร้างแท็บชื่อ **`prompts`**
   - บรรทัดที่ 1 (Header): คอลัมน์ A: `Type`, B: `Usefor`, C: `Prompt`, D: `Note`
3. **การตั้งค่า Sheet รหัสผ่าน:**
   - สร้างแท็บชื่อ **`admin`**
   - พิมพ์รหัสผ่านที่คุณต้องการไว้ที่ **ช่อง A1** ของ Sheet นี้ (เช่น `3821`)
4. คัดลอก **Spreadsheet ID** จากแถบ URL ด้านบน

### ส่วนที่ 2: การตั้งค่า Backend (Google Apps Script)
1. ในหน้าต่าง Google Sheet ให้กดไปที่เมนู **ส่วนขยาย (Extensions) > Apps Script**
2. ลบโค้ดเริ่มต้นออก แล้วนำเนื้อหาจากไฟล์ **`Code.gs`** ไปวางแทนที่
3. แก้ไข `SPREADSHEET_ID` ในบรรทัดที่ 2 ให้เป็น ID ของคุณ
4. กดที่ปุ่ม **การทำให้ใช้งานได้ (Deploy)** -> **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
5. เลือกประเภท: **เว็บแอป (Web app)**
6. สิทธิ์เข้าถึง: เลือกเป็น **"ทุกคน (Anyone)"** 
7. กด **Deploy** และกดยอมรับสิทธิ์ให้เรียบร้อย
8. คัดลอก **URL เว็บแอป (Web App URL)** ที่ได้มา

### ส่วนที่ 3: การตั้งค่า Frontend
1. เปิดไฟล์ **`script.js`**
2. วาง `Web App URL` ที่เพิ่งได้มาทับลงในตัวแปร `SCRIPT_URL` ด้านบนสุดของไฟล์
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/xxxx/exec';
   ```

### ส่วนที่ 4: การใช้งานครั้งแรก
1. เปิดไฟล์ `index.html` ผ่าน Browser
2. ระบบจะแสดงหน้าจอ Login ให้กรอกรหัสผ่านที่คุณตั้งไว้ใน Sheet `admin`
3. เมื่อเข้าสู่ระบบสำเร็จ ระบบจะจำรหัสผ่านไว้ในเครื่อง ทำให้ไม่ต้องกรอกซ้ำบ่อยๆ

---

*สร้างสรรค์ขึ้นเพื่ออำนวยความสะดวกในการจัดเก็บพรอมป์อย่างปลอดภัย*