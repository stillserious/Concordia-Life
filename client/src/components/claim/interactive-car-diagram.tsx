import React, { useState, useRef, useEffect } from 'react';

interface InteractiveCarDiagramProps {
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

export default function InteractiveCarDiagram({ selectedParts, onPartToggle }: InteractiveCarDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent, partName: string) => {
    setHoveredPart(partName);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.pageX - rect.left + 20,
        y: event.pageY - rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPart(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredPart && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.pageX - rect.left + 20,
        y: event.pageY - rect.top
      });
    }
  };

  return (
    <div 
      className="diagram-box relative w-full max-w-4xl mx-auto" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        .st0 {
          fill: #FFFFFF;
        }
        
        .st1 {
          stroke: #000000;
          stroke-width: 3;
          stroke-miterlimit: 10;
        }
        
        .st2 {
          fill: #221F1F;
        }
        
        .st3 {
          fill: #231F20;
        }
        
        .st4 {
          fill: none;
          stroke: #231F20;
          stroke-width: 2;
          stroke-miterlimit: 10;
        }
        
        .st5 {
          fill: none;
        }
        
        .st6 {
          fill: #FFFFFF;
          stroke: #000000;
          stroke-miterlimit: 10;
          opacity: 0;
        }
        
        .st7 {
          font-family: 'Arial-BoldMT';
        }
        
        .st8 {
          font-size: 32.0027px;
        }
        
        svg>text {
          font-family: 'MyriadPro-Regular';
          font-size: 6;
        }
        
        svg>a>g {
          cursor: pointer;
        }
        
        svg>g>a>g .st0 {
          fill: #ffffff;
        }
        
        svg a:hover g .st0, svg a:hover .st0, svg a:hover .stts {
          fill: #7bd6ef;
        }
        
        .selected .st0 {
          fill: #ff6b6b !important;
        }
        
        .maptext {
          font-family: 'MyriadPro-Regular';
          font-size: 6;
        }
      `}</style>

      {/* Tooltip */}
      {hoveredPart && (
        <div
          id="tooltip"
          className="absolute z-50 bg-black text-white text-center rounded-md px-2 py-1 text-sm pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            display: 'block'
          }}
        >
          {hoveredPart}
          <div className="absolute top-1/2 right-full -mt-1 border-4 border-transparent border-r-black"></div>
        </div>
      )}

      <svg 
        version="1.1" 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        x="0px" 
        y="0px" 
        viewBox="0 0 1920 1080" 
        className="w-full h-auto"
        xmlSpace="preserve"
      >
        {/* FRONT LEFT SIDE WHEEL ARCH */}
        <a 
          className={selectedParts.includes('FRONT_LEFT_SIDE_WHEEL_ARCH') ? 'selected' : ''}
          onClick={() => onPartToggle('FRONT_LEFT_SIDE_WHEEL_ARCH')}
          onMouseEnter={(e) => handleMouseEnter(e, 'FRONT LEFT SIDE WHEEL ARCH')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="FRONT_LEFT_SIDE_WHEEL_ARCH">
            <path className="st0" d="M727.95,241.74c-0.71-4.37-1.66-8.68-2.84-12.8c-5.23-18.36-14.76-33.4-27.56-43.47
              c-11.96-9.41-28.16-14.81-44.43-14.81c-3.36,0-6.74,0.23-10.03,0.68c-17.58,2.41-34.05,10.92-44.06,22.75
              c-4.18,4.94-7.77,10.78-10.66,17.36c-3.45,7.84-5.74,16.3-6.81,25.14c-0.88,7.29-0.45,14.95-0.04,22.36
              c0.13,2.24,0.25,4.55,0.34,6.81l6.85,0.76c-0.18-4.73-0.81-22.04-0.6-24.91c1.17-16.49,7.1-32.16,16.26-42.99
              c8.79-10.39,23.99-18.18,39.67-20.33c17.61-2.42,36,2.33,49.17,12.69c14.71,11.57,21.8,28.08,25.16,39.89
              c1.1,3.87,2,7.91,2.66,12.01c0.56,3.48,0.98,7.09,1.26,10.74l7.01-0.15C729.02,249.48,728.57,245.55,727.95,241.74z" />
            <path className="st0" d="M595.51,243.07c0-31.57,25.68-57.25,57.25-57.25s57.25,25.68,57.25,57.25c0,5.05-0.66,9.95-1.9,14.62
              l12.44-0.02c-0.05-0.93-0.09-1.87-0.15-2.78c-0.27-3.98-0.72-7.91-1.33-11.7c-0.65-4.02-1.53-7.99-2.61-11.78
              c-3.28-11.52-10.19-27.62-24.47-38.86c-12.76-10.04-30.58-14.63-47.67-12.29c-15.21,2.09-29.93,9.62-38.41,19.64
              c-8.89,10.51-14.65,25.76-15.8,41.84c-0.13,1.77,0.09,9.56,0.31,16.14l7.03-0.01C596.19,253.14,595.51,248.18,595.51,243.07z" />
          </g>
        </a>

        {/* FRONT RIGHT SIDE WHEEL ARCH */}
        <a 
          className={selectedParts.includes('FRONT_RIGHT_SIDE_WHEEL_ARCH') ? 'selected' : ''}
          onClick={() => onPartToggle('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
          onMouseEnter={(e) => handleMouseEnter(e, 'FRONT RIGHT SIDE WHEEL ARCH')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="FRONT_RIGHT_SIDE_WHEEL_ARCH">
            <path className="st0" d="M710.01,841.94c0,31.57-25.68,57.25-57.25,57.25s-57.25-25.68-57.25-57.25c0-5.12,0.68-10.07,1.95-14.8
              l-7.03-0.01c-0.22,6.58-0.43,14.37-0.31,16.14c1.14,16.08,6.9,31.33,15.8,41.84c8.48,10.03,23.2,17.55,38.41,19.64
              c17.09,2.35,34.91-2.25,47.67-12.29c14.28-11.24,21.19-27.34,24.47-38.86c1.08-3.79,1.96-7.76,2.61-11.78
              c0.61-3.79,1.06-7.72,1.33-11.7c0.06-0.91,0.11-1.85,0.15-2.78l-12.44-0.02C709.35,831.99,710.01,836.89,710.01,841.94z" />
            <path className="st0" d="M581.57,848.42c1.07,8.84,3.36,17.3,6.81,25.14c2.89,6.57,6.48,12.41,10.66,17.36
              c10.01,11.83,26.48,20.33,44.06,22.75c3.29,0.45,6.67,0.68,10.03,0.68c16.27,0,32.46-5.4,44.43-14.81
              c12.8-10.07,22.33-25.11,27.56-43.47c1.17-4.12,2.13-8.43,2.84-12.8c0.62-3.81,1.07-7.75,1.36-11.71l-7.01-0.15
              c-0.28,3.65-0.7,7.26-1.26,10.74c-0.66,4.1-1.56,8.14-2.66,12.01c-3.36,11.81-10.45,28.31-25.16,39.89
              c-13.18,10.37-31.56,15.11-49.17,12.69c-15.68-2.15-30.88-9.94-39.67-20.33c-9.16-10.83-15.09-26.5-16.26-42.99
              c-0.2-2.88,0.43-20.19,0.6-24.91l-6.85,0.76c-0.09,2.26-0.22,4.57-0.34,6.81C581.12,833.47,580.69,841.13,581.57,848.42z" />
          </g>
        </a>

        {/* REAR LEFT SIDE WHEEL ARCH */}
        <a 
          className={selectedParts.includes('REAR_LEFT_SIDE_WHEEL_ARCH') ? 'selected' : ''}
          onClick={() => onPartToggle('REAR_LEFT_SIDE_WHEEL_ARCH')}
          onMouseEnter={(e) => handleMouseEnter(e, 'REAR LEFT SIDE WHEEL ARCH')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="REAR_LEFT_SIDE_WHEEL_ARCH">
            <path className="st0" d="M1195.31,198.52c-1.41-1.92-2.93-3.75-4.55-5.5l-7.89,1.99c2.5,2.37,4.79,4.92,6.8,7.66
              c9.42,12.81,14.27,29.86,13.62,46.98l7.08-1.56C1210.74,229.83,1205.41,212.26,1195.31,198.52z" />
            <path className="st0" d="M1144.9,170.3c-3.3-0.4-6.6-0.6-9.8-0.6c-22.1,0-42.6,9.7-56.4,26.7l-0.1-0.1c-11.1,15.9-17,33.2-16.8,49.9
              l5.2-0.1c1-9.3,3-17.9,6-25.8c11.1-29.7,39.7-47,71-43.1c14.2,1.8,27.2,7.5,37,16.1l8-2C1177.9,180.1,1162.3,172.5,1144.9,170.3z"/>
            <path className="st0" d="M1079,243.1c0-31.6,25.7-57.2,57.2-57.2s57.2,25.7,57.2,57.2c0,4.8-0.6,9.4-1.7,13.8l8.8,0
              c2.6-19-2.1-38.8-12.6-53c-9.8-13.3-25.9-22.3-44.2-24.6c-30.4-3.9-58.1,12.9-68.9,41.8c-3.5,9.2-5.6,19.6-6.4,30.9
              c0,0.3,0,2.4-0.1,5.2l12.2,0C1079.6,252.6,1079,247.9,1079,243.1z"/>
            <path className="st0" d="M1193.5,841.9c0,31.6-25.7,57.2-57.2,57.2s-57.2-25.7-57.2-57.2c0-4.8,0.6-9.5,1.7-14l-12.2,0
              c0,2.8,0.1,4.9,0.1,5.2c0.8,11.2,2.9,21.6,6.4,30.9c10.8,28.8,38.5,45.6,68.9,41.8c18.3-2.3,34.5-11.3,44.2-24.6
              c10.5-14.3,15.2-34,12.6-53l-8.8,0C1192.9,832.5,1193.5,837.2,1193.5,841.9z"/>
          </g>
        </a>

        {/* REAR RIGHT SIDE WHEEL ARCH */}
        <a 
          className={selectedParts.includes('REAR_RIGHT_SIDE_WHEEL_ARCH') ? 'selected' : ''}
          onClick={() => onPartToggle('REAR_RIGHT_SIDE_WHEEL_ARCH')}
          onMouseEnter={(e) => handleMouseEnter(e, 'REAR RIGHT SIDE WHEEL ARCH')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="REAR_RIGHT_SIDE_WHEEL_ARCH">
            <path className="st0" d="M1193.5,841.9c0,31.6-25.7,57.2-57.2,57.2s-57.2-25.7-57.2-57.2c0-4.8,0.6-9.5,1.7-14l-12.2,0
              c0,2.8,0.1,4.9,0.1,5.2c0.8,11.2,2.9,21.6,6.4,30.9c10.8,28.8,38.5,45.6,68.9,41.8c18.3-2.3,34.5-11.3,44.2-24.6
              c10.5-14.3,15.2-34,12.6-53l-8.8,0C1192.9,832.5,1193.5,837.2,1193.5,841.9z"/>
            <path d="M1196.92,887.67c10.28-13.97,15.73-31.79,15.45-50.31l-2-0.44c0.37,18.26-4.96,35.83-15.06,49.57
              c-1.41,1.92-2.93,3.75-4.55,5.5l2.18,0.55C1194.33,890.98,1195.67,889.36,1196.92,887.67z" />
            <path className="st0" d="M1078.7,888.7L1078.7,888.7c13.8,16.9,34.4,26.6,56.5,26.6c3.2,0,6.6-0.2,9.8-0.6c17.3-2.2,33-9.7,44.2-21l-8-2
              c-9.8,8.6-22.8,14.3-37,16.1c-31.3,4-59.9-13.3-71-43c-2.9-7.9-4.9-16.5-6-25.8l-5.2-0.1C1061.7,855.4,1067.6,872.7,1078.7,888.7z"/>
            <path className="st0" d="M1195.3,886.5c10.1-13.7,15.4-31.3,15.1-49.6l-7.1-1.6c0.6,17.1-4.2,34.2-13.6,47c-2,2.7-4.3,5.3-6.8,7.7l7.9,2
              C1192.4,890.2,1193.9,888.4,1195.3,886.5z"/>
          </g>
        </a>

        {/* LEFT SIDE REAR MARKERS */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_REAR_MARKERS') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_REAR_MARKERS')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE REAR MARKERS')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_REAR_MARKERS">
            <path className="st2 stts" d="M1631.36,352.14c-1.87,0-3.39,1.52-3.39,3.39V404c0,1.73,0.57,3.45,1.61,4.83l5.16,6.89v-60.19
              C1634.75,353.66,1633.23,352.14,1631.36,352.14z" />
          </g>
        </a>

        {/* RIGHT SIDE REAR MARKERS */}
        <a 
          className={selectedParts.includes('RIGHT_SIDE_REAR_MARKERS') ? 'selected' : ''}
          onClick={() => onPartToggle('RIGHT_SIDE_REAR_MARKERS')}
          onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE REAR MARKERS')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="RIGHT_SIDE_REAR_MARKERS">
            <path className="st2 stts" d="M1627.97,676.21v48.48c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39V664.5l-5.16,6.89
              C1628.55,672.76,1627.97,674.48,1627.97,676.21z" />
          </g>
        </a>

        {/* RIGHT SIDE REAR WHEEL */}
        <a 
          className={selectedParts.includes('RIGHT_SIDE_REAR_WHEEL') ? 'selected' : ''}
          onClick={() => onPartToggle('RIGHT_SIDE_REAR_WHEEL')}
          onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE REAR WHEEL')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="RIGHT_SIDE_REAR_WHEEL">
            <path className="st0" d="M1142.21,833.73l-1.42-0.47c-0.31,0.68-0.48,1.06-0.48,1.06l0.01,0.03c0.08,0.75,0.79,1.26,1.53,1.12
              c4.72-3.52,22.52-20.55,23.54-21.48c0.58-0.52,0.61-1.42,0.06-1.98c-1.58-1.63-5.15-4.79-9.38-6.83c-0.65-0.31-1.44-0.08-1.82,0.54
              c-2.98,4.83-9.38,18.62-12.36,25.12l1.55,0.24L1142.21,833.73z" />
            <path className="st0" d="M1138.99,852.06c0,0,4.77,14.83,10.76,28.33c0.59,1.18,2.16,0.35,2.16,0.35s9.47-3.59,16.84-12.57
              c0.84-1.23-0.29-1.72-0.29-1.72s-20.09-16.99-23.58-19.01C1141.4,845.43,1137.62,847.15,1138.99,852.06z M1145.02,849.95
              c0,1.66-1.35,3-3,3c-1.66,0-3-1.35-3-3s1.35-3,3-3C1143.68,846.94,1145.02,848.29,1145.02,849.95z" />
            <path className="st0" d="M1141.69,842.02c0-2.97-2.4-5.38-5.37-5.38s-5.38,2.41-5.38,5.38c0,2.97,2.41,5.37,5.38,5.37
              C1139.29,847.39,1141.69,844.99,1141.69,842.02z" />
          </g>
        </a>

        {/* RIGHT SIDE FRONT WHEEL */}
        <a 
          className={selectedParts.includes('RIGHT_SIDE_FRONT_WHEEL') ? 'selected' : ''}
          onClick={() => onPartToggle('RIGHT_SIDE_FRONT_WHEEL')}
          onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE FRONT WHEEL')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="RIGHT_SIDE_FRONT_WHEEL">
            <path className="st0" d="M684.96,866.45c0,0-20.09-16.99-23.58-19.01c-3.48-2.01-7.26-0.29-5.89,4.62c0,0,4.77,14.83,10.76,28.33
              c0.59,1.18,2.16,0.35,2.16,0.35s9.47-3.59,16.84-12.57C686.09,866.94,684.96,866.45,684.96,866.45z M658.52,852.95
              c-1.66,0-3-1.35-3-3s1.35-3,3-3c1.66,0,3,1.35,3,3S660.18,852.95,658.52,852.95z" />
            <path className="st0" d="M658.19,842.02c0-2.97-2.4-5.38-5.37-5.38s-5.38,2.41-5.38,5.38c0,2.97,2.41,5.37,5.38,5.37
              C655.79,847.39,658.19,844.99,658.19,842.02z" />
          </g>
        </a>

        {/* LEFT SIDE REAR WHEEL */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_REAR_WHEEL') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_REAR_WHEEL')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE REAR WHEEL')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_REAR_WHEEL">
            <path className="st0" d="M1176.77,243.89c-14.7-1.46-30.27-1.34-30.27-1.34c-5.1,0.23-5.55,4.36-2.54,7.04
              c3,2.68,25.43,16.43,25.43,16.43s0.82,0.92,1.72-0.25c6.23-9.81,6.67-19.94,6.67-19.94S1178.08,244.08,1176.77,243.89z
              M1145.42,249.08c-1.66,0-3-1.35-3-3s1.35-3,3-3s3,1.35,3,3S1147.08,249.08,1145.42,249.08z" />
            <path className="st0" d="M1130.94,242.99c0,2.97,2.41,5.38,5.38,5.38s5.37-2.41,5.37-5.38s-2.4-5.37-5.37-5.37
              C1133.35,237.62,1130.94,240.02,1130.94,242.99z" />
          </g>
        </a>

        {/* LEFT SIDE FRONT WHEEL */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_FRONT_WHEEL') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_FRONT_WHEEL')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE FRONT WHEEL')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_FRONT_WHEEL">
            <path className="st0" d="M661.06,241.45l0.03,0.01c0,0,24.18-2.67,31.5-4.46c0.7-0.17,1.17-0.84,1.07-1.56
              c-0.64-4.65-2.54-9.02-3.61-11.03c-0.37-0.69-1.23-0.94-1.9-0.55c-1.2,0.68-22.88,12.38-27.68,15.79
              C660.1,240.3,660.37,241.13,661.06,241.45z" />
            <path className="st0" d="M647.44,242.99c0,2.97,2.41,5.38,5.38,5.38c2.97,0,5.37-2.41,5.37-5.38s-2.4-5.37-5.37-5.37
              C649.85,237.62,647.44,240.02,647.44,242.99z" />
          </g>
        </a>

        {/* LEFT SIDE DRIVER WINDOW */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_DRIVER_WINDOW') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_DRIVER_WINDOW')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE DRIVER WINDOW')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_DRIVER_WINDOW">
            <path className="st0" d="M811.28,690.01l-21.17,5.83c7.48,0.45,16.67,0.78,27.46,0.98l1.98,0.04
              C818.39,694,816.75,691.43,811.28,690.01z" />
            <path className="st0" d="M832.38,692.21l2.98,4.76c37.34,0.28,89.68-0.6,155.61-2.6l10.65-40.71c-26.44,1.56-53.77,4.31-81.54,8.27
              c-18.01,2.56-35.84,7.69-53.09,12.64c-4.91,1.41-9.98,2.87-14.98,4.24l-21.9,6.02c-0.88,1.48-0.78,5.1,0.2,8.03L832.38,692.21z" />
          </g>
        </a>

        {/* LEFT SIDE WING MIRROR */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_WING_MIRROR') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_WING_MIRROR')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE WING MIRROR')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_WING_MIRROR">
            <path className="st0" d="M823.69,694.92l4.23-1.32c-0.78-2.38-1.21-5.51-0.72-7.97l-6.38,1.75l-5.31,1.49c3.8,1.85,5.32,4.5,6.33,6.97
              C822.4,695.44,823.02,695.13,823.69,694.92z" />
            <path className="st0" d="M831.28,695.18l-6.84,2.13c-1.13,0.35-2.02,1.18-2.45,2.28c-0.43,1.1-0.34,2.32,0.25,3.34l9.59,16.67
              c1.02,1.78,2.55,1.86,5.17,1.83c0.47,0,0.94-0.01,1.41-0.01c1.73,0,3.45,0.03,5.16,0.05c1.07,0.02,2.14,0.03,3.22,0.04
              c0,0,0,0,0.01,0c0.27,0,0.4-0.17,0.46-0.27c0.06-0.1,0.13-0.31-0.01-0.54L831.28,695.18z" />
          </g>
        </a>

        {/* FRONT WINDSCREEN */}
        <a 
          className={selectedParts.includes('FRONT_WINDSCREEN') ? 'selected' : ''}
          onClick={() => onPartToggle('FRONT_WINDSCREEN')}
          onMouseEnter={(e) => handleMouseEnter(e, 'FRONT WINDSCREEN')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="FRONT_WINDSCREEN">
            <path className="st0" d="M804.09,675.12c32.5-10.02,65.6-17.92,99.07-23.65c-3.85-8.63-22.14-52.61-23.02-111.03h-0.02
              c0-0.14,0.01-0.27,0.01-0.41c0-0.14-0.01-0.27-0.01-0.41h0.02c0.88-58.42,19.17-102.41,23.02-111.04
              c-33.47-5.73-66.57-13.63-99.07-23.65l-38.5-11.87c-29.31,46.98-44.26,96.41-44.45,146.96c0.18,50.55,15.14,99.98,44.45,146.96
              L804.09,675.12z" />
            <path className="st0" d="M174.54,670.29c-1.6-37.79-2.41-77.82-2.41-120.56c0-44.04,0.85-90.96,2.56-141.31
              c-9.21,4.54-51.18,25.86-59.53,41.54c-0.08,0.41-0.14,0.82-0.17,1.23c-0.41,5.66-0.85,11.31-1.29,16.95
              c-1.3,16.59-2.64,33.74-3.08,50.69c-0.55,21.02-0.27,42.97,0.85,67.11c0.28,6.03,0.61,12.19,0.98,18.3
              c0.4,6.52,0.9,14.08,1.88,21.4c0.23,1.73,0.49,3.29,0.82,4.75C128.5,648.39,165.9,666.32,174.54,670.29z" />
          </g>
        </a>

        {/* RIGHT SIDE WING MIRROR */}
        <a 
          className={selectedParts.includes('RIGHT_SIDE_WING_MIRROR') ? 'selected' : ''}
          onClick={() => onPartToggle('RIGHT_SIDE_WING_MIRROR')}
          onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE WING MIRROR')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="RIGHT_SIDE_WING_MIRROR">
            <path className="st0" d="M827.49,386.32c-0.64-0.15-1.28-0.3-1.91-0.47c-0.74-0.21-1.43-0.46-2.05-0.74l0,0
              c-0.62-0.28-1.15-0.62-1.64-0.98c-1.01,2.5-2.52,5.2-6.38,7.07l5.21,1.46l6.48,1.78c-0.49-2.48-0.06-5.63,0.73-8.02
              C827.79,386.39,827.64,386.36,827.49,386.32z" />
            <path className="st0" d="M822.08,380.68c0.45,0.86,1.29,1.58,2.5,2.14c0.5,0.23,1.06,0.43,1.68,0.61c0.59,0.17,1.19,0.3,1.79,0.44
              c1.09,0.25,2.2,0.51,3.28,0.92l15.75-25.2c0.1-0.16,0.27-0.43,0.28-0.55c0.01-0.07-0.16-0.32-0.46-0.44
              c-0.46-0.18-1.08-0.15-1.74-0.12c-2.33,0.12-4.68,0.15-6.99,0.1c-0.36-0.01-0.73-0.03-1.12-0.05c-1.45-0.08-2.94-0.16-3.91,0.48
              c-0.8,0.5-1.36,1.47-1.85,2.33l-9,15.69C821.61,378.25,821.53,379.61,822.08,380.68z" />
          </g>
        </a>

        {/* LEFT SIDE DRIVER DOOR */}
        <a 
          className={selectedParts.includes('LEFT_SIDE_DRIVER_DOOR') ? 'selected' : ''}
          onClick={() => onPartToggle('LEFT_SIDE_DRIVER_DOOR')}
          onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE DRIVER DOOR')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="LEFT_SIDE_DRIVER_DOOR">
            <path className="st0" d="M947.25,137.9c-43,1.52-85.69,3.02-118.34,4.17l-0.05,0.06l-0.06-0.05c-3.31,0.12-6.52,0.23-9.62,0.34
              l-0.16,0.18l-0.19-0.17c-22.26,0.78-38.58,1.36-45.13,1.59c-2.55,1.99-4.09,4.09-5.08,6.42l176.94-3.28
              C946.06,144.08,946.63,140.99,947.25,137.9z" />
            <path className="st0" d="M945.22,149.16l-177.33,3.29c-0.7,2.37-1.02,4.98-1.38,7.94l-0.02,0.13c-2.25,18.4-0.94,37.7,0.73,57.51
              c0.02,0.24,0.05,0.66,0.09,1.24c2.13,28.76,4.64,32.71,5.34,33.24l171.09-3.7C942.77,241.41,937.56,197.35,945.22,149.16z" />
          </g>
        </a>

        {/* RIGHT SIDE DRIVER DOOR */}
        <a 
          className={selectedParts.includes('RIGHT_SIDE_DRIVER_DOOR') ? 'selected' : ''}
          onClick={() => onPartToggle('RIGHT_SIDE_DRIVER_DOOR')}
          onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE DRIVER DOOR')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="RIGHT_SIDE_DRIVER_DOOR">
            <path className="st0" d="M980.59,377.11c-45.22,0.07-93.06,0.46-142.2,1.15l-1.45,2.32c37.43-0.24,89.57,0.65,155.04,2.64
              c4.21,0.12,8.43,0.25,12.64,0.38l-2.37-6.5C995.03,377.1,987.8,377.09,980.59,377.11z" />
            <path className="st0" d="M980.58,374.59c6.91-0.01,13.83-0.01,20.75,0l-4.84-13.25c-21.05,0.01-42.03,0.04-63,0.06
              c-28.13,0.03-56.27,0.07-84.61,0.07l-8.91,14.26C888.56,375.04,935.86,374.66,980.58,374.59z" />
          </g>
        </a>

        {/* FRONT BONNET */}
        <a 
          className={selectedParts.includes('FRONT_BONNET') ? 'selected' : ''}
          onClick={() => onPartToggle('FRONT_BONNET')}
          onMouseEnter={(e) => handleMouseEnter(e, 'FRONT BONNET')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="FRONT_BONNET">
            <path className="st0" d="M781.08,697.67c-0.59-0.06-1.17-0.11-1.73-0.16c-7.81-0.82-15.51-4.8-23.55-12.2
              c-11.13-10.22-19.6-22.54-26.09-35.92l-0.01,0.09l-208.02-32.39c1.13,3.61,2.33,7.15,3.6,10.6c11.57,31.19,32.61,53.65,59.25,63.25
              c24.23,8.74,50.82,8.35,76.54,7.96c8.45-0.12,17.19-0.26,25.64-0.05c31.26,0.76,61.8,1.42,90.94,1.96
              C778.75,699.51,779.94,698.48,781.08,697.67z" />
            <path className="st0" d="M661.07,381.17c-25.71-0.38-52.31-0.78-76.53,7.96c-26.64,9.6-47.68,32.06-59.25,63.25
              c-1.28,3.45-2.47,6.98-3.6,10.6l208.02-32.39l0.01,0.09c6.48-13.38,14.96-25.7,26.09-35.92c8.04-7.39,15.74-11.38,23.55-12.2
              c1.03-0.1,2.11-0.2,3.25-0.3c0.14-0.01,0.28-0.02,0.42-0.03c-1.26-0.69-2.7-1.66-4.09-2.98c-29.44,0.55-60.42,1.21-92.22,1.98
              C678.27,381.42,669.53,381.29,661.07,381.17z" />
          </g>
        </a>

        {/* REAR BONNET */}
        <a 
          className={selectedParts.includes('REAR_BONNET') ? 'selected' : ''}
          onClick={() => onPartToggle('REAR_BONNET')}
          onMouseEnter={(e) => handleMouseEnter(e, 'REAR BONNET')}
          onMouseLeave={handleMouseLeave}
        >
          <g id="REAR_BONNET">
            <path className="st0" d="M1397.21,626.8c2.81-16.37,4.9-33.09,6.21-49.7c0.98-12.29,1.54-24.75,1.68-37.07
              c-0.14-12.31-0.71-24.78-1.68-37.07c-1.31-16.61-3.4-33.33-6.21-49.7c-1.81-10.5-4.22-21.55-8.32-31.59h-100.06
              c37.34,36.92,33.89,95.44,33.85,96.04v44.72c0.04,0.51,3.49,59.08-33.85,95.96h100.06C1393,648.35,1395.41,637.3,1397.21,626.8z" />
          </g>
        </a>

      </svg>
    </div>
  );
}