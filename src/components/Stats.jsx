import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';

const SUITABILITY_THRESHOLDS = {
  high: 29.28,
  medium: 10.84,
};

const GEOJSON_DIRECTORY_CANDIDATES = ['/GeoJSON_SolarKKN'];
const COMBINED_FILE_NAME = 'BuildingSR_NKK.geojson';
const LEGACY_COMBINED_FILE_URL = '/BuildingNKK_SR.geojson';

const DIRECTIONAL_DATASETS = [
  { key: 'flat', label: 'Flat roof', labelTh: 'หลังคาแบน', fileName: 'BuildingFlatRoof.geojson' },
  { key: 'south', label: 'South-facing', labelTh: 'ทิศใต้', fileName: 'BuildingSouth.geojson' },
  { key: 'west', label: 'West-facing', labelTh: 'ทิศตะวันตก', fileName: 'BuildingWest.geojson' },
  { key: 'east', label: 'East-facing', labelTh: 'ทิศตะวันออก', fileName: 'BuildingEast.geojson' },
];

const CountUp = ({ end, duration = 1800, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeOutExpo * end);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const readNumericProperty = (properties, primaryKey, fallbackKey) => {
  const primary = properties?.[primaryKey];
  if (primary !== undefined && primary !== null && primary !== '') {
    return toNumber(primary);
  }

  const fallback = properties?.[fallbackKey];
  if (fallback !== undefined && fallback !== null && fallback !== '') {
    return toNumber(fallback);
  }

  return 0;
};

const getUsableSRValue = (properties) => readNumericProperty(properties, 'USABLE_SR', 'Usable_SR');
const getElecProdValue = (properties) => readNumericProperty(properties, 'ELEC_PROD', 'Elec_Prod');
const getElecCostValue = (properties) => readNumericProperty(properties, 'ELEC_COST', 'Elec_Cost');
const getAreaValue = (properties) => toNumber(properties?.AREA);

const formatValue = (value, maximumFractionDigits = 2) => (
  toNumber(value).toLocaleString(undefined, { maximumFractionDigits })
);

const createDataUrlCandidates = (fileName, includeLegacyRoot = false) => {
  const candidates = GEOJSON_DIRECTORY_CANDIDATES.map((basePath) => `${basePath}/${fileName}`);
  if (includeLegacyRoot) {
    candidates.push(LEGACY_COMBINED_FILE_URL);
  }
  return candidates;
};

const fetchGeoJsonFromCandidates = async (urlCandidates, signal) => {
  let lastError = null;

  for (const url of urlCandidates) {
    if (signal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        lastError = new Error(`ไม่สามารถโหลดข้อมูลได้ (${response.status}) จาก ${url}`);
        continue;
      }

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!contentType.includes('json')) {
        lastError = new Error(`รูปแบบข้อมูลไม่ถูกต้องจาก ${url} (content-type: ${contentType || 'unknown'})`);
        continue;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      lastError = error;
    }
  }

  throw lastError || new Error('ไม่พบไฟล์ GeoJSON ตาม path ที่กำหนด');
};

const aggregateCombinedStats = (geoData) => {
  const features = Array.isArray(geoData?.features) ? geoData.features : [];

  const result = {
    totalBuildings: features.length,
    totalArea: 0,
    totalRadiation: 0,
    totalProduction: 0,
    totalSavings: 0,
    highSuitabilityCount: 0,
    mediumSuitabilityCount: 0,
    lowSuitabilityCount: 0,
  };

  features.forEach((feature) => {
    const properties = feature?.properties ?? {};

    result.totalArea += getAreaValue(properties);

    const solarRadiation = getUsableSRValue(properties);
    result.totalRadiation += solarRadiation;

    const energyProduction = getElecProdValue(properties);
    result.totalProduction += energyProduction;

    const savings = getElecCostValue(properties);
    result.totalSavings += savings;

    if (energyProduction > SUITABILITY_THRESHOLDS.high) {
      result.highSuitabilityCount += 1;
    } else if (energyProduction > SUITABILITY_THRESHOLDS.medium) {
      result.mediumSuitabilityCount += 1;
    } else {
      result.lowSuitabilityCount += 1;
    }
  });

  return result;
};

const aggregateDirectionalStats = (geoData) => {
  const features = Array.isArray(geoData?.features) ? geoData.features : [];

  return features.reduce(
    (totals, feature) => {
      const properties = feature?.properties ?? {};
      totals.area += getAreaValue(properties);
      totals.radiation += getUsableSRValue(properties);
      totals.production += getElecProdValue(properties);
      return totals;
    },
    { area: 0, radiation: 0, production: 0 }
  );
};

const sumDirectionalMetrics = (directionalStats) => directionalStats.reduce(
  (totals, item) => {
    totals.area += item.area;
    totals.radiation += item.radiation;
    totals.production += item.production;
    return totals;
  },
  { area: 0, radiation: 0, production: 0 }
);

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

  const [directionalStats, setDirectionalStats] = useState([]);
  const [directionalMetricTotals, setDirectionalMetricTotals] = useState({ area: 0, radiation: 0, production: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadStatsData = async () => {
      setLoading(true);
      setError('');

      try {
        const combinedCandidates = createDataUrlCandidates(COMBINED_FILE_NAME, true);
        const directionalRequests = DIRECTIONAL_DATASETS.map((item) => fetchGeoJsonFromCandidates(
          createDataUrlCandidates(item.fileName),
          controller.signal
        ));

        const [combinedGeoData, ...directionalGeoData] = await Promise.all([
          fetchGeoJsonFromCandidates(combinedCandidates, controller.signal),
          ...directionalRequests,
        ]);

        if (controller.signal.aborted) return;

        const nextStats = aggregateCombinedStats(combinedGeoData);
        const nextDirectionalStats = DIRECTIONAL_DATASETS.map((dataset, index) => ({
          ...dataset,
          ...aggregateDirectionalStats(directionalGeoData[index]),
        }));

        setStats(nextStats);
        setDirectionalStats(nextDirectionalStats);
        setDirectionalMetricTotals(sumDirectionalMetrics(nextDirectionalStats));
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') return;
        setError(fetchError.message || 'ไม่สามารถโหลดข้อมูลสถิติได้');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadStatsData();

    return () => controller.abort();
  }, [reloadTick]);

  const directionalCharts = useMemo(() => ([
    {
      key: 'area',
      title: 'พื้นที่หลังคา',
      subtitle: 'Roof area by orientation',
      unit: 'm²',
      metricLabel: 'Area',
      maximumFractionDigits: 2,
      barGradient: 'linear-gradient(90deg, rgba(245,158,11,0.95) 0%, rgba(251,191,36,0.95) 100%)',
    },
    {
      key: 'production',
      title: 'ศักยภาพการผลิตไฟฟ้ารวมต่อปี',
      subtitle: 'Energy generation by orientation',
      unit: 'MWh/yr',
      metricLabel: 'Energy generation',
      maximumFractionDigits: 2,
      barGradient: 'linear-gradient(90deg, rgba(124,58,237,0.95) 0%, rgba(168,85,247,0.95) 100%)',
    },
    {
      key: 'radiation',
      title: 'ผลรวมรังสีดวงอาทิตย์รายทิศ',
      subtitle: 'Solar radiation by orientation',
      unit: 'MWh/yr',
      metricLabel: 'Solar radiation',
      maximumFractionDigits: 2,
      barGradient: 'linear-gradient(90deg, rgba(14,165,233,0.95) 0%, rgba(34,211,238,0.95) 100%)',
    },
  ]), []);

  const safeTotalBuildings = Math.max(stats.totalBuildings, 1);
  const suitabilityCards = [
    {
      key: 'high',
      title: 'ผลิตไฟฟ้าได้มาก',
      count: stats.highSuitabilityCount,
      percentage: ((stats.highSuitabilityCount / safeTotalBuildings) * 100).toFixed(1),
      range: '> 29.28 MWh/yr',
      cardClass: 'border-emerald-500/20 bg-emerald-500/10',
      titleClass: 'text-emerald-300',
    },
    {
      key: 'medium',
      title: 'ผลิตไฟฟ้าได้ปานกลาง',
      count: stats.mediumSuitabilityCount,
      percentage: ((stats.mediumSuitabilityCount / safeTotalBuildings) * 100).toFixed(1),
      range: '10.84 - 29.28 MWh/yr',
      cardClass: 'border-amber-500/20 bg-amber-500/10',
      titleClass: 'text-amber-300',
    },
    {
      key: 'low',
      title: 'ผลิตไฟฟ้าได้น้อย',
      count: stats.lowSuitabilityCount,
      percentage: ((stats.lowSuitabilityCount / safeTotalBuildings) * 100).toFixed(1),
      range: '<= 10.84 MWh/yr',
      cardClass: 'border-rose-500/20 bg-rose-500/10',
      titleClass: 'text-rose-300',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative">
        <div className="absolute top-0 right-1/4 w-[560px] h-[560px] bg-sky-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="mb-12 border-b border-white/10 pb-6 relative z-10 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            สถิติภาพรวม <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-sky-400">(Dashboard)</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-3xl">
            สรุปศักยภาพพลังงานแสงอาทิตย์จากข้อมูลอาคารรวม และแสดงรายละเอียดแยกตามทิศของผิวหลังคาในรูปแบบกราฟแนวนอนสไตล์ Sunroof
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-400/30 bg-[var(--color-surface-1)]/85 p-5 text-sm text-[var(--color-text-primary)] shadow-xl backdrop-blur-sm">
            <p className="font-semibold text-rose-300">โหลดข้อมูลสถิติไม่สำเร็จ</p>
            <p className="mt-1 text-[var(--color-text-secondary)] break-words">{error}</p>
            <button
              onClick={() => setReloadTick((prev) => prev + 1)}
              className="mt-3 rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-100 transition-colors hover:bg-rose-500/30"
            >
              ลองใหม่
            </button>
          </div>
        ) : (
          <div className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-4 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_35px_-10px_rgba(59,130,246,0.3)] animate-fade-up delay-100 min-w-0">
                <h3 className="text-base font-medium text-[var(--color-text-secondary)] mb-2">จำนวนหลังคาอาคารรวม</h3>
                <p className="text-[30px] font-semibold text-white font-outfit tracking-tight leading-tight break-all tabular-nums">
                  <CountUp end={stats.totalBuildings} />
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">หน่วย: หลัง</p>
              </div>

              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-4 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_35px_-10px_rgba(16,185,129,0.3)] animate-fade-up delay-150 min-w-0">
                <h3 className="text-base font-medium text-[var(--color-text-secondary)] mb-2">พื้นที่หลังคารวม</h3>
                <p className="text-[30px] font-semibold text-white font-outfit tracking-tight leading-tight break-all tabular-nums">
                  <CountUp end={stats.totalArea} decimals={2} />
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">หน่วย: ตร.ม.</p>
              </div>

              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-4 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_35px_-10px_rgba(245,158,11,0.3)] animate-fade-up delay-200 min-w-0">
                <h3 className="text-base font-medium text-[var(--color-text-secondary)] mb-2">ผลรวมรังสีดวงอาทิตย์</h3>
                <p className="text-[30px] font-semibold text-white font-outfit tracking-tight leading-tight break-all tabular-nums">
                  <CountUp end={stats.totalRadiation} decimals={2} />
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">หน่วย: MWh/yr</p>
              </div>

              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-4 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_35px_-10px_rgba(139,92,246,0.3)] animate-fade-up delay-250 min-w-0">
                <h3 className="text-base font-medium text-[var(--color-text-secondary)] mb-2">ศักยภาพการผลิตไฟฟ้ารวม</h3>
                <p className="text-[30px] font-semibold text-white font-outfit tracking-tight leading-tight break-all tabular-nums">
                  <CountUp end={stats.totalProduction} decimals={2} />
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">หน่วย: MWh/yr</p>
              </div>

              <div className="bg-[var(--color-surface-1)]/80 backdrop-blur-sm rounded-3xl p-4 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_35px_-10px_rgba(99,102,241,0.3)] animate-fade-up delay-300 min-w-0">
                <h3 className="text-base font-medium text-[var(--color-text-secondary)] mb-2">มูลค่าประหยัดไฟรวม</h3>
                <p className="text-[30px] font-semibold text-white font-outfit tracking-tight leading-tight break-all tabular-nums">
                  <CountUp end={stats.totalSavings} />
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">หน่วย: บาท/ปี</p>
              </div>
            </div>

            <section className="rounded-2xl border border-white/8 bg-[var(--color-surface-2)]/45 p-5 sm:p-6 animate-fade-up delay-500">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">สัดส่วนการผลิตไฟฟ้า</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {suitabilityCards.map((item) => (
                  <div key={item.key} className={`rounded-xl border p-4 ${item.cardClass}`}>
                    <p className={`text-sm ${item.titleClass}`}>{item.title}</p>
                    <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                      <p className="text-2xl font-bold text-white"><CountUp end={item.count} /></p>
                      <span className="text-sm text-[var(--color-text-secondary)]">หลัง</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">สัดส่วน: {item.percentage}%</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">ปริมาณการผลิต: {item.range}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/8 bg-[var(--color-surface-1)]/70 backdrop-blur-sm p-6 sm:p-8 shadow-2xl animate-fade-up delay-300">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">กราฟแยกตามทิศหลังคา</h2>
                </div>
              </div>

              <div className="space-y-6">
                {directionalCharts.map((chart) => {
                  const chartTotal = Math.max(directionalMetricTotals[chart.key], 1);
                  const maxValue = Math.max(...directionalStats.map((item) => item[chart.key]), 1);

                  return (
                    <article key={chart.key} className="rounded-2xl border border-white/8 bg-[var(--color-surface-2)]/45 p-4 sm:p-5">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{chart.title}</h3>
                          <p className="text-xs text-[var(--color-text-secondary)]">{chart.subtitle}</p>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          Total {chart.metricLabel}: {formatValue(directionalMetricTotals[chart.key], chart.maximumFractionDigits)} {chart.unit}
                        </p>
                      </div>

                      <div className="mt-4 space-y-3">
                        {directionalStats.map((orientation) => {
                          const value = orientation[chart.key];
                          const width = `${(value / maxValue) * 100}%`;
                          const share = (value / chartTotal) * 100;

                          return (
                            <div key={`${chart.key}-${orientation.key}`} className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-2 sm:gap-3 items-center">
                              <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                                <span className="text-[var(--color-text-primary)]">{orientation.label}</span>
                              </div>

                              <div className="relative h-9 rounded-md border border-white/10 overflow-hidden bg-white/5">
                                <div
                                  className="absolute inset-y-0 left-0 rounded-md transition-all duration-700 ease-[var(--ease-out-quint)]"
                                  style={{
                                    width,
                                    background: chart.barGradient,
                                  }}
                                />
                                <div className="relative z-10 h-full px-3 flex items-center text-xs font-semibold text-white/90">
                                  {share.toFixed(1)}%
                                </div>
                              </div>

                              <div className="text-right tabular-nums text-sm font-semibold text-[var(--color-text-primary)]">
                                {formatValue(value, chart.maximumFractionDigits)}
                                <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">{chart.unit}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                หมายเหตุ: กราฟรายทิศเป็นการสรุปจากไฟล์แยกทิศแต่ละชุดข้อมูลโดยตรง จึงใช้สำหรับเปรียบเทียบสัดส่วนศักยภาพระหว่างทิศทางหลังคา
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Stats;
