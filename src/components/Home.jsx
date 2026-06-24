import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const navigate = useNavigate();

  const featureItems = [
    {
      title: 'แผนที่ดิจิทัล',
      description: 'ข้อมูลความละเอียดสูงสำหรับการวิเคราะห์เชิงพื้นที่',
      delay: 'delay-100',
      icon: (
        <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: 'วิเคราะห์รังสี',
      description: 'ประเมินปริมาณแสงอาทิตย์ที่ได้รับในแต่ละพื้นที่อาคาร',
      delay: 'delay-200',
      icon: (
        <svg className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0M17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414M4 11a1 1 0 100-2H3a1 1 0 000 2h1" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'คำนวณพลังงาน',
      description: 'ประมาณศักยภาพการผลิตไฟฟ้าจากโซลาร์เซลล์อย่างเป็นระบบ',
      delay: 'delay-300',
      icon: (
        <svg className="w-6 h-6 text-[var(--color-brand-emerald)] group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'แสดงความเหมาะสม',
      description: 'จัดระดับความเหมาะสมของอาคารเพื่อการตัดสินใจที่แม่นยำ',
      delay: 'delay-400',
      icon: (
        <svg className="w-6 h-6 text-[var(--color-brand-rose)] group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg-base)]">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/img/photovoltaic-2138992.jpg"
          alt="Khon Kaen University aerial view"
          className="w-full h-full object-cover opacity-70 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)] via-[var(--color-bg-base)]/80 to-[var(--color-bg-base)]" />
        {/* Subtle glowing orb for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-brand-emerald)]/10 blur-[120px] rounded-full mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <main className="relative z-10 pt-20">
        <section id="home" className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-white tracking-tight animate-fade-up">
              ระบบแสดงศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 animate-fade-up delay-100 font-outfit font-bold">Khon Kaen Solar Map</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl mx-auto animate-fade-up delay-200">
              แพลตฟอร์มภูมิสารสนเทศเพื่อสนับสนุนการวางแผนและตัดสินใจด้านพลังงานทดแทน อย่างมีประสิทธิภาพและยั่งยืน ด้วยเทคโนโลยี GIS ขั้นสูง
            </p>

            <div className="pt-4 animate-fade-up delay-300">
              <button
                type="button"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all duration-300 ease-[var(--ease-out-quint)] hover:scale-105 active:scale-95"
                onClick={() => navigate('/map')}
              >
                <div className="absolute inset-0 bg-white/20 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-full" style={{ transform: 'translateX(-100%)' }}></div>
                <span className="relative z-10">เปิดระบบแผนที่วิเคราะห์</span>
                <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section id="method" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[var(--color-surface-1)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-brand-emerald)] uppercase font-outfit mb-3">Core Features</h2>
              <h3 className="text-3xl font-bold text-white">ความสามารถของระบบ</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureItems.map((feature) => (
                <article
                  key={feature.title}
                  className={`group relative rounded-2xl border border-white/5 bg-[var(--color-surface-2)]/50 p-6 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-2 hover:bg-[var(--color-surface-2)] hover:border-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] animate-fade-up ${feature.delay}`}
                >
                  <div className="absolute inset-x-0 -top-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-110 group-hover:bg-white/10 shadow-inner">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-text-secondary)] transition-all">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="relative z-10 border-t border-white/5 bg-[var(--color-bg-base)] py-10 text-center text-sm text-[var(--color-text-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <span className="font-outfit font-bold tracking-wide">SolarSuit-KKN</span>
            <span>© 2026</span>
          </div>
          <p className="opacity-50 text-xs">ระบบแสดงศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร เทศบาลนครขอนแก่น</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;