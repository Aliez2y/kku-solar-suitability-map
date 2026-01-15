
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, GeoJSON, ZoomControl } from 'react-leaflet';
import BaseMap from './layer/BaseMap';
import Navbar from './Navbar';
import L from 'leaflet';



const MapContent = () => {
    const [geoData, setGeoData] = useState(null);
    const [selected, setSelected] = useState(null); // { latlng, properties, layer }
    const [activeFilter, setActiveFilter] = useState(null); // SR filter: 'high' | 'medium' | 'low' | null
    const [activeSuitability, setActiveSuitability] = useState(null); // Suitability filter by ELEC_PROD
    const [legendMode, setLegendMode] = useState('sr'); // 'sr' | 'suitability' — default is SR
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const geoJsonRef = useRef();


    // Usable_SR color function (red = high, orange = medium, yellow = low)
    function getUsableSRColor(val) {
        if (val > 170.26) return '#EF4444'; // red (High)
        if (val > 63.03) return '#F59E42'; // orange (Medium)
        return '#FDE047'; // yellow (Low)
    }

    // Get filter category for a given SR value
    function getSRCategory(val) {
        if (val > 170.26) return 'high';
        if (val > 63.03) return 'medium';
        return 'low';
    }

    // Suitability by ELEC_PROD thresholds
    function getSuitabilityCategory(elec) {
        // High: ELEC_PROD > 29.28
        // Medium: 10.84 < ELEC_PROD ≤ 29.28
        // Low: ELEC_PROD ≤ 10.84
        if (elec > 29.28) return 'high';
        if (elec > 10.84) return 'medium';
        return 'low';
    }

    // Suitability color palette - clear distinct colors
    function getSuitabilityColor(elec) {
        const cat = getSuitabilityCategory(elec);
        if (cat === 'high') return '#10B981'; // emerald-500 - เขียวสด
        if (cat === 'medium') return '#FBBF24'; // amber-400 - เหลืองสด
        return '#EF4444'; // red-500 - แดงสด
    }

    // Handle legend item click
    const handleLegendClick = (category) => {
        if (activeFilter === category) {
            // If clicking the same category, clear filter
            setActiveFilter(null);
        } else {
            // Set new filter
            setActiveFilter(category);
        }
        // Close side panel when filtering
        setSelected(null);
    };

    // Handle Suitability legend click (ELEC_PROD)
    const handleSuitabilityClick = (category) => {
        if (activeSuitability === category) {
            setActiveSuitability(null);
        } else {
            setActiveSuitability(category);
        }
        setSelected(null);
    };

    // Toggle legend mode and clear the non-active filter to avoid hidden combined filtering
    const switchLegendMode = (mode) => {
        if (mode === legendMode) return;
        setLegendMode(mode);
        if (mode === 'sr') {
            // returning to SR: clear Suitability filter
            setActiveSuitability(null);
        } else {
            // switching to Suitability: clear SR filter
            setActiveFilter(null);
        }
        setSelected(null);
    };

    useEffect(() => {
        // Load GeoJSON from public folder
        fetch('/Suitable_SolarKKU.geojson')
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    // Close side panel
    // Close side panel and reset highlight
    const handleClosePanel = () => setSelected(null);

    // highlight feature with vibrant selected color
    useEffect(() => {
        if (!geoData || !geoJsonRef.current) return;

        geoJsonRef.current.eachLayer(layer => {
            if (!layer.feature || !layer.setStyle) return;
            const sr = layer.feature.properties.USABLE_SR;
            const category = getSRCategory(sr);
            const elec = layer.feature.properties.ELEC_PROD;
            const suitCat = getSuitabilityCategory(elec);
            const isSelected = selected && layer.feature.properties.B_ID === selected.properties.B_ID;

            // Apply filter only for currently active legend
            const isSRMode = legendMode === 'sr';
            const hasActiveFilter = isSRMode ? !!activeFilter : !!activeSuitability;
            const matchesActiveFilter = isSRMode
                ? (!activeFilter || category === activeFilter)
                : (!activeSuitability || suitCat === activeSuitability);

            if (hasActiveFilter && !matchesActiveFilter) {
                layer.setStyle({
                    fillOpacity: 0,
                    opacity: 0
                });
                // Disable pointer events for filtered out buildings
                if (layer.getElement) {
                    const element = layer.getElement();
                    if (element) {
                        element.style.pointerEvents = 'none';
                        element.style.cursor = 'default';
                    }
                }
                return;
            }
            
            // Re-enable pointer events for visible buildings
            if (layer.getElement) {
                const element = layer.getElement();
                if (element) {
                    element.style.pointerEvents = 'auto';
                    element.style.cursor = 'pointer';
                }
            }
            
            if (isSelected) {
                layer.setStyle({
                    color: '#0EA5E9', // bright cyan-blue border
                    weight: 4,
                    fillOpacity: 0.6,
                    fillColor: '#06B6D4', // bright cyan fill
                    opacity: 1,
                    dashArray: null
                });
                if (layer.bringToFront) layer.bringToFront();
            } else {
                const strokeColor = legendMode === 'sr' ? getUsableSRColor(sr) : getSuitabilityColor(elec);
                const fillColor = strokeColor;
                layer.setStyle({
                    color: strokeColor,
                    weight: 2,
                    fillOpacity: 0.18,
                    fillColor: fillColor,
                    opacity: 1
                });
            }
        });
    }, [selected, geoData, activeFilter, activeSuitability, legendMode]);

    return (
        <>
            <Navbar />
            <div className="relative w-full h-full">
                {/* Custom style to move Leaflet controls below Navbar and enhance them */}
                <style>{`
                    .leaflet-top, .leaflet-control {
                        margin-top: 80px !important;
                    }
                    .leaflet-top.leaflet-right {
                        right: 12px !important;
                        top: 10px !important;
                    }
                    .leaflet-control-zoom {
                        margin-top: 20px !important;
                        margin-bottom: 8px !important;
                    }
                    .leaflet-control-zoom a {
                        background: white !important;
                        border: none !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                        border-radius: 8px !important;
                        margin-bottom: 4px !important;
                        width: 36px !important;
                        height: 36px !important;
                        line-height: 36px !important;
                        font-size: 20px !important;
                        transition: all 0.2s !important;
                    }
                    .leaflet-control-zoom a:hover {
                        background: #3b82f6 !important;
                        color: white !important;
                        transform: scale(1.05);
                    }
                    .leaflet-control-layers {
                        margin-top: 0 !important;
                        border-radius: 12px !important;
                        border: none !important;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
                    }
                    .leaflet-control-layers-toggle {
                        background-image: none !important;
                        width: 36px !important;
                        height: 36px !important;
                    }
                    .leaflet-control-layers-toggle::before {
                        content: "🗺️";
                        font-size: 18px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                {/* Side Panel with enhanced design and animations */}
                {selected && (
                    <div className="fixed left-2 sm:left-4 top-20 sm:top-24 w-[calc(100vw-1rem)] sm:w-[340px] md:w-[360px] lg:w-[380px] max-w-[95vw] sm:max-w-[90vw] bg-gradient-to-br from-white to-blue-50 shadow-2xl z-[1100] rounded-xl sm:rounded-2xl overflow-hidden border border-blue-100 animate-in slide-in-from-left duration-300 max-h-[calc(100vh-6rem)] overflow-y-auto"
                         style={{ fontFamily: 'Noto Sans Thai, sans-serif' }}>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-10">
                            <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                </svg>
                                ข้อมูลอาคาร
                            </h3>
                            <button 
                                className="text-white hover:bg-white/20 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-200 hover:rotate-90" 
                                onClick={handleClosePanel} 
                                title="ปิด">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                            {/* Building ID */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-500">รหัสอาคาร</span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-blue-600">{selected.properties.B_ID}</p>
                            </div>

                            {/* Details Grid */}
                            <div className="space-y-2 sm:space-y-3">
                                {/* Area */}
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">พื้นที่หลังคา</p>
                                                <p className="text-lg font-bold text-gray-800">{selected.properties.AREA} <span className="text-sm font-normal text-gray-500">ตร.ม.</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Solar Radiation */}
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">รังสีดวงอาทิตย์</p>
                                                <p className="text-lg font-bold text-gray-800">{selected.properties.USABLE_SR} <span className="text-sm font-normal text-gray-500">MWh/yr</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Electricity Production */}
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">การผลิตไฟฟ้า</p>
                                                <p className="text-lg font-bold text-gray-800">{selected.properties.ELEC_PROD} <span className="text-sm font-normal text-gray-500">MWh/yr</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Legend Card with toggle between SR and Suitability - Enhanced Design */}
                <div className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 md:right-6 z-[1001] bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 min-w-[280px] md:min-w-[320px] max-w-[calc(100vw-1rem)] sm:max-w-none overflow-hidden">
                    {/* Decorative gradient bar at top */}
                    <div className={`h-1 transition-all duration-500 ${legendMode === 'sr' ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500'}`}></div>
                    
                    <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4">
                        {/* Toggle header with icons */}
                        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                            <div className="inline-flex p-1 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl shadow-inner">
                                <button
                                    onClick={() => switchLegendMode('sr')}
                                    className={`${
                                        legendMode === 'sr' 
                                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg scale-105' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    } px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 font-medium`}
                                    title="รังสีดวงอาทิตย์"
                                >
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="hidden sm:inline">รังสี</span>
                                </button>
                                <button
                                    onClick={() => switchLegendMode('suitability')}
                                    className={`${
                                        legendMode === 'suitability' 
                                            ? 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg scale-105' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    } px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 font-medium`}
                                    title="ความเหมาะสม"
                                >
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="hidden sm:inline">เหมาะสม</span>
                                </button>
                            </div>
                            {(legendMode === 'sr' ? activeFilter : activeSuitability) && (
                                <button
                                    onClick={() => legendMode === 'sr' ? setActiveFilter(null) : setActiveSuitability(null)}
                                    className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 font-semibold px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    รีเซ็ต
                                </button>
                            )}
                        </div>

                        {legendMode === 'sr' ? (
                        <>
                            <div className="mb-3 flex items-center gap-2">
                                <div className={`w-1 h-8 rounded-full transition-all duration-500 ${legendMode === 'sr' ? 'bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500' : 'bg-gray-300'}`}></div>
                                <p className="text-[10px] sm:text-xs text-gray-600 font-medium">คลิกเพื่อกรองตามระดับรังสีดวงอาทิตย์</p>
                            </div>
                            <div className="space-y-2">
                                <div
                                    onClick={() => handleLegendClick('high')}
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeFilter === 'high'
                                            ? 'bg-gradient-to-r from-red-50 to-red-100 ring-2 ring-red-400 shadow-lg shadow-red-200/50'
                                            : 'bg-white hover:bg-red-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeFilter === 'high' ? 'ring-2 ring-red-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">&gt; 170.26</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-red-200 text-red-800 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">พื้นที่รับรังสีสูงมาก</p>
                                    </div>
                                    {activeFilter === 'high' && (
                                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                                <div
                                    onClick={() => handleLegendClick('medium')}
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeFilter === 'medium'
                                            ? 'bg-gradient-to-r from-orange-50 to-orange-100 ring-2 ring-orange-400 shadow-lg shadow-orange-200/50'
                                            : 'bg-white hover:bg-orange-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeFilter === 'medium' ? 'ring-2 ring-orange-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">63.03 – 170.26</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-orange-200 text-orange-800 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">พื้นที่รับรังสีปานกลาง</p>
                                    </div>
                                    {activeFilter === 'medium' && (
                                        <svg className="w-5 h-5 text-orange-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                                <div
                                    onClick={() => handleLegendClick('low')}
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeFilter === 'low'
                                            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 ring-2 ring-yellow-400 shadow-lg shadow-yellow-200/50'
                                            : 'bg-white hover:bg-yellow-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeFilter === 'low' ? 'ring-2 ring-yellow-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">≤ 63.03</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-yellow-200 text-yellow-800 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">พื้นที่รับรังสีต่ำ</p>
                                    </div>
                                    {activeFilter === 'low' && (
                                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3 flex items-center gap-2">
                                <div className={`w-1 h-8 rounded-full transition-all duration-500 ${legendMode === 'suitability' ? 'bg-gradient-to-b from-emerald-500 via-amber-400 to-red-500' : 'bg-gray-300'}`}></div>
                                <p className="text-[10px] sm:text-xs text-gray-600 font-medium">คลิกเพื่อกรองตามค่าการผลิตไฟฟ้า</p>
                            </div>
                            <div className="space-y-2">
                                <div 
                                    onClick={() => handleSuitabilityClick('high')} 
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeSuitability === 'high' 
                                            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 ring-2 ring-emerald-400 shadow-lg shadow-emerald-200/50' 
                                            : 'bg-white hover:bg-emerald-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeSuitability === 'high' ? 'ring-2 ring-emerald-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">&gt; 29.28</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 font-medium">เหมาะสมมาก</p>
                                    </div>
                                    {activeSuitability === 'high' && (
                                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                                <div 
                                    onClick={() => handleSuitabilityClick('medium')} 
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeSuitability === 'medium' 
                                            ? 'bg-gradient-to-r from-amber-50 to-amber-100 ring-2 ring-amber-400 shadow-lg shadow-amber-200/50' 
                                            : 'bg-white hover:bg-amber-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeSuitability === 'medium' ? 'ring-2 ring-amber-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">10.84 – 29.28</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 font-medium">เหมาะสมปานกลาง</p>
                                    </div>
                                    {activeSuitability === 'medium' && (
                                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                                <div 
                                    onClick={() => handleSuitabilityClick('low')} 
                                    className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                                        activeSuitability === 'low' 
                                            ? 'bg-gradient-to-r from-red-50 to-red-100 ring-2 ring-red-400 shadow-lg shadow-red-200/50' 
                                            : 'bg-white hover:bg-red-50 hover:shadow-md border border-gray-200'
                                    }`}
                                >
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${activeSuitability === 'low' ? 'ring-2 ring-red-300 ring-offset-2' : ''}`}>
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-gray-800">≤ 10.84</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-red-200 text-red-900 rounded-full font-semibold">MWh/yr</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 font-medium">เหมาะสมน้อย</p>
                                    </div>
                                    {activeSuitability === 'low' && (
                                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    </div>
                </div>
                <div ref={mapContainerRef} className="absolute inset-0 pointer-events-none z-[900]" style={{ width: '100%', height: '100%' }} />
                <MapContainer
                    style={{ width: '100%', height: '100vh' }}
                    center={[16.476025, 102.824633]}
                    zoom={18}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    whenCreated={mapInstance => (mapRef.current = mapInstance)}
                >
                    <BaseMap />
                    {/* Move Zoom control to top-right alongside basemap control */}
                    <ZoomControl position="topright" />
                    {geoData && (
                        <GeoJSON
                            ref={geoJsonRef}
                            data={geoData}
                            style={feature => {
                                // Initial style; will be overridden by useEffect on state changes
                                const sr = feature.properties.USABLE_SR;
                                const elec = feature.properties.ELEC_PROD;
                                const strokeColor = legendMode === 'sr' ? getUsableSRColor(sr) : getSuitabilityColor(elec);
                                return {
                                    color: strokeColor,
                                    weight: 2,
                                    fillOpacity: 0.18,
                                    fillColor: strokeColor
                                };
                            }}
                            onEachFeature={(feature, layer) => {
                                layer.on({
                                    click: (e) => {
                                        // Check only the current legend's filter and if this building matches it
                                        const sr = feature.properties.USABLE_SR;
                                        const category = getSRCategory(sr);
                                        const elec = feature.properties.ELEC_PROD;
                                        const suitCat = getSuitabilityCategory(elec);
                                        const isSRMode = legendMode === 'sr';
                                        if ((isSRMode && activeFilter && category !== activeFilter) || (!isSRMode && activeSuitability && suitCat !== activeSuitability)) {
                                            return;
                                        }
                                        
                                        // Update selection
                                        setSelected({ properties: feature.properties });

                                        // Center the map on the clicked building with offset for side panel
                                        const map = mapRef.current;
                                        if (map && layer.getBounds) {
                                            const bounds = layer.getBounds();
                                            const center = bounds.getCenter();
                                            
                                            // Convert lat/lng to pixel coordinates
                                            const point = map.latLngToContainerPoint(center);
                                            // Offset to account for 360px side panel (shift right by 180px to center in visible area)
                                            const offsetPoint = L.point(point.x + 180, point.y);
                                            // Convert back to lat/lng
                                            const offsetLatLng = map.containerPointToLatLng(offsetPoint);
                                            
                                            // Fly to the offset position
                                            map.flyTo(offsetLatLng, map.getZoom(), { 
                                                animate: true, 
                                                duration: 0.5 
                                            });
                                        }
                                    }
                                });
                                // Remove Leaflet Popup (side panel only)
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
}

export default MapContent;