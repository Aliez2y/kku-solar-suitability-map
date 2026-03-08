
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const navigate = useNavigate();

  const featureItems = [
    {
      title: 'แผนที่ดิจิทัล',
      description: 'ข้อมูลความละเอียดสูงสำหรับการวิเคราะห์เชิงพื้นที่',
      icon: (
        <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      )
    },
    {
      title: 'วิเคราะห์รังสี',
      description: 'ประเมินปริมาณแสงอาทิตย์ที่ได้รับในแต่ละพื้นที่อาคาร',
      icon: (
        <svg className="w-6 h-6 text-slate-100" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0M17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414M4 11a1 1 0 100-2H3a1 1 0 000 2h1"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      title: 'คำนวณพลังงาน',
      description: 'ประมาณศักยภาพการผลิตไฟฟ้าจากโซลาร์เซลล์อย่างเป็นระบบ',
      icon: (
        <svg className="w-6 h-6 text-slate-100" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      title: 'ประเมินความเหมาะสม',
      description: 'จัดระดับความเหมาะสมของอาคารเพื่อการตัดสินใจที่แม่นยำ',
      icon: (
        <svg className="w-6 h-6 text-slate-100" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/img/photovoltaic-2138992.jpg"
          alt="Khon Kaen University aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/55 to-indigo-950/75" />
      </div>

      <main className="relative z-10">
        <section id="home" className="relative min-h-[78vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-5xl text-center">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
              ระบบประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร
              <span className="block mt-2 text-blue-300 font-medium">เทศบาลนครขอนแก่น (Khon Kaen Solar Map)</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl mx-auto">
              แพลตฟอร์มภูมิสารสนเทศเพื่อสนับสนุนการวางแผนและตัดสินใจด้านพลังงานทดแทน
              อย่างมีประสิทธิภาพและยั่งยืน
            </p>

            <button
              type="button"
              className="mt-10 inline-flex items-center gap-3 rounded-lg bg-blue-700 hover:bg-blue-600 px-8 py-3.5 text-base font-semibold text-white transition-all shadow-lg shadow-blue-900/60 ring-1 ring-blue-500/50"
              onClick={() => navigate('/map')}
            >
              เข้าสู่ระบบแผนที่ภูมิสารสนเทศ
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>

        <section id="method" className="border-y border-white/10 bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {featureItems.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-xl border border-slate-700 bg-slate-900/80 p-6 hover:bg-slate-800/90 hover:border-blue-500/50 transition-all shadow-md shadow-black/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="relative z-10 border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400 font-medium tracking-wide">
        สงวนลิขสิทธิ์ © 2024 • ระบบประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคาร เทศบาลนครขอนแก่น
      </footer>
    </div>
  );
}

export default Home;