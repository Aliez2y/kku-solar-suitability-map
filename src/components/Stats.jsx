import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

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
    fetch('/Solar_Buildingkk.geojson')
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

          // Suitability criteria based on ELEC_PROD
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
    <div className="min-h-screen bg-slate-50 font-sans" style={{ fontFamily: 'Noto Sans Thai, sans-serif' }}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8 sm:mb-12 border-b border-gray-200 pb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            สถิติภาพรวม <span className="text-blue-600">(Dashboard)</span>
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-2xl">
            ข้อมูลสรุปเชิงพื้นที่ประเมินศักยภาพพลังงานแสงอาทิตย์บนหลังคาอาคารทั้งหมดในเขตเทศบาลนครขอนแก่น
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Primary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Buildings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">จำนวนหลังคาอาคารรวม</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      {stats.totalBuildings.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-500">หลัง</span>
                  </div>
                </div>
              </div>

              {/* Total Area */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100 transition-colors"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">พื้นที่หลังคารวม (ที่เหมาะสม)</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      {stats.totalArea.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-sm font-medium text-gray-500">ตร.ม.</span>
                  </div>
                </div>
              </div>

              {/* Total Production */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">ศักยภาพการผลิตไฟฟ้ารวม</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      {stats.totalProduction.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-sm font-medium text-gray-500">MWh/yr</span>
                  </div>
                </div>
              </div>

              {/* Total Cost Savings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">มูลค่าไฟฟ้าที่ประหยัดได้รวม</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-700">
                      {stats.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-sm font-medium text-gray-500">บาท/ปี</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suitability Breakdown Chart/Cards */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">สัดส่วนความเหมาะสมพื้นที่ติดตั้งโซลาร์เซลล์</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* High Suitability */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-gray-700">เหมาะสมมาก</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">&gt; 29.28 MWh/yr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stats.highSuitabilityCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">หลัง</p>
                  </div>
                </div>

                {/* Medium Suitability */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="font-semibold text-gray-700">เหมาะสมปานกลาง</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">10.84 - 29.28 MWh/yr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stats.mediumSuitabilityCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">หลัง</p>
                  </div>
                </div>

                {/* Low Suitability */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="font-semibold text-gray-700">เหมาะสมน้อย</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">≤ 10.84 MWh/yr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stats.lowSuitabilityCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">หลัง</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar Visualization */}
              <div className="mt-6 bg-gray-100 h-6 rounded-full overflow-hidden flex" title={`สัดส่วนความเหมาะสมของพื้นที่ อาคารทั้งหมด ${stats.totalBuildings.toLocaleString()} หลัง`}>
                <div 
                  className="bg-emerald-500 h-full flex items-center justify-center text-white text-[10px] font-bold" 
                  style={{ width: `${(stats.highSuitabilityCount / stats.totalBuildings) * 100}%` }}>
                  {((stats.highSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                </div>
                <div 
                  className="bg-amber-500 h-full flex items-center justify-center text-white text-[10px] font-bold" 
                  style={{ width: `${(stats.mediumSuitabilityCount / stats.totalBuildings) * 100}%` }}>
                  {((stats.mediumSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                </div>
                <div 
                  className="bg-red-500 h-full flex items-center justify-center text-white text-[10px] font-bold" 
                  style={{ width: `${(stats.lowSuitabilityCount / stats.totalBuildings) * 100}%` }}>
                  {((stats.lowSuitabilityCount / stats.totalBuildings) * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="mt-4 px-1">
                  <p className="text-xs text-gray-400 italic">
                      *หมายเหตุ: คำนวณจากการวิเคราะห์ข้อมูลเชิงพื้นที่และสมมติฐานตามสัดส่วนการใช้ไฟฟ้าประเภทบ้านอยู่อาศัยที่รายงานในกระบวนการศึกษา
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
