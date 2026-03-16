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
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8 sm:space-y-12 relative z-10 animate-fade-up">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--color-brand-emerald)]/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none -z-10"></div>

        <section className="rounded-3xl border border-white/5 bg-[var(--color-surface-1)]/50 backdrop-blur-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <p className="font-outfit text-sm font-bold tracking-widest text-[var(--color-brand-emerald)] uppercase mb-3 drop-shadow-sm">Methodology</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
            การวิเคราะห์ข้อมูลเชิงพื้นที่เพื่อประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-4xl relative z-10">
            เนื้อหานี้สรุปจากบทที่ 3 ของรายงาน โดยเน้นเฉพาะกระบวนการวิเคราะห์ข้อมูลแบบละเอียด ตั้งแต่การเตรียมข้อมูลเชิงพื้นที่
            การคำนวณปัจจัยทางกายภาพของหลังคา การคัดกรองพื้นที่เหมาะสม ไปจนถึงการประเมินพลังงานแสงอาทิตย์และพลังงานไฟฟ้าที่ผลิตได้
            เพื่อให้เข้าใจตรรกะการวิเคราะห์ของระบบ SolarSuit-KKU อย่างเป็นขั้นตอน
          </p>
        </section>

        <section className="animate-fade-up delay-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-1 bg-[var(--color-brand-emerald)] rounded-full inline-block shadow-[0_0_10px_var(--color-brand-emerald)]"></span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">ชุดข้อมูลที่ใช้ในการวิเคราะห์</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inputData.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/5 bg-[var(--color-surface-2)]/80 p-6 hover:-translate-y-1 hover:border-[var(--color-brand-emerald)]/30 transition-all duration-300 shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-emerald)]/10 text-[var(--color-brand-emerald)] flex items-center justify-center mb-4 border border-[var(--color-brand-emerald)]/20 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                </div>
                <h3 className="font-bold text-white text-lg tracking-wide">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-loose">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="animate-fade-up delay-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-1 bg-blue-500 rounded-full inline-block shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">ขั้นตอนการวิเคราะห์ข้อมูล</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisSteps.map((step, idx) => (
              <article key={step.title} className="rounded-2xl border border-white/5 bg-[var(--color-surface-2)]/80 p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)]">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-outfit text-6xl font-black italic text-white group-hover:scale-110 group-hover:text-blue-500 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-white text-lg relative z-10 drop-shadow-sm">{step.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-loose relative z-10">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up delay-300">
          <article className="rounded-3xl border border-white/5 bg-[var(--color-surface-1)]/80 p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-amber)]/5 rounded-bl-full"></div>
            <h2 className="text-2xl font-bold text-white mb-6">เกณฑ์คัดกรองความเหมาะสมของหลังคา</h2>
            <ul className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed relative z-10">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-brand-amber)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong>หลังคาเอียงที่เหมาะสม:</strong> ความชันไม่เกิน 45° (Slope ≤ 45°)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-brand-amber)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong>ทิศทางหลังคาที่เหมาะสม:</strong> ช่วง 67.5°–292.5° (ตะวันออก–ใต้–ตะวันตก)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-brand-amber)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong>หลังคาแบน:</strong> ความชันต่ำกว่า 10° (Slope &lt; 10°) ถือว่ามีศักยภาพสูง เพราะปรับมุมติดตั้งได้ยืดหยุ่น</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--color-brand-amber)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>ใช้ Conditional (Con) สร้างแผนที่หน้ากากเพื่อเก็บเฉพาะพื้นที่ผ่านเกณฑ์</span>
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/5 bg-[var(--color-surface-1)]/80 p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-6">การคำนวณพลังงาน</h2>
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                <p className="text-sm font-bold tracking-wide text-[var(--color-brand-emerald)] font-outfit uppercase drop-shadow-sm">Total Solar Radiation</p>
                <div className="flex items-baseline gap-4 mt-2">
                  <p className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-widest">S = (A × H) / 1000</p>
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">โดย A = พื้นที่หลังคา (m²), H = รังสีเฉลี่ยรายปี (kWh/m²/yr), S = พลังงานรวม (MWh/yr)</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                <p className="text-sm font-bold tracking-wide text-blue-400 font-outfit uppercase drop-shadow-sm">Energy Production</p>
                <div className="flex items-baseline gap-4 mt-2">
                  <p className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-widest">E = S × r × PR</p>
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">โดย r = ประสิทธิภาพแผง (ช่วง 15–20%), PR = ประสิทธิภาพระบบ (ใช้ 0.86), E = ไฟฟ้าที่ผลิตได้ (MWh/yr)</p>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-3xl bg-[var(--color-brand-emerald)]/10 border border-[var(--color-brand-emerald)]/20 p-8 sm:p-12 shadow-xl animate-fade-up delay-400 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-brand-emerald)]/20 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
            <svg className="w-8 h-8 text-[var(--color-brand-emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            สรุปเชิงระบบ
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed relative z-10 max-w-5xl">
            ผลการวิเคราะห์จากบทที่ 3 ชี้ให้เห็นว่าการผสานข้อมูล DSM + Building Footprints + GTI ภายใต้กระบวนการ GIS
            ช่วยระบุหลังคาที่เหมาะสมได้อย่างเป็นรูปธรรม และสามารถแปลงผลลัพธ์เชิงวิศวกรรมให้เป็นข้อมูลเชิงพื้นที่ในรูปแบบ
            <code className="mx-2 px-2 py-1 bg-white/10 rounded-md font-mono text-sm border border-white/10">GeoJSON</code>
            เพื่อแสดงผลบนเว็บแมพได้โดยตรง สนับสนุนการตัดสินใจด้านพลังงานทดแทนในระดับอาคารอย่างแม่นยำและตรวจสอบย้อนกลับได้
          </p>
        </section>
      </main>
    </div>
  );
}

export default Method;