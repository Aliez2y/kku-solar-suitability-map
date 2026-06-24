import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, GeoJSON, ZoomControl, LayersControl, Pane, TileLayer } from 'react-leaflet';
import Navbar from './Navbar';
import L from 'leaflet';

const SR_THRESHOLDS = {
    high: 170.26,
    medium: 63.03
};

const SUITABILITY_THRESHOLDS = {
    high: 29.28,
    medium: 10.84
};

const HIDDEN_LAYER_STYLE = {
    fillOpacity: 0,
    opacity: 0,
    interactive: false
};

const SELECTED_LAYER_STYLE = {
    color: '#0EA5E9',
    weight: 3,
    fill: true,
    fillOpacity: 1,
    fillColor: '#06B6D4',
    opacity: 1,
    dashArray: null,
    interactive: true
};

const MAP_DATA_URL_CANDIDATES = [
    '/GeoJSON_SolarKKN/BuildingSR_NKK.geojson',
    '/BuildingNKK_SR.geojson'
];

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

const getSRCategory = (value) => {
    if (value > SR_THRESHOLDS.high) return 'high';
    if (value > SR_THRESHOLDS.medium) return 'medium';
    return 'low';
};

const getUsableSRColor = (value) => {
    if (value > SR_THRESHOLDS.high) return '#EF4444';
    if (value > SR_THRESHOLDS.medium) return '#F97316';
    return '#FACC15';
};

const getSuitabilityCategory = (value) => {
    if (value > SUITABILITY_THRESHOLDS.high) return 'high';
    if (value > SUITABILITY_THRESHOLDS.medium) return 'medium';
    return 'low';
};

const getSuitabilityColor = (value) => {
    const category = getSuitabilityCategory(value);
    if (category === 'high') return '#10B981';
    if (category === 'medium') return '#F59E0B';
    return '#EF4444';
};

const getBaseFeatureStyle = (legendMode, properties) => {
    const sr = getUsableSRValue(properties);
    const elec = getElecProdValue(properties);
    const fillColor = legendMode === 'sr' ? getUsableSRColor(sr) : getSuitabilityColor(elec);

    return {
        color: fillColor,
        fill: true,
        stroke: false,
        weight: 0,
        fillOpacity: 1,
        fillColor,
        opacity: 1,
        interactive: true
    };
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
                lastError = new Error(`โหลดข้อมูลไม่สำเร็จ (${response.status}) จาก ${url}`);
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

    throw lastError || new Error('ไม่พบไฟล์ข้อมูล GeoJSON ที่ใช้งานได้');
};


const MapContent = () => {
    const [geoData, setGeoData] = useState(null);
    const [isGeoDataLoading, setIsGeoDataLoading] = useState(true);
    const [geoDataError, setGeoDataError] = useState('');
    const [reloadTick, setReloadTick] = useState(0);
    const [selected, setSelected] = useState(null); // { latlng, properties, layer }
    const [activeFilter, setActiveFilter] = useState(null); // SR filter: 'high' | 'medium' | 'low' | null
    const [activeSuitability, setActiveSuitability] = useState(null); // Suitability filter by ELEC_PROD
    const [legendMode, setLegendMode] = useState('sr'); // 'sr' | 'suitability' — default is SR
    const mapRef = useRef();
    const geoJsonRef = useRef();
    const filterRef = useRef({
        legendMode: 'sr',
        activeFilter: null,
        activeSuitability: null
    });
    const selectedBuildingId = selected?.properties?.B_ID ?? null;

    useEffect(() => {
        filterRef.current = {
            legendMode,
            activeFilter,
            activeSuitability
        };
    }, [legendMode, activeFilter, activeSuitability]);

    const handleLegendClick = useCallback((category) => {
        setActiveFilter((prev) => (prev === category ? null : category));
        setSelected(null);
    }, []);

    const handleSuitabilityClick = useCallback((category) => {
        setActiveSuitability((prev) => (prev === category ? null : category));
        setSelected(null);
    }, []);

    const switchLegendMode = useCallback((mode) => {
        if (mode === legendMode) return;
        setLegendMode(mode);
        if (mode === 'sr') {
            setActiveSuitability(null);
        } else {
            setActiveFilter(null);
        }
        setSelected(null);
    }, [legendMode]);

    const retryLoadGeoData = useCallback(() => {
        setReloadTick((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadGeoData = async () => {
            setIsGeoDataLoading(true);
            setGeoDataError('');

            try {
                const data = await fetchGeoJsonFromCandidates(MAP_DATA_URL_CANDIDATES, controller.signal);
                setGeoData(data);
            } catch (error) {
                if (error.name === 'AbortError') return;
                setGeoData(null);
                setGeoDataError(error.message || 'ไม่สามารถโหลดชั้นข้อมูลอาคารได้');
            } finally {
                if (!controller.signal.aborted) {
                    setIsGeoDataLoading(false);
                }
            }
        };

        loadGeoData();

        return () => controller.abort();
    }, [reloadTick]);

    const handleClosePanel = useCallback(() => setSelected(null), []);

    const geoJsonStyle = useCallback((feature) => {
        const properties = feature?.properties ?? {};
        return getBaseFeatureStyle(legendMode, properties);
    }, [legendMode]);

    const handleGeoJsonClick = useCallback((e) => {
        const clickedLayer = e.propagatedFrom ?? e.layer;
        if (!clickedLayer?.feature) return;

        const properties = clickedLayer.feature.properties ?? {};
        const sr = getUsableSRValue(properties);
        const elec = getElecProdValue(properties);
        const category = getSRCategory(sr);
        const suitabilityCategory = getSuitabilityCategory(elec);

        const currentFilters = filterRef.current;
        const isSRMode = currentFilters.legendMode === 'sr';
        const blockedByFilter = (isSRMode && currentFilters.activeFilter && category !== currentFilters.activeFilter)
            || (!isSRMode && currentFilters.activeSuitability && suitabilityCategory !== currentFilters.activeSuitability);

        if (blockedByFilter) return;

        setSelected({ properties });

        const map = mapRef.current;
        if (map && clickedLayer.getBounds) {
            const bounds = clickedLayer.getBounds();
            const center = bounds.getCenter();
            const point = map.latLngToContainerPoint(center);
            const offsetPoint = L.point(point.x + 180, point.y);
            const offsetLatLng = map.containerPointToLatLng(offsetPoint);

            map.flyTo(offsetLatLng, map.getZoom(), {
                animate: true,
                duration: 0.5
            });
        }
    }, []);

    useEffect(() => {
        if (!geoData || !geoJsonRef.current) return;

        geoJsonRef.current.eachLayer((layer) => {
            if (!layer.feature || !layer.setStyle) return;
            const properties = layer.feature.properties ?? {};
            const sr = getUsableSRValue(properties);
            const category = getSRCategory(sr);
            const elec = getElecProdValue(properties);
            const suitabilityCategory = getSuitabilityCategory(elec);
            const isSelected = selectedBuildingId !== null && properties.B_ID === selectedBuildingId;

            const isSRMode = legendMode === 'sr';
            const hasActiveFilter = isSRMode ? !!activeFilter : !!activeSuitability;
            const matchesActiveFilter = isSRMode
                ? (!activeFilter || category === activeFilter)
                : (!activeSuitability || suitabilityCategory === activeSuitability);

            if (hasActiveFilter && !matchesActiveFilter) {
                layer.setStyle(HIDDEN_LAYER_STYLE);
                return;
            }

            if (isSelected) {
                layer.setStyle(SELECTED_LAYER_STYLE);
                if (layer.bringToFront) layer.bringToFront();
                return;
            }

            layer.setStyle(getBaseFeatureStyle(legendMode, properties));
        });
    }, [activeFilter, activeSuitability, geoData, legendMode, selectedBuildingId]);

    return (
        <>
            <Navbar />
            <div className="relative w-full h-full">
                {isGeoDataLoading && (
                    <div className="absolute left-4 top-24 z-[1100] rounded-lg border border-white/10 bg-[var(--color-surface-2)]/90 px-4 py-3 text-sm text-[var(--color-text-secondary)] backdrop-blur-md shadow-lg">
                        กำลังโหลดข้อมูลอาคาร...
                    </div>
                )}

                {geoDataError && (
                    <div className="absolute left-4 top-24 z-[1100] max-w-[22rem] rounded-xl border border-red-400/40 bg-[var(--color-surface-1)]/95 p-4 text-sm text-[var(--color-text-primary)] shadow-xl backdrop-blur-md">
                        <p className="font-semibold text-red-300">โหลดชั้นข้อมูลไม่สำเร็จ</p>
                        <p className="mt-1 text-[var(--color-text-secondary)]">{geoDataError}</p>
                        <button
                            onClick={retryLoadGeoData}
                            className="mt-3 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/30"
                        >
                            ลองใหม่
                        </button>
                    </div>
                )}

                {/* Side Panel with enhanced design and animations */}
                {selected && (
                    <div className="fixed left-2 sm:left-4 top-20 sm:top-24 w-[calc(100vw-1rem)] sm:w-[360px] md:w-[380px] max-w-[95vw] sm:max-w-[90vw] bg-[var(--color-surface-2)]/95 backdrop-blur-md shadow-2xl z-[1100] rounded-xl overflow-hidden border border-white/10 animate-in slide-in-from-left duration-300 max-h-[calc(100vh-6rem)] overflow-y-auto"
                        style={{ fontFamily: 'Noto Sans Thai, sans-serif' }}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-emerald)] flex-shrink-0"></span>
                                <span className="text-lg font-semibold text-[var(--color-text-primary)]">อาคาร</span>
                                <span className="text-lg text-[var(--color-text-secondary)] font-mono truncate">#{selected.properties.B_ID ?? '—'}</span>
                            </div>
                            <button
                                onClick={handleClosePanel}
                                aria-label="ปิดแผงข้อมูล"
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/8 transition-colors flex-shrink-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Metrics */}
                        <div className="overflow-y-auto flex-1 px-4 py-1">
                            <div className="flex items-baseline justify-between py-3 border-b border-white/5">
                                <span className="text-sm text-[var(--color-text-secondary)]">พื้นที่หลังคา</span>
                                <span className="text-sm font-semibold text-[var(--color-text-primary)] tabular-nums">
                                    {formatValue(getAreaValue(selected.properties), 2)}
                                    <span className="text-sm font-normal text-[var(--color-text-secondary)] ml-1">ตร.ม.</span>
                                </span>
                            </div>
                            <div className="flex items-baseline justify-between py-3 border-b border-white/5">
                                <span className="text-sm text-[var(--color-text-secondary)]">รังสีดวงอาทิตย์</span>
                                <span className="text-sm font-semibold text-[var(--color-text-primary)] tabular-nums">
                                    {formatValue(getUsableSRValue(selected.properties), 2)}
                                    <span className="text-sm font-normal text-[var(--color-text-secondary)] ml-1">MWh/yr</span>
                                </span>
                            </div>
                            <div className="flex items-baseline justify-between py-3 border-b border-white/5">
                                <span className="text-sm text-[var(--color-text-secondary)]">ศักยภาพผลิตไฟฟ้า</span>
                                <span className="text-sm font-semibold text-[var(--color-text-primary)] tabular-nums">
                                    {formatValue(getElecProdValue(selected.properties), 2)}
                                    <span className="text-sm font-normal text-[var(--color-text-secondary)] ml-1">MWh/yr</span>
                                </span>
                            </div>
                            <div className="flex items-baseline justify-between py-3">
                                <span className="text-sm text-[var(--color-text-secondary)]">มูลค่าประหยัดไฟ</span>
                                <span className="text-sm font-bold text-[var(--color-brand-emerald)] tabular-nums">
                                    {formatValue(getElecCostValue(selected.properties), 0)}
                                    <span className="text-sm font-normal text-[var(--color-text-secondary)] ml-1">บาท/ปี</span>
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2.5 border-t border-white/5 flex-shrink-0">
                            <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                                *ประเมินจากการสมมติว่าอาคารทุกหลังเป็นประเภทที่ 1 (บ้านอยู่อาศัย) และผลิตเองทั้งหมด
                            </p>
                        </div>
                    </div>
                )}
                {/* Legend Card with toggle between SR and Suitability - Less Obtrusive */}
                <div className="legend-panel absolute bottom-6 right-4 z-[1000] bg-[var(--color-surface-2)]/90 backdrop-blur-md p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 animate-fade-in delay-200 w-72 overflow-hidden font-sans">
                    {/* Mode tabs */}
                    <div className="flex border-b border-white/8">
                        <button
                            onClick={() => switchLegendMode('sr')}
                            aria-pressed={legendMode === 'sr'}
                            className={`flex-1 py-2.5 px-3 text-sm font-semibold tracking-wide transition-colors ${legendMode === 'sr'
                                ? 'text-white bg-white/8'
                                : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                                }`}
                        >
                            ☀️ รังสี
                        </button>
                        <button
                            onClick={() => switchLegendMode('suitability')}
                            aria-pressed={legendMode === 'suitability'}
                            className={`flex-1 py-2.5 px-2 text-sm font-semibold tracking-wide transition-colors border-l border-white/8 ${legendMode === 'suitability'
                                ? 'text-white bg-white/8'
                                : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                                }`}
                        >
                            ⚡ การผลิตไฟฟ้า
                        </button>
                    </div>

                    {/* Items */}
                    <div className="p-2.5 space-y-0.5">
                        {legendMode === 'sr' ? (
                            <>
                                {[
                                    { cat: 'high', color: '#EF4444', label: 'รังสีสูงมาก', range: '> 170' },
                                    { cat: 'medium', color: '#F97316', label: 'รังสีปานกลาง', range: '63–170' },
                                    { cat: 'low', color: '#FACC15', label: 'รังสีต่ำ', range: '≤ 63' },
                                ].map(({ cat, color, label, range }) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleLegendClick(cat)}
                                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${activeFilter === cat ? 'bg-white/10 ring-1 ring-white/15' : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }}></span>
                                        <span className="flex-1 text-sm text-[var(--color-text-primary)]">{label}</span>
                                        <span className="text-[12px] text-[var(--color-text-secondary)] tabular-nums">{range}</span>
                                    </button>
                                ))}
                            </>
                        ) : (
                            <>
                                {[
                                    { cat: 'high', color: '#10B981', label: 'ผลิตไฟฟ้าได้มาก', range: '> 29' },
                                    { cat: 'medium', color: '#F59E0B', label: 'ผลิตไฟฟ้าได้ปานกลาง', range: '10–29' },
                                    { cat: 'low', color: '#EF4444', label: 'ผลิตไฟฟ้าได้น้อย', range: '≤ 10' },
                                ].map(({ cat, color, label, range }) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleSuitabilityClick(cat)}
                                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${activeSuitability === cat ? 'bg-white/10 ring-1 ring-white/15' : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }}></span>
                                        <span className="flex-1 text-sm text-[var(--color-text-primary)]">{label}</span>
                                        <span className="text-[12px] text-[var(--color-text-secondary)] tabular-nums">{range}</span>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Footer: hint + reset */}
                    <div className="px-3 pb-3 flex items-center justify-between gap-2">
                        <p className="text-[11px] text-[var(--color-text-secondary)]">คลิกเพื่อกรอง</p>
                        {(legendMode === 'sr' ? activeFilter : activeSuitability) && (
                            <button
                                onClick={() => legendMode === 'sr' ? setActiveFilter(null) : setActiveSuitability(null)}
                                className="text-[11px] text-[var(--color-brand-emerald)] hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                รีเซ็ต
                            </button>
                        )}
                    </div>
                </div>
                <style>
                    {`
                    .leaflet-top {
                        top: 90px !important;
                    }
                    .leaflet-control-layers:hover {
                        transform: scale(1.05);
                    }
                    `}
                </style>
                <MapContainer
                    ref={mapRef}
                    style={{ width: '100%', height: '100vh' }}
                    center={[16.436024, 102.835143]}
                    zoom={15}
                    scrollWheelZoom={true}
                    zoomControl={false}
                >
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="OpenStreetMap">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.BaseLayer checked name="โหมดมืด (Dark Mode)">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.BaseLayer name="ภาพดาวเทียม (Satellite)">
                            <TileLayer
                                attribution='Tiles &copy; Esri'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                        </LayersControl.BaseLayer>

                        {/* Optional Overlays */}
                        <LayersControl.Overlay name="รังสีดวงอาทิตย์">
                            <TileLayer
                                url="https://pub-0920b952247f49948396bee2dfb62c09.r2.dev/SolarraKKNGG_Tile/{z}/{x}/{y}.png"
                                maxNativeZoom={16}
                                maxZoom={18}
                                opacity={0.8}
                            />
                        </LayersControl.Overlay>

                        <LayersControl.Overlay name="รังสีดวงอาทิตย์ (มีเงื่อนไข)">
                            <TileLayer
                                url="https://pub-0920b952247f49948396bee2dfb62c09.r2.dev/SolarraKKNGG_Con/{z}/{x}/{y}.png"
                                maxNativeZoom={16}
                                maxZoom={18}
                                opacity={0.8}
                            />
                        </LayersControl.Overlay>

                        {/* GeoJSON Overlay */}
                        {geoData && (
                            <LayersControl.Overlay checked name="อาคาร (GeoJSON)">
                                <GeoJSON
                                    ref={geoJsonRef}
                                    data={geoData}
                                    style={geoJsonStyle}
                                    eventHandlers={{ click: handleGeoJsonClick }}
                                    pane="buildings-pane"
                                />
                            </LayersControl.Overlay>
                        )}
                    </LayersControl>
                    <Pane name="buildings-pane" style={{ zIndex: 460 }} />
                    {/* Move Zoom control to top-right alongside basemap control */}
                    <ZoomControl position="topright" />
                </MapContainer>
            </div>
        </>
    );
}

export default MapContent;