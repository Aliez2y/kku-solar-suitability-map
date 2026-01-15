import React from 'react'
import { LayersControl, TileLayer } from 'react-leaflet'

const BaseMap = () => {
    return (
        <>
            {/* Custom styles for enhanced base map control */}
            <style>{`
                /* Enhanced Layers Control Styling */
                .leaflet-control-layers {
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
                    border-radius: 16px !important;
                    border: none !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
                    overflow: hidden !important;
                    backdrop-filter: blur(10px) !important;
                    width: auto !important;
                    min-width: unset !important;
                    max-width: fit-content !important;
                }
                
                .leaflet-control-layers-toggle {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 14px !important;
                    background-image: none !important;
                    position: relative !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
                }
                
                .leaflet-control-layers-toggle:hover {
                    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5) !important;
                }
                
                .leaflet-control-layers-toggle::before {
                    content: "🗺️";
                    font-size: 22px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
                }
                
                .leaflet-control-layers-expanded {
                    padding: 10px 12px !important;
                    border: 2px solid #e0e7ff !important;
                    animation: slideIn 0.3s ease-out !important;
                    width: auto !important;
                    white-space: nowrap !important;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .leaflet-control-layers-list {
                    margin-bottom: 0 !important;
                }
                
                .leaflet-control-layers-base {
                    padding: 8px 0 !important;
                }
                
                .leaflet-control-layers-base label {
                    display: flex !important;
                    align-items: center !important;
                    padding: 8px 10px !important;
                    margin: 3px 0 !important;
                    border-radius: 10px !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                    font-size: 13px !important;
                    font-weight: 500 !important;
                    color: #334155 !important;
                    background: white !important;
                    border: 1.5px solid #e2e8f0 !important;
                    white-space: nowrap !important;
                    width: fit-content !important;
                    min-width: 100% !important;
                }
                
                .leaflet-control-layers-base label:hover {
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%) !important;
                    border-color: #93c5fd !important;
                    transform: translateX(4px) !important;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15) !important;
                }
                
                .leaflet-control-layers-base input[type="radio"] {
                    appearance: none !important;
                    width: 20px !important;
                    height: 20px !important;
                    border: 2px solid #cbd5e1 !important;
                    border-radius: 50% !important;
                    margin-right: 10px !important;
                    position: relative !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                    flex-shrink: 0 !important;
                }
                
                .leaflet-control-layers-base input[type="radio"]:checked {
                    border-color: #3b82f6 !important;
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
                }
                
                .leaflet-control-layers-base input[type="radio"]:checked::after {
                    content: "✓" !important;
                    position: absolute !important;
                    color: white !important;
                    font-size: 12px !important;
                    font-weight: bold !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                }
                
                .leaflet-control-layers-separator {
                    height: 2px !important;
                    background: linear-gradient(90deg, transparent, #e2e8f0, transparent) !important;
                    margin: 8px 0 !important;
                    border: none !important;
                }
                
                /* Add icons to different map types */
                .leaflet-control-layers-base label:nth-child(1)::before {
                    margin-right: 6px;
                    font-size: 16px;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
                }
                
                .leaflet-control-layers-base label:nth-child(2)::before {
                    margin-right: 6px;
                    font-size: 16px;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
                }
                
                .leaflet-control-layers-base label:nth-child(3)::before {
                    margin-right: 6px;
                    font-size: 16px;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
                }
            `}</style>
            
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="โหมดมืด (Dark Mode)">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    />
                </LayersControl.BaseLayer>
                
                <LayersControl.BaseLayer name="ภาพดาวเทียม (Satellite)">
                    <TileLayer
                        attribution='Tiles &copy; Esri'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
        </>
    )
}

export default BaseMap