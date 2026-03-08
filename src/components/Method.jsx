import Navbar from './Navbar';

function Method() {
  const inputData = [
    {
      title: 'Digital Surface Model (DSM)',
      detail: 'Raster .tif, Cell Size 0.3 × 0.3 เมตร, ใช้คำนวณความชัน (Slope) และทิศทางลาดเอียง (Aspect)'
    },
    {
      title: 'Building Footprints',
      detail: 'Vector .shp จาก Open Buildings Dataset, 11,527 polygons ใช้เป็นขอบเขตอาคารสำหรับวิเคราะห์รายหลังคา'
    },
    {
      title: 'Global Tilted Irradiation (GTI)',
      detail: 'Raster .tif จาก Global Solar Atlas, หน่วย kWh/m²/yr ใช้เป็นข้อมูลรังสีดวงอาทิตย์เฉลี่ยรายปี'
    }
  ];

  const analysisSteps = [
    {
      title: '1) เตรียมข้อมูลพื้นฐาน',
      body: 'นำเข้า DSM, ขอบเขตอาคาร และข้อมูลรังสีดวงอาทิตย์เข้าสู่ระบบ GIS จากนั้นใช้ Hillshade เพื่อช่วยตีความพื้นที่รับแสงและบริบทภูมิประเทศ'
    },
    {
      title: '2) วิเคราะห์ Slope และ Aspect',
      body: 'คำนวณค่าความชันและทิศทางของพื้นผิวหลังคาจาก DSM เพื่อระบุว่าหลังคาใดมีเงื่อนไขทางกายภาพเหมาะสมต่อการติดตั้งแผงโซลาร์เซลล์'
    },
    {
      title: '3) คัดกรองพื้นที่เหมาะสม (Con)',
      body: 'ใช้เครื่องมือ Conditional (Con) ใน ArcGIS คัดเฉพาะเซลล์ที่ผ่านเงื่อนไขด้านความชันและทิศทาง แล้วสร้างราสเตอร์พื้นที่เหมาะสม'
    },
    {
      title: '4) สรุปเชิงสถิติรายอาคาร',
      body: 'ใช้ Zonal Statistics as Table เพื่อคำนวณ COUNT, AREA และ MEAN ของรังสีดวงอาทิตย์ภายในขอบเขตอาคารแต่ละหลัง'
    },
    {
      title: '5) ประเมินพลังงานที่รับและผลิตได้',
      body: 'คำนวณพลังงานแสงอาทิตย์รวมบนหลังคา (S) และพลังงานไฟฟ้าที่ผลิตได้ (E) โดยใช้ค่าประสิทธิภาพแผงและค่า PR'
    },
    {
      title: '6) เตรียมข้อมูลเพื่อเว็บแมพ',
      body: 'แปลงผลลัพธ์เป็น GeoJSON เพื่อแสดงผลร่วมกับ React + Leaflet บนเว็บแผนที่แบบโต้ตอบ'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8 sm:space-y-10">
        <section className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 shadow-sm">
          <p className="text-blue-300 text-sm font-medium">บทที่ 3 • ขั้นตอนการดำเนินงานวิจัย</p>
          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white tracking-tight">
            การวิเคราะห์ข้อมูลเชิงพื้นที่เพื่อประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร
          </h1>
          <p className="mt-4 text-slate-300 leading-relaxed max-w-4xl">
            เนื้อหานี้สรุปจากบทที่ 3 ของรายงาน โดยเน้นเฉพาะกระบวนการวิเคราะห์ข้อมูลแบบละเอียด ตั้งแต่การเตรียมข้อมูลเชิงพื้นที่
            การคำนวณปัจจัยทางกายภาพของหลังคา การคัดกรองพื้นที่เหมาะสม ไปจนถึงการประเมินพลังงานแสงอาทิตย์และพลังงานไฟฟ้าที่ผลิตได้
            เพื่อให้เข้าใจตรรกะการวิเคราะห์ของระบบ SolarSuit-KKU อย่างเป็นขั้นตอน
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">ชุดข้อมูลที่ใช้ในการวิเคราะห์</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {inputData.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-blue-500/30 transition-colors shadow-sm">
                <h3 className="font-semibold text-blue-200">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">ขั้นตอนการวิเคราะห์ข้อมูล (Detailed Workflow)</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-blue-500/30 transition-colors shadow-sm">
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">เกณฑ์คัดกรองความเหมาะสมของหลังคา</h2>
            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed list-disc pl-5">
              <li>หลังคาเอียงที่เหมาะสม: ความชันไม่เกิน 45° (Slope ≤ 45°)</li>
              <li>ทิศทางหลังคาที่เหมาะสม: ช่วง 67.5°–292.5° (ตะวันออก–ใต้–ตะวันตก)</li>
              <li>หลังคาแบน: ความชันต่ำกว่า 10° (Slope &lt; 10°) ถือว่ามีศักยภาพสูง เพราะปรับมุมติดตั้งได้ยืดหยุ่น</li>
              <li>ใช้ Conditional (Con) สร้างแผนที่หน้ากากเพื่อเก็บเฉพาะพื้นที่ผ่านเกณฑ์</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">การคำนวณพลังงาน</h2>
            <div className="mt-4 space-y-4 text-slate-300">
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 shadow-sm">
                <p className="text-sm font-semibold text-blue-200">สมการพลังงานแสงอาทิตย์รวมบนหลังคา</p>
                <p className="mt-2 text-sm sm:text-base">S = (A × H) / 1000</p>
                <p className="mt-2 text-xs sm:text-sm">โดย A = พื้นที่หลังคา (m²), H = รังสีเฉลี่ยรายปี (kWh/m²/yr), S = พลังงานรวม (MWh/yr)</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 shadow-sm">
                <p className="text-sm font-semibold text-blue-200">สมการพลังงานไฟฟ้าที่ผลิตได้</p>
                <p className="mt-2 text-sm sm:text-base">E = S × r × PR</p>
                <p className="mt-2 text-xs sm:text-sm">โดย r = ประสิทธิภาพแผง (ช่วง 15–20%), PR = ประสิทธิภาพระบบ (ใช้ 0.86), E = ไฟฟ้าที่ผลิตได้ (MWh/yr)</p>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">สรุปเชิงระบบ</h2>
          <p className="mt-3 text-slate-200 leading-relaxed">
            ผลการวิเคราะห์จากบทที่ 3 ชี้ให้เห็นว่าการผสานข้อมูล DSM + Building Footprints + GTI ภายใต้กระบวนการ GIS
            ช่วยระบุหลังคาที่เหมาะสมได้อย่างเป็นรูปธรรม และสามารถแปลงผลลัพธ์เชิงวิศวกรรมให้เป็นข้อมูลเชิงพื้นที่ในรูปแบบ
            GeoJSON เพื่อแสดงผลบนเว็บแมพได้โดยตรง สนับสนุนการตัดสินใจด้านพลังงานทดแทนในระดับอาคารอย่างแม่นยำและตรวจสอบย้อนกลับได้
          </p>
        </section>
      </main>
    </div>
  );
}

export default Method;