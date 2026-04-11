# Prompt Repository 📚
**Prompt Repository** เป็นเว็บแอปพลิเคชัน (Web App) หน้าเดียวที่ถูกพัฒนาขึ้นเพื่อรวบรวม จดบันทึก และค้นหา Prompt ต่างๆ ของคุณได้อย่างสะดวกรวดเร็ว โดยทำงานประสานกับระบบฐานข้อมูลของ **Google Sheets** แบบเรียลไทม์ และออกแบบ User Interface (UI) ตามสไตล์ Modern Dark Orange Theme ที่พร้อมรองรับการใช้งานผ่านโทรศัพท์มือถือ (Mobile Responsive)

สงวนลิขสิทธิ์ &copy; 2026, โดย Tech for Ummah

![Prompt Repository UI Demo](https://img.shields.io/badge/UI-Responsive_Dark_Orange-ff7300?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/HTML5_|_CSS3_|_Vanilla_JS-1E1E1E?style=for-the-badge&logo=javascript)
![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script_|_Sheets_API-4285F4?style=for-the-badge&logo=google)

---

## ✨ ความสามารถหลักของระบบ (Features)
1. **เพิ่ม Prompt ใหม่ (Add Prompt):** สามารถกดบวก (➕) เพื่อเปิดฟอร์มสำหรับบันทึก Type, Use for, เนื้อหา Prompt และ Note เสริมได้
2. **ระบบค้นหาและกรอง (Search & Filter):** เรียกดูข้อมูลแยกตามหมวดหมู่ (Type) ได้อย่างว่องไว โดยการโหลดเฉพาะข้อมูลที่เรียกหา เพื่อป้องกันอาการหน้าเว็บกระตุก (Optimized Data Fetching)
3. **คัดลอกง่ายเพียงคลิก (One-Click Copy):** มีปุ่ม `📋 Copy Prompt` กดทีเดียวพร้อมนำไปวางใน ChatGPT, Gemini, หรือ Claude ได้เลย
4. **โหลดลื่นไหลสบายตา (Smooth Animations):** มาพร้อมการแสดงผลแบบมีชีวิตชีวา ทั้งไอคอนหมุนโหลดข้อมูล, Dropdown แสดงจังหวะโหลด (Pulse loading), และ Animation Fade-in ของกล่องข้อมูล
5. **ฟรีและโฮสต์ง่าย (Static Hosting Friendly):** สามารถโยนไฟล์ `index.html`, `style.css`, `script.js` ไปที่ GitHub Pages เพื่อใช้งานได้ฟรีทันที

---

## 🛠️ โครงสร้างไฟล์ (Project Structure)
- `index.html` - โครงสร้างหน้าเว็บหลัก
- `style.css` - ตกแต่งสไตล์ โทน Dark Orange และ Responsive Design
- `script.js` - รับส่งข้อมูล (Fetch API) กับเซิร์ฟเวอร์, จัดการ DOM และ Animation
- `Code.gs` - ส่วนของ Backend ให้นำไปวางใน Google Apps Script

---

## 🚀 คู่มือการติดตั้ง (Installation Guide)

### ส่วนที่ 1: การเตรียมฐานข้อมูล (Google Sheets)
1. สร้าง **Google Sheet** ใหม่ในบัญชีของคุณ
2. เปลี่ยนชื่อ Sheet (แท็บด้านล่าง) เป็นคำว่า **`prompts`**
3. ที่บรรทัดแรกสุด (Row 1) ให้ใส่หัวข้อคอลัมน์ (Header) ดังนี้:
   - คอลัมน์ A: `Type`
   - คอลัมน์ B: `Usefor`
   - คอลัมน์ C: `Prompt`
   - คอลัมน์ D: `Note`
4. คัดลอก **Spreadsheet ID** จากแถบ URL ด้านบน (ข้อความยาวๆ ระหว่าง `/d/` และ `/edit`)

### ส่วนที่ 2: การตั้งค่า Backend (Google Apps Script)
1. ในหน้าต่าง Google Sheet ให้กดไปที่เมนู **ส่วนขยาย (Extensions) > Apps Script**
2. ลบโค้ดเริ่มต้นออก แล้วนำเนื้อหาทั้งหมดจากไฟล์ **`Code.gs`** ใน Repository นี้ไปวางแทนที่
3. ที่บรรทัดที่ 2 ในโค้ด ให้แก้ไขตัวแปร `SPREADSHEET_ID` โดยนำ ID ที่คัดลอกไว้มาวางตรงนี้:
   ```javascript
   const SPREADSHEET_ID = 'นำ_SPREADSHEET_ID_ของคุณมาวางที่นี่';
   ```
4. กดที่ปุ่ม **การทำให้ใช้งานได้ (Deploy)** มุมขวาบน -> เลือก **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
5. เลือกประเภท (Select Type) รูปเฟือง: เลือก **เว็บแอป (Web app)**
6. ตั้งค่าการเข้าถึง:
   - สิทธิ์เข้าถึง (Who has access): ให้เลือกเป็น **"ทุกคน (Anyone)"** 
7. กด **Deploy** และกดยอมรับสิทธิ์ (Authorize access) ให้เรียบร้อย
8. คัดลอก **URL เว็บแอป (Web App URL)** ที่ได้เก็บไว้

### ส่วนที่ 3: การตั้งค่า Frontend ให้เชื่อมต่อกัน
1. กลับมาที่ไฟล์ในเครื่องของคุณ (หรือบน GitHub)
2. เปิดไฟล์ **`script.js`**
3. หาตัวแปร `SCRIPT_URL` ในด้านบนสุดของไฟล์ และวาง `Web App URL` ที่เพิ่งได้มาทับลงไป
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/xxxx/exec';
   ```

### ส่วนที่ 4: การเผยแพร่หน้าเว็บ (Deployment)
ระบบนี้เป็นเพียงแค่ไฟล์ Static HTML คุณสามารถนำมันขึ้นไปฝากที่โฮสติ้งฟรีต่างๆ ได้ทันที อาทิเช่น:
- **GitHub Pages** (แนะนำ)
- Vercel
- Netlify 

เพียงอัปโหลดไฟล์ `index.html`, `style.css`, และ `script.js` ขึ้นไป คุณก็สามารถเข้าใช้งาน Prompt Repository แบบออนไลน์ได้ตลอด 24 ชั่วโมง!

---

*สร้างสรรค์ขึ้นเพื่ออำนวยความสะดวกในการจัดเก็บพรอมป์*