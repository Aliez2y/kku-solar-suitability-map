# ☀️ SolarSuit-KKU (Solar Suitability Web Map)
แอปพลิเคชันแผนที่บนเว็บ (Web Map Application) สำหรับแสดงผลการประเมินศักยภาพและประเมินความเหมาะสมในการติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาอาคาร ในเขตเทศบาลนครขอนแก่น 
## ✨ จุดเด่นและฟีเจอร์หลัก (Features)
- 🗺️ **Interactive Map**: แสดงผลแผนที่แบบโต้ตอบได้ด้วย Leaflet มีเลเยอร์พื้นฐานให้เลือก (ตึก, ภาพถ่ายดาวเทียม, แผนที่มืด)
- 🏢 **Building Data (GeoJSON)**: แสดงคลิกเพื่อดูรายละเอียดเชิงลึกของแต่ละอาคาร
- 🌡️ **Solar Radiation Tiles**: เลเยอร์ความเข้มรังสีดวงอาทิตย์ (ความละเอียดสูง)
- 📊 **Dashboard & Statistics**: สรุปข้อมูลภาพรวมเชิงพื้นที่ (จำนวนหลัง, พื้นที่ที่เหมาะสม, ศักยภาพการผลิตไฟฟ้า, มูลค่าไฟฟ้าที่ประหยัดได้)
- 🖥️ **Responsive Design**: รองรับการใช้งานทั้งบนคอมพิวเตอร์และหน้าจอมือถือ
- 🌙 **Dark Mode UI**: หน้าตาผู้ใช้งานสวยงามทันสมัย อ่านง่าย ลดแสงสะท้อน
## 🛠️ โครงสร้างเทคโนโลยี (Tech Stack)
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Map Library**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: React Router DOM
- **Deployment & Routing setup**: `.htaccess` (สำหรับเซิร์ฟเวอร์ Apache) / `vercel.json` (สำหรับ Vercel Serverless)
## 🚀 การติดตั้งและรันในเครื่อง (Local Development)
### 1. ความต้องการของระบบ (Prerequisites)
- [Node.js](https://nodejs.org/en/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
- npm หรือ yarn
### 2. การติดตั้ง (Installation)
เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรันคำสั่ง:
```bash
npm install
```
### 3. เริ่มต้นเซิร์ฟเวอร์จำลอง (Start Dev Server)
รันคำสั่งด้านล่างเพื่อเปิดโหมดนักพัฒนา:
```bash
npm run dev
```
จากนั้นเข้าไปที่ลิงก์ตามที่ปรากฏใน Terminal (ปกติคือ `http://localhost:5173`)
## 📦 การเตรียมไฟล์สำหรับขึ้นเซิร์ฟเวอร์จริง (Production Deployment)
### สำหรับอัปโหลดขึ้นโฮสติ้งทั่วไป (เช่น HestiaCP, cPanel, DirectAdmin)
1. รันคำสั่งรวมไฟล์:
   ```bash
   npm run build
   ```
2. เมื่อเสร็จสิ้น โค้ดทั้งหมดพร้อมใช้งานจะไปรวมอยู่ในแฟ้ม `dist/`
3. บีบอัดโฟลเดอร์ `dist` เป็นไฟล์ `.zip`
4. นำไฟล์อัปโหลดไปไว้ที่โฟลเดอร์ `public_html` (หรือโฟลเดอร์ Web root) บนเครื่องเซิร์ฟเวอร์
5. ทำการคลายการบีบอัด (Extract)
> **ข้อควรระวังเกี่ยวกับ Tile Layer**: แผนที่บางส่วนถูกแบ่งเป็นภาพย่อย (Tile) จำนวนหลายหมื่นไฟล์ ซึ่งหากคุณใช้โฟลเดอร์ `TilePNG` รวมไปในการ Zip แล้วนำไปให้ระบบ File Manager ของ Hosting (เช่น HestiaCP) แตกไฟล์ให้อาจจะทำให้เกิดการ Timeout หรือค้างได้ (แนะนำให้อัปโหลดแยกต่างหากผ่านโปรแกรม FTP เช่น FileZilla หรือฝากไฟล์บน Cloudflare R2 / AWS S3)
### สำหรับ Vercel
โปรเจกต์นี้มีการกำหนดตั้งค่า `vercel.json` เรียบร้อยแล้ว สามารถเชื่อมต่อ Github หรือโยนโฟลเดอร์ขึ้นไป Deploy บน Vercel ได้โดยตรงผ่านหน้า UI ได้เลย
## 📁 โครงสร้างโปรเจกต์คร่าวๆ (Folder Structure)
```
solar-webmap/
├── public/                 # ไฟล์รูป โลโก้ และข้อมูลดิบที่ต้องการให้อ่านได้ทันที
│   ├── BuildingNKK_SR.geojson 
│   ├── TilePNG/            # Folder ภาพ Tile ของรังสีดวงอาทิตย์ (ถ้ามี)
│   └── .htaccess           # สำหรับจัดการ SPA Path ของ Apache
├── src/                    # Source Code ภายใน
│   ├── components/         # ชิ้นส่วน UI หลัก (Home, Navbar, MapContent, Stats, About, Method)
│   ├── App.jsx             # จุดศูนย์กลางของแอปจัดการ Route
│   ├── index.css           # สไตล์หลักของเว็บไซต์ (ใช้ Tailwind)
│   └── main.jsx            # จุดรัน React Root
├── package.json            # ระบุ Library และคำสั่ง npm
├── vercel.json             # ตั้งค่าการ Route ให้ Vercel จัดการ Single Page App
└── README.md
```
## 👥 ข้อความทิ้งท้าย
โปรเจกต์นี้ถูกออกแบบมาเพื่อวิเคราะห์หาศักยภาพและรองรับการขยายตัวของการใช้งานพลังงานสะอาดในพื้นที่ หากพบปัญหาบั๊กหรือสามารถพัฒนาเพิ่มเติม สามารถแก้ไขได้ตามอิสระจากไลบรารี React Leaflet ครับ
