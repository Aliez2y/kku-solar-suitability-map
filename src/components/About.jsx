import Navbar from './Navbar';

export default function About() {
	return (
		<div className="relative min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans overflow-x-hidden">
			<Navbar />
			
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 mt-16">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--color-brand-emerald)]/5 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

			<main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
				{/* Page title */}
				<header className="mb-16 text-center animate-fade-up">
					<h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
            เกี่ยวกับโครงการ
          </h1>
					<p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-3xl mx-auto">
            การพัฒนาเว็บแมพเพื่อประเมินความเหมาะสมด้านพลังงานแสงอาทิตย์ในมหาวิทยาลัยขอนแก่น 
						<br />
            <span className="font-outfit italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Development of a Web Map for Solar Energy Suitability Assessment in Khon Kaen University</span>
          </p>
				</header>

        <div className="space-y-12">
          {/* 1. Introduction & Overview */}
          <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl animate-fade-up delay-100 hover:border-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full inline-block shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              บทนำและภาพรวมโครงการ
            </h2>
            <div className="leading-relaxed text-[var(--color-text-secondary)] space-y-6">
              <p>
                เว็บไซต์นี้คือ “การพัฒนาเว็บแมพเพื่อประเมินความเหมาะสมด้านพลังงานแสงอาทิตย์ในมหาวิทยาลัยขอนแก่น” โดยมีวัตถุประสงค์หลักเพื่อพัฒนาเว็บแมพสำหรับประเมินความเหมาะสมของพื้นที่หลังคาอาคารในการติดตั้งแผงโซลาร์เซลล์ โดยใช้เทคโนโลยีสารสนเทศภูมิศาสตร์ (GIS) และข้อมูลเชิงพื้นที่
              </p>
              <div className="p-4 bg-[var(--color-surface-2)]/80 rounded-xl border border-white/5 inline-block text-white shadow-inner">
                <span className="text-[var(--color-brand-emerald)] font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  พื้นที่ศึกษา: <span className="text-white font-normal ml-1">มหาวิทยาลัยขอนแก่น และชุมชนกังสดาล</span>
                </span>
              </div>
              <div className="mt-4">
                <p className="font-bold text-white mb-3 text-lg">วัตถุประสงค์</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="pl-2 relative">ศึกษาปัจจัยที่มีผลต่อความเหมาะสมของพื้นที่หลังคาอาคารสำหรับติดตั้งเซลล์แสงอาทิตย์</li>
                  <li className="pl-2 relative">ประเมินและคัดเลือกพื้นที่หลังคาอาคารที่มีศักยภาพสูงสุดสำหรับการติดตั้งระบบเซลล์แสงอาทิตย์</li>
                  <li className="pl-2 relative text-white font-semibold flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-emerald)] absolute -left-4"></div>พัฒนาเว็บแมพสำหรับการติดตั้งแผงโซล่าเซลล์</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Motivation */}
          <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl animate-fade-up delay-200 hover:border-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-[var(--color-brand-amber)] rounded-full inline-block shadow-[0_0_10px_var(--color-brand-amber)]"></span>
              ที่มาและความสำคัญ
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
              ประเทศไทยได้รับพลังงานแสงอาทิตย์ค่อนข้างสูงและมีศักยภาพในการผลิตไฟฟ้า แต่ยังขาดการวิเคราะห์ข้อมูลที่แม่นยำในการเลือกพื้นที่ติดตั้งแผงโซลาร์เซลล์ ซึ่งอาจทำให้ประสิทธิภาพการผลิตพลังงานลดลงและเพิ่มต้นทุนการติดตั้ง/บำรุงรักษา เครื่องมือนี้จึงช่วยให้การคัดเลือกพื้นที่ทำได้รวดเร็วและแม่นยำมากขึ้น สนับสนุนพลังงานสะอาดและการพัฒนาที่ยั่งยืนด้านพลังงาน
            </p>
          </section>

          {/* 3. Methodology & Technology */}
          <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl animate-fade-up delay-300 hover:border-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-[var(--color-brand-emerald)] rounded-full inline-block shadow-[0_0_10px_var(--color-brand-emerald)]"></span>
              วิธีการและเทคโนโลยี
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--color-surface-2)]/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">ข้อมูลที่ใช้</h3>
                <ul className="list-disc pl-6 text-[var(--color-text-secondary)] space-y-3">
                  <li>แบบจำลองพื้นผิวดิจิทัล (DSM)</li>
                  <li>ข้อมูลแสงอาทิตย์จาก Global Solar Atlas</li>
                  <li>ขอบเขตอาคาร (Building Footprints)</li>
                  <li>ค่าประสิทธิภาพของแผงโซลาร์เซลล์</li>
                </ul>
              </div>

              <div className="bg-[var(--color-surface-2)]/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">เกณฑ์การประเมิน</h3>
                <ul className="list-disc pl-6 text-[var(--color-text-secondary)] space-y-3">
                  <li>ความชันของหลังคาไม่เกิน 45 องศา</li>
                  <li>ทิศทางของหลังคาอยู่ในช่วงที่เหมาะสม 67.5°–292.5° โดยเน้นทิศตะวันตก ใต้ และตะวันออกเป็นหลัก</li>
                </ul>
              </div>

              <div className="md:col-span-2 mt-2 bg-[var(--color-surface-2)]/50 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center gap-6">
                <h3 className="text-lg font-bold text-white bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10 shrink-0">เทคโนโลยี</h3>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Leaflet.js', 'Tailwind CSS v4', 'QGIS / ArcGIS'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium font-outfit text-sm shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Key Features & 5. Team */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl animate-fade-up delay-400">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-[var(--color-brand-rose)] rounded-full inline-block shadow-[0_0_10px_var(--color-brand-rose)]"></span>
                คุณสมบัติหลัก
              </h2>
              <ul className="space-y-6 text-[var(--color-text-secondary)]">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-emerald)]/10 text-[var(--color-brand-emerald)] border border-[var(--color-brand-emerald)]/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span className="mt-2">แผนที่อินเทอร์แอกทีฟ พร้อมการไล่ระดับสีเพื่อสื่อระดับศักยภาพอย่างชัดเจน</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <span className="mt-2 text-sm md:text-base">แสดงข้อมูลพื้นที่หลังคาที่เหมาะสม (ตร.ม.) และ พลังงานไฟฟ้าที่คาดว่าจะผลิตได้จริง (MWh/year)</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-amber)]/10 text-[var(--color-brand-amber)] border border-[var(--color-brand-amber)]/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  </div>
                  <span className="mt-2">การโต้ตอบครบถ้วน: เลื่อน ซูม เปิด-ปิดแผนที่พื้นหลัง และข้อมูลเชิงลึกใน Sidebar</span>
                </li>
              </ul>
            </section>

            <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl animate-fade-up delay-500">
              <h2 className="text-2xl font-bold text-white mb-6">ทีมผู้พัฒนา</h2>
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-surface-2)]/50">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5">
                      <th className="px-6 py-4 text-white font-semibold">ชื่อ - สกุล</th>
                      <th className="px-6 py-4 text-white font-semibold flex items-center justify-end">รหัสนักศึกษา</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[var(--color-text-secondary)]">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">นายก้องภูมิ ศรีสวัสดิ์</td>
                      <td className="px-6 py-4 font-outfit text-right">653380045-0</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">นายอัษฎาวุธ ทิพเสน</td>
                      <td className="px-6 py-4 font-outfit text-right">653380243-6</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">นายอิศรานุวัฒน์ สอนศักดา</td>
                      <td className="px-6 py-4 font-outfit text-right">653380244-4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 items-center">
                <span className="font-bold text-white whitespace-nowrap">อาจารย์ที่ปรึกษา:</span> 
                <span className="text-blue-300">ดร.ศักดิ์พจน์ ทองเลี่ยมนาค</span>
              </div>
            </section>
          </div>

          {/* Note */}
          <div className="rounded-2xl bg-[var(--color-surface-2)]/50 border border-white/5 p-5 mt-12 text-center text-sm text-[var(--color-text-secondary)] italic animate-fade-up delay-500 max-w-2xl mx-auto shadow-inner">
            หมายเหตุ: เนื้อหานี้สรุปจากเอกสารโครงงานวิจัย เพื่อใช้อธิบายในหน้า About ของระบบปฏิบัติการ Khon Kaen Solar Map
          </div>
        </div>
			</main>
		</div>
	);
}
