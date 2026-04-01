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
            การพัฒนาเว็พแมพสำหรับแสดงศักยภาพพลังงานแสงอาทิตย์บนหลังคา กรณีศึกษา เทศบาลนครขอนแก่น 
						<br />
            <span className="font-outfit italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Development of a Web Map for Visualizing Rooftop Solar Energy Potential:<br/> A Case Study of Khon Kaen Municipality</span>
          </p>
				</header>

        <div className="space-y-8">
          {/* Top Row: Intro & Motivation in a grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. Introduction */}
            <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl animate-fade-up delay-100 hover:border-white/10 transition-colors flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                <span className="w-8 h-1 bg-blue-500 rounded-full inline-block shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                บทนำและภาพรวมโครงการ
              </h2>
              <div className="leading-relaxed text-[var(--color-text-secondary)] space-y-6 flex-grow relative z-10">
                <p className="text-lg">
                  การพัฒนาเว็บแมพสำหรับการแสดงความเหมาะสมของพื้นที่หลังคาอาคารในการติดตั้งแผงโซลาร์เซลล์ โดยใช้เทคโนโลยีสารสนเทศภูมิศาสตร์ (GIS) และข้อมูลเชิงพื้นที่
                </p>
                <div className="p-5 bg-[var(--color-surface-2)]/80 rounded-2xl border border-white/5 inline-block text-white shadow-inner">
                  <span className="text-[var(--color-brand-emerald)] font-semibold flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-sm uppercase tracking-wider text-[var(--color-text-secondary)]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      พื้นที่ศึกษา
                    </span>
                    <span className="text-white font-medium text-lg ml-6">เทศบาลนครขอนแก่น</span>
                  </span>
                </div>
                <div className="mt-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                  <p className="font-bold text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--color-brand-emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    วัตถุประสงค์
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-secondary)] mt-2 shrink-0"></div>
                      <span className='text-white'>ศึกษาปัจจัยที่มีผลต่อความเหมาะสมของหลังคาอาคารสำหรับการติดตั้งเซลล์แสงอาทิตย์</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-secondary)] mt-2 shrink-0"></div>
                      <span className='text-white'>ประเมินและคัดเลือกพื้นที่ที่มีศักยภาพสูงสุด</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-secondary)] mt-2 shrink-0"></div>
                  <span className='text-white'>พัฒนาเว็บแมพโต้ตอบเพื่อสนับสนุนการตัดสินใจ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Motivation */}
            <div className="flex flex-col gap-8">
              <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl animate-fade-up delay-200 hover:border-white/10 transition-colors relative overflow-hidden group flex-grow">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[var(--color-brand-amber)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-brand-amber)]/20 transition-colors duration-500"></div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                  <span className="w-8 h-1 bg-[var(--color-brand-amber)] rounded-full inline-block shadow-[0_0_10px_var(--color-brand-amber)]"></span>
                  ที่มาและความสำคัญ
                </h2>
                <div className="text-[var(--color-text-secondary)] leading-relaxed text-lg space-y-4 relative z-10">
                  <p>
                    ประเทศไทยได้รับพลังงานแสงอาทิตย์สูง แต่การประเมินพื้นที่ติดตั้งโซลาร์เซลล์ระดับเมืองยังขาดความแม่นยำและการนำเสนอที่เข้าใจง่าย
                  </p>
                  <p className="text-white/90 font-medium">
                    เครื่องมือนี้ถูกสร้างขึ้นเพื่อปิดช่องว่างดังกล่าว ทำให้การคัดเลือกพื้นที่ทำได้รวดเร็ว แม่นยำ และมองเห็นภาพรวมได้อย่างชัดเจน เพื่อสนับสนุนการเปลี่ยนผ่านสู่พลังงานสะอาดอย่างยั่งยืน
                  </p>
                </div>
              </section>

              {/* Note Mini-card */}
              <div className="rounded-3xl bg-gradient-to-r from-blue-900/20 to-[var(--color-brand-emerald)]/10 border border-white/5 p-6 text-sm text-[var(--color-text-secondary)] animate-fade-up delay-300 shadow-inner flex shrink-0 items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p>
                  เนื้อหานี้ถูกสรุปจากเอกสารโครงงานวิจัยรายวิชาปฏิบัติการภูมิสารสนเทศ เพื่อใช้เป็นส่วนร่วมในระบบปฏิบัติการ Khon Kaen Solar Map
                </p>
              </div>
            </div>
          </div>

          {/* 3. Team */}
          <section className="bg-[var(--color-surface-1)]/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl animate-fade-up delay-400 mt-8 hover:border-white/10 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-16 w-64 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-10 text-center relative z-10">
              ผู้จัดทำโครงงาน
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {/* Member 1 */}
              <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 hover:bg-white/5 transition-colors text-center group/card flex flex-col justify-center min-h-[120px]">
                <h3 className="text-lg font-bold text-white mb-2">นายก้องภูมิ ศรีสวัสดิ์</h3>
                <p className="font-outfit text-[var(--color-brand-emerald)] tracking-widest text-sm">653380045-0</p>
              </div>
              
              {/* Member 2 */}
              <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 hover:bg-white/5 transition-colors text-center group/card flex flex-col justify-center min-h-[120px]">
                <h3 className="text-lg font-bold text-white mb-2">นายอัษฎาวุธ ทิพเสน</h3>
                <p className="font-outfit text-[var(--color-brand-emerald)] tracking-widest text-sm">653380243-6</p>
              </div>

              {/* Member 3 */}
              <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 hover:bg-white/5 transition-colors text-center group/card flex flex-col justify-center min-h-[120px]">
                <h3 className="text-lg font-bold text-white mb-2">นายอิศรานุวัฒน์ สอนศักดา</h3>
                <p className="font-outfit text-[var(--color-brand-emerald)] tracking-widest text-sm">653380244-4</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <span className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm border border-blue-500/30">อาจารย์ที่ปรึกษา</span>
              <span className="text-xl text-white font-medium">ดร.ศักดิ์พจน์ ทองเลี่ยมนาค</span>
            </div>
          </section>
        </div>
			</main>
		</div>
	);
}
