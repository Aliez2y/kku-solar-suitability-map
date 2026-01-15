
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">
        {/* Animated gradient background overlay */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <img
            src="/img/photovoltaic-2138992.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-cyan-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Icon badge */}
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl animate-bounce">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
            </svg>
          </div>

          {/* Main title with gradient text */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center leading-tight px-2">
            <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
              แผนที่ประเมินความเหมาะสม
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              ด้านพลังงานแสงอาทิตย์
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 bg-clip-text text-transparent drop-shadow-2xl">
              ในมหาวิทยาลัยขอนแก่น
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 text-center max-w-3xl font-light leading-relaxed px-4">
            ระบบแผนที่ภูมิสารสนเทศเพื่อประเมินศักยภาพในการติดตั้งแผงโซลาร์เซลล์บนหลังคาอาคาร สำหรับการวางแผนและตัดสินใจด้านพลังงานทดแทนอย่างมีประสิทธิภาพ
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-6xl mt-4 sm:mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">แผนที่ดิจิทัล</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">ข้อมูลภูมิสารสนเทศแม่นยำสูง</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">วิเคราะห์รังสี</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">ประเมินปริมาณรังสีดวงอาทิตย์</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">คำนวณพลังงาน</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">ประมาณการผลิตไฟฟ้าได้จริง</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">ประเมินความเหมาะสม</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">จัดระดับความเหมาะสมอาคาร</p>
            </div>
          </div>

          {/* CTA Button with animation */}
          <button
            className="group relative mt-6 sm:mt-8 px-10 sm:px-12 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base sm:text-lg font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 transform overflow-hidden"
            onClick={() => navigate('/map')}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              เข้าสู่แผนที่
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Footer info */}
          <div className="mt-6 sm:mt-8 text-center space-y-2">
            <p className="text-gray-300 text-xs sm:text-sm font-medium">
              มหาวิทยาลัยขอนแก่น
            </p>
            <p className="text-gray-400 text-xs">
              Solar Rooftop Suitability Assessment System
            </p>
          </div>
        </div>

        {/* Decorative elements - ซ่อนบนหน้าจอเล็ก */}
        <div className="hidden md:block absolute top-20 left-10 w-48 h-48 lg:w-72 lg:h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
    </>
  );
}

export default Home;