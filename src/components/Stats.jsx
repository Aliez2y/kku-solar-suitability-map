import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

// A simple animated counter for numbers
const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo for dramatic slowdown at the end
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeOutExpo * end);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
};

function Stats() {
  const [stats, setStats] = useState({
    totalBuildings: 0,
    totalArea: 0,
    totalRadiation: 0,
    totalProduction: 0,
    totalSavings: 0,
    highSuitabilityCount: 0,
    mediumSuitabilityCount: 0,
    lowSuitabilityCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/SolarNKK_Bjson.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.features) return;

        let totalArea = 0;
        let totalRadiation = 0;
        let totalProduction = 0;
        let totalSavings = 0;
        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;

        data.features.forEach((feature) => {
          const props = feature.properties;
          totalArea += props.AREA || 0;
          
          const sr = props.USABLE_SR || props.Usable_SR || 0;
          totalRadiation += sr;
          
          const elec = props.ELEC_PROD || props.Elec_Prod || 0;
          totalProduction += elec;

          const cost = props.ELEC_COST || props.Elec_Cost || 0;
          totalSavings += cost;

          if (elec > 29.28) {
            highCount++;
          } else if (elec > 10.84) {
            mediumCount++;
          } else {
            lowCount++;
          }
        });

        setStats({
          totalBuildings: data.features.length,
          totalArea,
          totalRadiation,
          totalProduction,
          totalSavings,
          highSuitabilityCount: highCount,
          mediumSuitabilityCount: mediumCount,
          lowSuitabilityCount: lowCount,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading GeoJSON:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none align-top"></div>

        <div className="mb-12 border-b border-white/10 pb-6 relative z-10 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            สถิติภาพรวม <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">(Dashboard)</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            ข้อมูลสรุปเชิงพื้นที่ประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคารทั้งหมดในเขตเทศบาลนครขอนแก่น
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            {/* Primary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total Buildings */}
              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] animate-fade-up delay-100">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-out-quint)]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">จำนวนหลังคาอาคารรวม</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-white font-outfit tracking-tight leading-none">
                      <CountUp end={stats.totalBuildings} />
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] opacity-80">หลัง</span>
                  </div>
                </div>
              </div>

              {/* Total Area */}
              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] animate-fade-up delay-200">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-out-quint)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">พื้นที่หลังคารวม (ที่เหมาะสม)</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-white font-outfit tracking-tight leading-none">
                      <CountUp end={stats.totalArea} />
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] opacity-80">ตร.ม.</span>
                  </div>
                </div>
              </div>

              {/* Total Production */}
              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.3)] animate-fade-up delay-300">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-out-quint)]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">ศักยภาพการผลิตไฟฟ้ารวม</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-white font-outfit tracking-tight leading-none">
                      <CountUp end={stats.totalProduction} />
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] opacity-80">MWh/yr</span>
                  </div>
                </div>
              </div>

              {/* Total Cost Savings */}
              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.3)] animate-fade-up delay-400">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-out-quint)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">มูลค่าไฟฟ้าที่ประหยัดได้รวม</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-outfit tracking-tight leading-none">
                      <CountUp end={stats.totalSavings} />
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] opacity-80">บาท/ปี</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suitability Breakdown Chart/Cards */}
            <div className="mt-16 pt-8 border-t border-white/5 animate-fade-up delay-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[var(--color-brand-emerald)] rounded-full inline-block"></span>
                สัดส่วนความเหมาะสมพื้นที่ติดตั้งโซลาร์เซลล์
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* High Suitability */}
                <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-brand-emerald)] shadow-[0_0_15px_oklch(0.68_0.17_150)]"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white text-lg">เหมาะสมมาก</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">&gt; 29.28 MWh/yr</p>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/20">
                      {((stats.highSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold text-white font-outfit tracking-tight"><CountUp end={stats.highSuitabilityCount} /></p>
                    </div>
                  </div>
                </div>

                {/* Medium Suitability */}
                <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-brand-amber)] shadow-[0_0_15px_oklch(0.75_0.18_55)]"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white text-lg">เหมาะสมปานกลาง</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">10.84 - 29.28 MWh/yr</p>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-semibold border border-amber-500/20">
                      {((stats.mediumSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold text-white font-outfit tracking-tight"><CountUp end={stats.mediumSuitabilityCount} /></p>
                    </div>
                  </div>
                </div>

                {/* Low Suitability */}
                <div className="bg-[var(--color-surface-2)]/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-brand-rose)] shadow-[0_0_15px_oklch(0.62_0.22_15)]"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white text-lg">เหมาะสมน้อย</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">≤ 10.84 MWh/yr</p>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-lg text-sm font-semibold border border-rose-500/20">
                      {((stats.lowSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold text-white font-outfit tracking-tight"><CountUp end={stats.lowSuitabilityCount} /></p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar Visualization */}
              <div className="mt-10 bg-[var(--color-surface-2)] h-8 rounded-full overflow-hidden flex shadow-inner border border-white/5 relative" title={`สัดส่วนความเหมาะสมของพื้นที่ อาคารทั้งหมด ${stats.totalBuildings.toLocaleString()} หลัง`}>
                <div 
                  className="h-full flex items-center justify-center transition-all duration-1000 ease-[var(--ease-out-quint)] relative overflow-hidden group" 
                  style={{ width: `${(stats.highSuitabilityCount / stats.totalBuildings) * 100}%`, backgroundColor: 'var(--color-brand-emerald)' }}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div 
                  className="h-full flex items-center justify-center transition-all duration-1000 ease-[var(--ease-out-quint)] delay-100 relative overflow-hidden group" 
                  style={{ width: `${(stats.mediumSuitabilityCount / stats.totalBuildings) * 100}%`, backgroundColor: 'var(--color-brand-amber)' }}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div 
                  className="h-full flex items-center justify-center transition-all duration-1000 ease-[var(--ease-out-quint)] delay-200 relative overflow-hidden group" 
                  style={{ width: `${(stats.lowSuitabilityCount / stats.totalBuildings) * 100}%`, backgroundColor: 'var(--color-brand-rose)' }}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              
              <div className="mt-5 px-1 bg-[var(--color-surface-2)] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-[var(--color-text-secondary)] italic flex gap-2">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>หมายเหตุ: คำนวณจากการวิเคราะห์ข้อมูลเชิงพื้นที่และสมมติฐานตามสัดส่วนการใช้ไฟฟ้าประเภทบ้านอยู่อาศัยที่รายงานในกระบวนการศึกษา</span>
                </p>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Stats;
