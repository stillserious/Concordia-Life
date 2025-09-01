import React, { useState, useRef, useEffect } from 'react';

interface InteractiveCarDiagramProps {
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

type CarView = 'top' | 'front' | 'rear' | 'left' | 'right';

export default function InteractiveCarDiagram({ selectedParts, onPartToggle }: InteractiveCarDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentView, setCurrentView] = useState<CarView>('top');
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

  const viewButtons = [
    { id: 'top' as CarView, label: 'Z góry', icon: '⬛' },
    { id: 'front' as CarView, label: 'Z przodu', icon: '⬜' },
    { id: 'rear' as CarView, label: 'Z tyłu', icon: '⬜' },
    { id: 'left' as CarView, label: 'Lewa strona', icon: '◀️' },
    { id: 'right' as CarView, label: 'Prawa strona', icon: '▶️' }
  ];

  const renderTopView = () => (
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
      {/* MAIN CAR BODY STRUCTURE */}
      <g id="BODY_TRIM">
        <path className="st0" d="M775.88,703.29c-28.62-0.54-58.59-1.18-89.23-1.93c-8.4-0.21-17.11-0.08-25.54,0.05
          c-25.94,0.39-52.77,0.79-77.43-8.11c-27.34-9.85-48.92-32.85-60.75-64.74c-9.52-25.7-15.02-56.14-15.91-88.1H507l0.02-0.85
          c0.89-31.96,6.39-62.41,15.91-88.1c11.83-31.9,33.41-54.89,60.75-64.75c24.66-8.9,51.48-8.5,77.43-8.11
          c8.43,0.12,17.15,0.26,25.54,0.05c31.04-0.75,61.31-1.41,90.12-1.94c-2.46-3.4-4.19-8.37-3.43-15.49
          c-3.81-0.01-7.63-0.01-11.44-0.02c-32.22-0.08-65.54-0.15-98.3,0.07c-7,0.05-12.81,0.16-18.28,0.34
          c-17.4,0.58-31.51,1.94-44.42,4.3c-15.97,2.91-29.67,7.29-41.9,13.39c-11.57,5.77-22.65,15.55-32.92,29.08
          c-8.18,10.77-14.9,23.15-19.97,36.82c-6.14,16.57-10.73,34.94-13.64,54.59c-1.95,13.09-3.1,26.61-3.45,40.19
          c0.34,13.59,1.5,27.1,3.45,40.18c2.91,19.66,7.5,38.03,13.64,54.6c9.9,26.7,26.08,48.36,46.78,62.63
          c33.45,19.17,74.69,21.04,110.71,21.29c32.76,0.23,66.08,0.15,98.3,0.07c3.87-0.01,7.75-0.02,11.62-0.02
          C772.5,711.85,773.77,706.86,775.88,703.29z" />
        <path className="st0" d="M1177.38,540.46v-0.85v-49.74c0-13.84-3.54-27.61-10.23-39.83l-5.15-9.38c-18.71,1.34-37.47,2.02-56.22,2.02
          c-10.48,0-20.95-0.21-31.42-0.63l-52.39-2.1l-0.02,200.15l52.41-2.1c29.21-1.17,58.48-0.69,87.64,1.4l5.16-9.39
          c6.69-12.22,10.23-25.99,10.23-39.83v-49.72L1177.38,540.46L1177.38,540.46z" />
      </g>

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
        </g>
      </a>

      {/* LEFT SIDE FENDER */}
      <a 
        className={selectedParts.includes('LEFT_SIDE_FENDER') ? 'selected' : ''}
        onClick={() => onPartToggle('LEFT_SIDE_FENDER')}
        onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE FENDER')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="LEFT_SIDE_FENDER">
          <path className="st0" d="M770.52,144.13c0.05-0.05,0.11-0.09,0.17-0.14c0.54-0.53,1.13-1.05,1.78-1.56l0.05,0.06
            c3.52-2.9,7.11-5.72,10.76-8.47l-8.54-4.46c-3.36,1.86-6.71,3.71-10.01,5.54l-1.99,1.11l-0.16-0.28l0.01,0.2
            c-130.28,9.26-172.97,24.82-185,30.8c3.8-0.16,7.59,0.1,11.16,0.98l57.8-11.98c11.35-2.35,22.99-3.66,34.58-3.87l85.3-1.58
            c0.84-2.26,2.1-4.36,4.11-6.35C770.54,144.13,770.52,144.13,770.52,144.13z" />
        </g>
      </a>

      {/* RIGHT SIDE FENDER */}
      <a 
        className={selectedParts.includes('RIGHT_SIDE_FENDER') ? 'selected' : ''}
        onClick={() => onPartToggle('RIGHT_SIDE_FENDER')}
        onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE FENDER')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="RIGHT_SIDE_FENDER">
          <path className="st0" d="M577.59,918.08c12.02,5.99,54.72,21.54,185,30.8l-0.01,0.2l0.16-0.28l1.99,1.11c3.3,1.83,6.64,3.68,10.01,5.54
            l8.54-4.46c-3.65-2.74-7.23-5.57-10.76-8.47l-0.05,0.06c-0.66-0.51-1.24-1.03-1.78-1.56c-0.05-0.05-0.11-0.09-0.17-0.14h0.02
            c-2.01-1.99-3.27-4.09-4.11-6.35l-85.3-1.58c-11.59-0.22-23.23-1.52-34.58-3.87l-57.8-11.98
            C585.19,917.98,581.39,918.24,577.59,918.08z" />
        </g>
      </a>
    </svg>
  );

  const renderFrontView = () => (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* FRONT WINDSCREEN */}
      <a 
        className={selectedParts.includes('FRONT_WINDSCREEN') ? 'selected' : ''}
        onClick={() => onPartToggle('FRONT_WINDSCREEN')}
        onMouseEnter={(e) => handleMouseEnter(e, 'FRONT WINDSCREEN')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="FRONT_WINDSCREEN">
          <path className="st0" d="M200,150 L600,150 L580,350 L220,350 Z" />
        </g>
      </a>
      
      {/* FRONT HEADLIGHTS */}
      <a 
        className={selectedParts.includes('FRONT_HEADLIGHTS') ? 'selected' : ''}
        onClick={() => onPartToggle('FRONT_HEADLIGHTS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'FRONT HEADLIGHTS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="FRONT_HEADLIGHTS">
          <ellipse cx="150" cy="280" rx="40" ry="25" className="st0" />
          <ellipse cx="650" cy="280" rx="40" ry="25" className="st0" />
        </g>
      </a>

      {/* FRONT GRILLE */}
      <a 
        className={selectedParts.includes('FRONT_GRILLE') ? 'selected' : ''}
        onClick={() => onPartToggle('FRONT_GRILLE')}
        onMouseEnter={(e) => handleMouseEnter(e, 'FRONT GRILLE')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="FRONT_GRILLE">
          <rect x="320" y="250" width="160" height="60" className="st0" />
        </g>
      </a>

      {/* FRONT BUMPER */}
      <a 
        className={selectedParts.includes('FRONT_BUMPER') ? 'selected' : ''}
        onClick={() => onPartToggle('FRONT_BUMPER')}
        onMouseEnter={(e) => handleMouseEnter(e, 'FRONT BUMPER')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="FRONT_BUMPER">
          <path className="st0" d="M100,320 L700,320 L680,380 L120,380 Z" />
        </g>
      </a>
    </svg>
  );

  const renderRearView = () => (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* REAR WINDSCREEN */}
      <a 
        className={selectedParts.includes('REAR_WINDSCREEN') ? 'selected' : ''}
        onClick={() => onPartToggle('REAR_WINDSCREEN')}
        onMouseEnter={(e) => handleMouseEnter(e, 'REAR WINDSCREEN')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="REAR_WINDSCREEN">
          <path className="st0" d="M220,150 L580,150 L600,350 L200,350 Z" />
        </g>
      </a>
      
      {/* REAR TAIL LIGHTS */}
      <a 
        className={selectedParts.includes('REAR_TAIL_LIGHTS') ? 'selected' : ''}
        onClick={() => onPartToggle('REAR_TAIL_LIGHTS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'REAR TAIL LIGHTS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="REAR_TAIL_LIGHTS">
          <rect x="120" y="270" width="35" height="60" className="st0" />
          <rect x="645" y="270" width="35" height="60" className="st0" />
        </g>
      </a>

      {/* REAR BUMPER */}
      <a 
        className={selectedParts.includes('REAR_BUMPER') ? 'selected' : ''}
        onClick={() => onPartToggle('REAR_BUMPER')}
        onMouseEnter={(e) => handleMouseEnter(e, 'REAR BUMPER')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="REAR_BUMPER">
          <path className="st0" d="M120,320 L680,320 L700,380 L100,380 Z" />
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
          <path className="st0" d="M250,180 L550,180 L570,250 L230,250 Z" />
        </g>
      </a>
    </svg>
  );

  const renderLeftSideView = () => (
    <svg viewBox="0 0 1000 400" className="w-full h-auto">
      {/* LEFT SIDE BODY */}
      <a 
        className={selectedParts.includes('LEFT_SIDE_BODY') ? 'selected' : ''}
        onClick={() => onPartToggle('LEFT_SIDE_BODY')}
        onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE BODY')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="LEFT_SIDE_BODY">
          <path className="st0" d="M100,200 L900,200 L900,320 L100,320 Z" />
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
          <rect x="200" y="210" width="150" height="100" className="st0" />
        </g>
      </a>

      {/* LEFT SIDE REAR DOOR */}
      <a 
        className={selectedParts.includes('LEFT_SIDE_REAR_DOOR') ? 'selected' : ''}
        onClick={() => onPartToggle('LEFT_SIDE_REAR_DOOR')}
        onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE REAR DOOR')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="LEFT_SIDE_REAR_DOOR">
          <rect x="500" y="210" width="150" height="100" className="st0" />
        </g>
      </a>

      {/* LEFT SIDE WINDOWS */}
      <a 
        className={selectedParts.includes('LEFT_SIDE_WINDOWS') ? 'selected' : ''}
        onClick={() => onPartToggle('LEFT_SIDE_WINDOWS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE WINDOWS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="LEFT_SIDE_WINDOWS">
          <rect x="220" y="150" width="110" height="50" className="st0" />
          <rect x="520" y="150" width="110" height="50" className="st0" />
        </g>
      </a>

      {/* LEFT SIDE WHEELS */}
      <a 
        className={selectedParts.includes('LEFT_SIDE_WHEELS') ? 'selected' : ''}
        onClick={() => onPartToggle('LEFT_SIDE_WHEELS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'LEFT SIDE WHEELS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="LEFT_SIDE_WHEELS">
          <circle cx="250" cy="360" r="40" className="st0" />
          <circle cx="750" cy="360" r="40" className="st0" />
        </g>
      </a>
    </svg>
  );

  const renderRightSideView = () => (
    <svg viewBox="0 0 1000 400" className="w-full h-auto">
      {/* RIGHT SIDE BODY */}
      <a 
        className={selectedParts.includes('RIGHT_SIDE_BODY') ? 'selected' : ''}
        onClick={() => onPartToggle('RIGHT_SIDE_BODY')}
        onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE BODY')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="RIGHT_SIDE_BODY">
          <path className="st0" d="M100,200 L900,200 L900,320 L100,320 Z" />
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
          <rect x="650" y="210" width="150" height="100" className="st0" />
        </g>
      </a>

      {/* RIGHT SIDE REAR DOOR */}
      <a 
        className={selectedParts.includes('RIGHT_SIDE_REAR_DOOR') ? 'selected' : ''}
        onClick={() => onPartToggle('RIGHT_SIDE_REAR_DOOR')}
        onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE REAR DOOR')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="RIGHT_SIDE_REAR_DOOR">
          <rect x="350" y="210" width="150" height="100" className="st0" />
        </g>
      </a>

      {/* RIGHT SIDE WINDOWS */}
      <a 
        className={selectedParts.includes('RIGHT_SIDE_WINDOWS') ? 'selected' : ''}
        onClick={() => onPartToggle('RIGHT_SIDE_WINDOWS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE WINDOWS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="RIGHT_SIDE_WINDOWS">
          <rect x="370" y="150" width="110" height="50" className="st0" />
          <rect x="670" y="150" width="110" height="50" className="st0" />
        </g>
      </a>

      {/* RIGHT SIDE WHEELS */}
      <a 
        className={selectedParts.includes('RIGHT_SIDE_WHEELS') ? 'selected' : ''}
        onClick={() => onPartToggle('RIGHT_SIDE_WHEELS')}
        onMouseEnter={(e) => handleMouseEnter(e, 'RIGHT SIDE WHEELS')}
        onMouseLeave={handleMouseLeave}
      >
        <g id="RIGHT_SIDE_WHEELS">
          <circle cx="250" cy="360" r="40" className="st0" />
          <circle cx="750" cy="360" r="40" className="st0" />
        </g>
      </a>
    </svg>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'top':
        return renderTopView();
      case 'front':
        return renderFrontView();
      case 'rear':
        return renderRearView();
      case 'left':
        return renderLeftSideView();
      case 'right':
        return renderRightSideView();
      default:
        return renderTopView();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <style>{`
        .st0 {
          fill: #FFFFFF;
          stroke: #000000;
          stroke-width: 1;
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
      `}</style>

      {/* Przyciski przełączania widoków */}
      <div className="flex justify-center gap-2 mb-6">
        {viewButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setCurrentView(button.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === button.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid={`view-button-${button.id}`}
          >
            <span className="mr-2">{button.icon}</span>
            {button.label}
          </button>
        ))}
      </div>

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

      {/* Diagram samochodu */}
      <div 
        className="diagram-box relative w-full max-w-4xl mx-auto border-2 border-gray-200 rounded-lg p-4 bg-white" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Widok: {viewButtons.find(b => b.id === currentView)?.label}
          </h3>
        </div>
        
        {renderCurrentView()}
      </div>
    </div>
  );
}