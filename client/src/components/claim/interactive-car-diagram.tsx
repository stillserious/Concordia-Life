import { useState } from "react";

interface InteractiveCarDiagramProps {
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

// Mapowanie nazw części z angielskiego na polski
const carPartsTranslations: Record<string, string> = {
  'FRONT_LEFT_SIDE_WHEEL_ARCH': 'Lewy przedni nadkol',
  'FRONT_RIGHT_SIDE_WHEEL_ARCH': 'Prawy przedni nadkol', 
  'REAR_LEFT_SIDE_WHEEL_ARCH': 'Lewy tylny nadkol',
  'REAR_RIGHT_SIDE_WHEEL_ARCH': 'Prawy tylny nadkol',
  'LEFT_SIDE_REAR_MARKERS': 'Lewe tylne światła kierunkowskazów',
  'RIGHT_SIDE_REAR_MARKERS': 'Prawe tylne światła kierunkowskazów',
  'EXHAUST_TIPS': 'Końcówki rury wydechowej',
  'RIGHT_SIDE_B_PILLAR': 'Prawa słupek B',
  'LEFT_SIDE_B_PILLAR': 'Lewa słupek B',
  'SUN_MOON_ROOF': 'Szyberdach',
  'FIREWALL': 'Gródź przeciwpożarowa',
  'LEFT_FRONT_DRL_FOG_LIGHT': 'Lewe przednie światła DRL/przeciwmgielne',
  'RIGHT_FRONT_DRL_FOG_LIGHT': 'Prawe przednie światła DRL/przeciwmgielne',
  'RIGHT_SIDE_ROCKER_PANEL': 'Prawy próg',
  'LEFT_SIDE_ROCKER_PANEL': 'Lewy próg',
  'RIGHT_SIDE_REAR_WHEEL': 'Prawe tylne koło',
  'RIGHT_SIDE_FRONT_WHEEL': 'Prawe przednie koło',
  'LEFT_SIDE_REAR_WHEEL': 'Lewe tylne koło',
  'LEFT_SIDE_FRONT_WHEEL': 'Lewe przednie koło',
  'LEFT_SIDE_DRIVER_WINDOW': 'Lewe okno kierowcy',
  'LEFT_SIDE_WING_MIRROR': 'Lewe lusterko',
  'LEFT_SIDE_PASSENGER_WINDOW': 'Lewe okno pasażera',
  'FRONT_REAR_WINDOW': 'Tylna szyba',
  'FRONT_WINDSCREEN': 'Przednia szyba',
  'RIGHT_SIDE_WING_MIRROR': 'Prawe lusterko',
  'RIGHT_SIDE_DRIVER_WINDOW': 'Prawe okno kierowcy',
  'RIGHT_SIDE_PASSENGER_WINDOW': 'Prawe okno pasażera',
  'LEFT_SIDE_PASSENGER_HANDLE': 'Lewa klamka pasażera',
  'LEFT_SIDE_DRIVER_HANDLE': 'Lewa klamka kierowcy',
  'RIGHT_SIDE_DRIVER_HANDLE': 'Prawa klamka kierowcy',
  'RIGHT_SIDE_PASSENGER_HANDLE': 'Prawa klamka pasażera',
  'LEFT_SIDE_DRIVER_DOOR': 'Lewe drzwi kierowcy',
  'LEFT_SIDE_PASSENGER_DOOR': 'Lewe drzwi pasażera',
  'RIGHT_SIDE_DRIVER_DOOR': 'Prawe drzwi kierowcy',
  'RIGHT_SIDE_PASSENGER_DOOR': 'Prawe drzwi pasażera',
  'LEFT_SIDE_FRONT_TYPE': 'Lewa przednia opona',
  'LEFT_SIDE_REAR_TYPE': 'Lewa tylna opona',
  'LEFT_INNER_TAIL_LIGHT': 'Lewe wewnętrzne światło tylne',
  'RIGHT_INNER_TAIL_LIGHT': 'Prawe wewnętrzne światło tylne',
  'LEFT_OUTER_TAIL_LIGHT': 'Lewe zewnętrzne światło tylne',
  'RIGHT_OUTER_TAIL_LIGHT': 'Prawe zewnętrzne światło tylne',
  'RIGHT_SIDE_FRONT_TYPE': 'Prawa przednia opona',
  'REAR_BONNET': 'Tylna klapa',
  'REAR_NUMBER_PLATE': 'Tylna tablica rejestracyjna',
  'FRONT_APRON_SPOILER': 'Przedni spoiler',
  'FRONT_BUMPERS': 'Przedni zderzak',
  'FRONT_BONNET': 'Maska',
  'REAR_DIFFUSER': 'Tylny dyfuzor',
  'REAR_BUMPERS': 'Tylny zderzak',
  'RIGHT_SIDE_REAR_TYPE': 'Prawa tylna opona',
  'LEFT_SIDE_FENDER': 'Lewy błotnik',
  'RIGHT_SIDE_FENDER': 'Prawy błotnik',
  'FRONT_LEFT_SIDE_HEADLAMP': 'Lewy przedni reflektor',
  'FRONT_RIGHT_SIDE_HEADLAMP': 'Prawy przedni reflektor',
  'FRONT_GRILL': 'Przednia osłona chłodnicy',
  'ROOF': 'Dach',
  'SPARE_REAR_WHEEL': 'Koło zapasowe',
  'SPARE_REAR_TYPE': 'Opona zapasowa',
  'LEFT_QUARTER_PANEL': 'Lewy tylny panel'
};

function InteractiveCarDiagram({ selectedParts, onPartToggle }: InteractiveCarDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (partId: string) => {
    onPartToggle(partId);
  };

  const handlePartHover = (partId: string | null) => {
    setHoveredPart(partId);
  };

  const isPartSelected = (partId: string) => selectedParts.includes(partId);
  const getPartName = (partId: string) => carPartsTranslations[partId] || partId;

  return (
    <div className="diagram-container relative">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Kliknij na części samochodu, aby oznaczyć uszkodzenia
        </h3>
        <p className="text-sm text-gray-600">
          Wybrane części będą podświetlone na niebiesko
        </p>
      </div>

      <div className="diagram-box bg-white border border-gray-200 rounded-lg p-4 overflow-auto">
        {hoveredPart && (
          <div 
            id="tooltip" 
            className="absolute z-10 bg-black text-white px-3 py-2 rounded text-sm pointer-events-none"
            style={{ 
              left: '50%', 
              top: '20px',
              transform: 'translateX(-50%)'
            }}
          >
            {getPartName(hoveredPart)}
          </div>
        )}

        <svg 
          viewBox="0 0 1920 1080" 
          className="w-full h-auto max-w-4xl mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          {/* Przedni lewy nadkol */}
          <g 
            id="FRONT_LEFT_SIDE_WHEEL_ARCH"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_LEFT_SIDE_WHEEL_ARCH') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_LEFT_SIDE_WHEEL_ARCH')}
            onMouseEnter={() => handlePartHover('FRONT_LEFT_SIDE_WHEEL_ARCH')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-left-wheel-arch"
          > 
            <path d="M727.95,241.74c-0.71-4.37-1.66-8.68-2.84-12.8c-5.23-18.36-14.76-33.4-27.56-43.47c-11.96-9.41-28.16-14.81-44.43-14.81c-3.36,0-6.74,0.23-10.03,0.68c-17.58,2.41-34.05,10.92-44.06,22.75c-4.18,4.94-7.77,10.78-10.66,17.36c-3.45,7.84-5.74,16.3-6.81,25.14c-0.88,7.29-0.45,14.95-0.04,22.36c0.13,2.24,0.25,4.55,0.34,6.81l6.85,0.76c-0.18-4.73-0.81-22.04-0.6-24.91c1.17-16.49,7.1-32.16,16.26-42.99c8.79-10.39,23.99-18.18,39.67-20.33c17.61-2.42,36,2.33,49.17,12.69c14.71,11.57,21.8,28.08,25.16,39.89c1.1,3.87,2,7.91,2.66,12.01c0.56,3.48,0.98,7.09,1.26,10.74l7.01-0.15C729.02,249.48,728.57,245.55,727.95,241.74z"/>
            <path d="M595.51,243.07c0-31.57,25.68-57.25,57.25-57.25s57.25,25.68,57.25,57.25c0,5.05-0.66,9.95-1.9,14.62l12.44-0.02c-0.05-0.93-0.09-1.87-0.15-2.78c-0.27-3.98-0.72-7.91-1.33-11.7c-0.65-4.02-1.53-7.99-2.61-11.78c-3.28-11.52-10.19-27.62-24.47-38.86c-12.76-10.04-30.58-14.63-47.67-12.29c-15.21,2.09-29.93,9.62-38.41,19.64c-8.89,10.51-14.65,25.76-15.8,41.84c-0.13,1.77,0.09,9.56,0.31,16.14l7.03-0.01C596.19,253.14,595.51,248.18,595.51,243.07z"/>  
          </g>

          {/* Przedni prawy nadkol */}
          <g 
            id="FRONT_RIGHT_SIDE_WHEEL_ARCH"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_RIGHT_SIDE_WHEEL_ARCH') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
            onMouseEnter={() => handlePartHover('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-right-wheel-arch"
          >
            <path d="M710.01,841.94c0,31.57-25.68,57.25-57.25,57.25s-57.25-25.68-57.25-57.25c0-5.12,0.68-10.07,1.95-14.8l-7.03-0.01c-0.22,6.58-0.43,14.37-0.31,16.14c1.14,16.08,6.9,31.33,15.8,41.84c8.48,10.03,23.2,17.55,38.41,19.64c17.09,2.35,34.91-2.25,47.67-12.29c14.28-11.24,21.19-27.34,24.47-38.86c1.08-3.79,1.96-7.76,2.61-11.78c0.61-3.79,1.06-7.72,1.33-11.7c0.06-0.91,0.11-1.85,0.15-2.78l-12.44-0.02C709.35,831.99,710.01,836.89,710.01,841.94z"/>
            <path d="M581.57,848.42c1.07,8.84,3.36,17.3,6.81,25.14c2.89,6.57,6.48,12.41,10.66,17.36c10.01,11.83,26.48,20.33,44.06,22.75c3.29,0.45,6.67,0.68,10.03,0.68c16.27,0,32.46-5.4,44.43-14.81c12.8-10.07,22.33-25.11,27.56-43.47c1.17-4.12,2.13-8.43,2.84-12.8c0.62-3.81,1.07-7.75,1.36-11.71l-7.01-0.15c-0.28,3.65-0.7,7.26-1.26,10.74c-0.66,4.1-1.56,8.14-2.66,12.01c-3.36,11.81-10.45,28.31-25.16,39.89c-13.18,10.37-31.56,15.11-49.17,12.69c-15.68-2.15-30.88-9.94-39.67-20.33c-9.16-10.83-15.09-26.5-16.26-42.99c-0.2-2.88,0.43-20.19,0.6-24.91l-6.85,0.76c-0.09,2.26-0.22,4.57-0.34,6.81C581.12,833.47,580.69,841.13,581.57,848.42z"/>
          </g>

          {/* Tylny lewy nadkol */}
          <g 
            id="REAR_LEFT_SIDE_WHEEL_ARCH"
            className={`cursor-pointer transition-colors ${
              isPartSelected('REAR_LEFT_SIDE_WHEEL_ARCH') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('REAR_LEFT_SIDE_WHEEL_ARCH')}
            onMouseEnter={() => handlePartHover('REAR_LEFT_SIDE_WHEEL_ARCH')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-rear-left-wheel-arch"
          >
            <path d="M1195.31,198.52c-1.41-1.92-2.93-3.75-4.55-5.5l-7.89,1.99c2.5,2.37,4.79,4.92,6.8,7.66c9.42,12.81,14.27,29.86,13.62,46.98l7.08-1.56C1210.74,229.83,1205.41,212.26,1195.31,198.52z"/>
            <path d="M1144.9,170.3c-3.3-0.4-6.6-0.6-9.8-0.6c-22.1,0-42.6,9.7-56.4,26.7l-0.1-0.1c-11.1,15.9-17,33.2-16.8,49.9l5.2-0.1c1-9.3,3-17.9,6-25.8c11.1-29.7,39.7-47,71-43.1c14.2,1.8,27.2,7.5,37,16.1l8-2C1177.9,180.1,1162.3,172.5,1144.9,170.3z"/>
            <path d="M1079,243.1c0-31.6,25.7-57.2,57.2-57.2s57.2,25.7,57.2,57.2c0,4.8-0.6,9.4-1.7,13.8l8.8,0c2.6-19-2.1-38.8-12.6-53c-9.8-13.3-25.9-22.3-44.2-24.6c-30.4-3.9-58.1,12.9-68.9,41.8c-3.5,9.2-5.6,19.6-6.4,30.9c0,0.3,0,2.4-0.1,5.2l12.2,0C1079.6,252.6,1079,247.9,1079,243.1z"/>
          </g>

          {/* Tylny prawy nadkol */}
          <g 
            id="REAR_RIGHT_SIDE_WHEEL_ARCH"
            className={`cursor-pointer transition-colors ${
              isPartSelected('REAR_RIGHT_SIDE_WHEEL_ARCH') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('REAR_RIGHT_SIDE_WHEEL_ARCH')}
            onMouseEnter={() => handlePartHover('REAR_RIGHT_SIDE_WHEEL_ARCH')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-rear-right-wheel-arch"
          >
            <path d="M1193.5,841.9c0,31.6-25.7,57.2-57.2,57.2s-57.2-25.7-57.2-57.2c0-4.8,0.6-9.5,1.7-14l-12.2,0c0,2.8,0.1,4.9,0.1,5.2c0.8,11.2,2.9,21.6,6.4,30.9c10.8,28.8,38.5,45.6,68.9,41.8c18.3-2.3,34.5-11.3,44.2-24.6c10.5-14.3,15.2-34,12.6-53l-8.8,0C1192.9,832.5,1193.5,837.2,1193.5,841.9z"/>
            <path d="M1196.92,887.67c10.28-13.97,15.73-31.79,15.45-50.31l-2-0.44c0.37,18.26-4.96,35.83-15.06,49.57c-1.41,1.92-2.93,3.75-4.55,5.5l2.18,0.55C1194.33,890.98,1195.67,889.36,1196.92,887.67z"/>
            <path d="M1078.7,888.7L1078.7,888.7c13.8,16.9,34.4,26.6,56.5,26.6c3.2,0,6.6-0.2,9.8-0.6c17.3-2.2,33-9.7,44.2-21l-8-2c-9.8,8.6-22.8,14.3-37,16.1c-31.3,4-59.9-13.3-71-43c-2.9-7.9-4.9-16.5-6-25.8l-5.2-0.1C1061.7,855.4,1067.6,872.7,1078.7,888.7z"/>
          </g>

          {/* Przedni zderzak */}
          <g 
            id="FRONT_BUMPERS"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_BUMPERS') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_BUMPERS')}
            onMouseEnter={() => handlePartHover('FRONT_BUMPERS')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-bumpers"
          >
            <path d="M896.37,169.75c-14.26,0-30.34,0.08-46.7,0.29c-10.05,0.13-20.16,0.29-30.05,0.5c-41.61,0.89-81.13,2.32-113.88,4.31c-32.1,1.95-57.66,4.44-73.66,7.47c-15.53,2.94-22.18,6.39-22.18,6.39s-0.27-0.1-0.75-0.29c-1.16-0.46-3.32-1.33-6.1-2.46c-5.23-2.12-12.1-4.79-18.25-6.88c-13.37-4.54-24.83-7.04-24.83-7.04c-39.22-9.76-76.88-12.07-76.88-12.07c-74.77-4.62-134.02,15.62-134.02,15.62l49.06,18.43c0,0,55.84-14.62,114.57-11.54c0,0,33.01,1.85,64.91,10.15c0,0,10.15,2.31,21.53,6.31c6.15,2.16,13.01,4.92,18.25,7.12c2.78,1.17,4.94,2.08,6.1,2.58c0.48,0.21,0.75,0.33,0.75,0.33s6.65,3.85,22.18,7.23c16,3.47,41.56,6.23,73.66,8.54c32.75,2.36,72.27,4.09,113.88,5.35c9.89,0.3,19.99,0.55,30.05,0.75c16.36,0.32,32.44,0.54,46.7,0.67"/>
          </g>

          {/* Maska */}
          <g 
            id="FRONT_BONNET"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_BONNET') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_BONNET')}
            onMouseEnter={() => handlePartHover('FRONT_BONNET')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-bonnet"
          >
            <path d="M960,218.67c-15.58,0-48.58,0.58-48.58,0.58L834.59,221c0,0-32.54,1.17-32.54,23.33v467.33c0,22.17,32.54,23.33,32.54,23.33l76.83,1.75c0,0,33,0.58,48.58,0.58s48.58-0.58,48.58-0.58l76.83-1.75c0,0,32.54-1.17,32.54-23.33V244.33c0-22.17-32.54-23.33-32.54-23.33L959.42,219.25C959.42,219.25,975.58,218.67,960,218.67z"/>
          </g>

          {/* Tylny zderzak */}
          <g 
            id="REAR_BUMPERS"
            className={`cursor-pointer transition-colors ${
              isPartSelected('REAR_BUMPERS') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('REAR_BUMPERS')}
            onMouseEnter={() => handlePartHover('REAR_BUMPERS')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-rear-bumpers"
          >
            <path d="M1023.63,914.25c14.26,0,30.34-0.08,46.7-0.29c10.05-0.13,20.16-0.29,30.05-0.5c41.61-0.89,81.13-2.32,113.88-4.31c32.1-1.95,57.66-4.44,73.66-7.47c15.53-2.94,22.18-6.39,22.18-6.39s0.27,0.1,0.75,0.29c1.16,0.46,3.32,1.33,6.1,2.46c5.23,2.12,12.1,4.79,18.25,6.88c13.37,4.54,24.83,7.04,24.83,7.04c39.22,9.76,76.88,12.07,76.88,12.07c74.77,4.62,134.02-15.62,134.02-15.62l-49.06-18.43c0,0-55.84,14.62-114.57,11.54c0,0-33.01-1.85-64.91-10.15c0,0-10.15-2.31-21.53-6.31c-6.15-2.16-13.01-4.92-18.25-7.12c-2.78-1.17-4.94-2.08-6.1-2.58c-0.48-0.21-0.75-0.33-0.75-0.33s-6.65-3.85-22.18-7.23c-16-3.47-41.56-6.23-73.66-8.54c-32.75-2.36-72.27-4.09-113.88-5.35c-9.89-0.3-19.99-0.55-30.05-0.75c-16.36-0.32-32.44-0.54-46.7-0.67"/>
          </g>

          {/* Dach */}
          <g 
            id="ROOF"
            className={`cursor-pointer transition-colors ${
              isPartSelected('ROOF') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('ROOF')}
            onMouseEnter={() => handlePartHover('ROOF')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-roof"
          >
            <path d="M802.09,244.33v467.33c0,22.17,32.54,23.33,32.54,23.33h251.17c0,0,32.54-1.17,32.54-23.33V244.33c0-22.17-32.54-23.33-32.54-23.33H834.63C834.63,221,802.09,222.17,802.09,244.33z"/>
          </g>

          {/* Lewe drzwi kierowcy */}
          <g 
            id="LEFT_SIDE_DRIVER_DOOR"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_SIDE_DRIVER_DOOR') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('LEFT_SIDE_DRIVER_DOOR')}
            onMouseEnter={() => handlePartHover('LEFT_SIDE_DRIVER_DOOR')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-driver-door"
          >
            <path d="M735.56,384.58c0,4.83-3.92,8.75-8.75,8.75h-87.5c-4.83,0-8.75-3.92-8.75-8.75v-105c0-4.83,3.92-8.75,8.75-8.75h87.5c4.83,0,8.75,3.92,8.75,8.75V384.58z"/>
          </g>

          {/* Prawe drzwi kierowcy */}
          <g 
            id="RIGHT_SIDE_DRIVER_DOOR"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_SIDE_DRIVER_DOOR') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('RIGHT_SIDE_DRIVER_DOOR')}
            onMouseEnter={() => handlePartHover('RIGHT_SIDE_DRIVER_DOOR')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-driver-door"
          >
            <path d="M1184.44,699.42c0-4.83,3.92-8.75,8.75-8.75h87.5c4.83,0,8.75,3.92,8.75,8.75v105c0,4.83-3.92,8.75-8.75,8.75h-87.5c-4.83,0-8.75-3.92-8.75-8.75V699.42z"/>
          </g>

          {/* Lewy przedni reflektor */}
          <g 
            id="FRONT_LEFT_SIDE_HEADLAMP"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_LEFT_SIDE_HEADLAMP') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_LEFT_SIDE_HEADLAMP')}
            onMouseEnter={() => handlePartHover('FRONT_LEFT_SIDE_HEADLAMP')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-left-headlamp"
          >
            <path d="M653.77,167.42c-4.26,0-8.54,0.34-12.77,1.01c-19.67,3.12-38.25,13.95-50.47,29.42c-11.49,14.54-17.94,33.59-17.94,53.15c0,4.59,0.34,9.18,1.01,13.72c3.12,21.23,14.95,41.25,32.42,54.47c16.54,12.49,38.59,19.44,61.15,19.44c4.26,0,8.54-0.34,12.77-1.01c19.67-3.12,38.25-13.95,50.47-29.42c11.49-14.54,17.94-33.59,17.94-53.15c0-4.59-0.34-9.18-1.01-13.72c-3.12-21.23-14.95-41.25-32.42-54.47C697.36,174.37,675.33,167.42,653.77,167.42z"/>
          </g>

          {/* Prawy przedni reflektor */}
          <g 
            id="FRONT_RIGHT_SIDE_HEADLAMP"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_RIGHT_SIDE_HEADLAMP') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_RIGHT_SIDE_HEADLAMP')}
            onMouseEnter={() => handlePartHover('FRONT_RIGHT_SIDE_HEADLAMP')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-right-headlamp"
          >
            <path d="M1266.23,916.58c4.26,0,8.54-0.34,12.77-1.01c19.67-3.12,38.25-13.95,50.47-29.42c11.49-14.54,17.94-33.59,17.94-53.15c0-4.59-0.34-9.18-1.01-13.72c-3.12-21.23-14.95-41.25-32.42-54.47c-16.54-12.49-38.59-19.44-61.15-19.44c-4.26,0-8.54,0.34-12.77,1.01c-19.67,3.12-38.25,13.95-50.47,29.42c-11.49,14.54-17.94,33.59-17.94,53.15c0,4.59,0.34,9.18,1.01,13.72c3.12,21.23,14.95,41.25,32.42,54.47C1222.64,909.63,1244.67,916.58,1266.23,916.58z"/>
          </g>

          {/* Przednia szyba */}
          <g 
            id="FRONT_WINDSCREEN"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_WINDSCREEN') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_WINDSCREEN')}
            onMouseEnter={() => handlePartHover('FRONT_WINDSCREEN')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-front-windscreen"
          >
            <path d="M802.09,244.33c0-22.17,32.54-23.33,32.54-23.33h251.17c0,0,32.54,1.17,32.54,23.33v58.33H802.09V244.33z"/>
          </g>

          {/* Tylna szyba */}
          <g 
            id="FRONT_REAR_WINDOW"
            className={`cursor-pointer transition-colors ${
              isPartSelected('FRONT_REAR_WINDOW') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('FRONT_REAR_WINDOW')}
            onMouseEnter={() => handlePartHover('FRONT_REAR_WINDOW')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-rear-window"
          >
            <path d="M1118.33,653.33c0,22.17-32.54,23.33-32.54,23.33H834.63c0,0-32.54-1.17-32.54-23.33v-58.33h316.24V653.33z"/>
          </g>

          {/* Lewe lusterko */}
          <g 
            id="LEFT_SIDE_WING_MIRROR"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_SIDE_WING_MIRROR') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('LEFT_SIDE_WING_MIRROR')}
            onMouseEnter={() => handlePartHover('LEFT_SIDE_WING_MIRROR')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-wing-mirror"
          >
            <circle cx="735" cy="320" r="15"/>
          </g>

          {/* Prawe lusterko */}
          <g 
            id="RIGHT_SIDE_WING_MIRROR"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_SIDE_WING_MIRROR') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('RIGHT_SIDE_WING_MIRROR')}
            onMouseEnter={() => handlePartHover('RIGHT_SIDE_WING_MIRROR')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-wing-mirror"
          >
            <circle cx="1185" cy="764" r="15"/>
          </g>

          {/* Lewe koło przednie */}
          <g 
            id="LEFT_SIDE_FRONT_WHEEL"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_SIDE_FRONT_WHEEL') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('LEFT_SIDE_FRONT_WHEEL')}
            onMouseEnter={() => handlePartHover('LEFT_SIDE_FRONT_WHEEL')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-front-wheel"
          >
            <circle cx="652.76" cy="243.07" r="57.25" className="stroke-2 stroke-black"/>
          </g>

          {/* Prawe koło przednie */}
          <g 
            id="RIGHT_SIDE_FRONT_WHEEL"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_SIDE_FRONT_WHEEL') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('RIGHT_SIDE_FRONT_WHEEL')}
            onMouseEnter={() => handlePartHover('RIGHT_SIDE_FRONT_WHEEL')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-front-wheel"
          >
            <circle cx="652.76" cy="841.94" r="57.25" className="stroke-2 stroke-black"/>
          </g>

          {/* Lewe koło tylne */}
          <g 
            id="LEFT_SIDE_REAR_WHEEL"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_SIDE_REAR_WHEEL') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('LEFT_SIDE_REAR_WHEEL')}
            onMouseEnter={() => handlePartHover('LEFT_SIDE_REAR_WHEEL')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-rear-wheel"
          >
            <circle cx="1136.2" cy="243.1" r="57.2" className="stroke-2 stroke-black"/>
          </g>

          {/* Prawe koło tylne */}
          <g 
            id="RIGHT_SIDE_REAR_WHEEL"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_SIDE_REAR_WHEEL') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('RIGHT_SIDE_REAR_WHEEL')}
            onMouseEnter={() => handlePartHover('RIGHT_SIDE_REAR_WHEEL')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-rear-wheel"
          >
            <circle cx="1136.2" cy="841.9" r="57.2" className="stroke-2 stroke-black"/>
          </g>

          {/* Lewy błotnik */}
          <g 
            id="LEFT_SIDE_FENDER"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_SIDE_FENDER') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('LEFT_SIDE_FENDER')}
            onMouseEnter={() => handlePartHover('LEFT_SIDE_FENDER')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-fender"
          >
            <path d="M735.56,279.58v105c0,4.83-3.92,8.75-8.75,8.75h-87.5c-4.83,0-8.75-3.92-8.75-8.75v-105c0-4.83,3.92-8.75,8.75-8.75h87.5C731.64,270.83,735.56,274.75,735.56,279.58z"/>
          </g>

          {/* Prawy błotnik */}
          <g 
            id="RIGHT_SIDE_FENDER"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_SIDE_FENDER') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
            }`}
            onClick={() => handlePartClick('RIGHT_SIDE_FENDER')}
            onMouseEnter={() => handlePartHover('RIGHT_SIDE_FENDER')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-fender"
          >
            <path d="M1184.44,804.42v-105c0-4.83,3.92-8.75,8.75-8.75h87.5c4.83,0,8.75,3.92,8.75,8.75v105c0,4.83-3.92,8.75-8.75,8.75h-87.5C1188.36,813.17,1184.44,809.25,1184.44,804.42z"/>
          </g>

          {/* Lewe tylne światło */}
          <g 
            id="LEFT_OUTER_TAIL_LIGHT"
            className={`cursor-pointer transition-colors ${
              isPartSelected('LEFT_OUTER_TAIL_LIGHT') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
            }`}
            onClick={() => handlePartClick('LEFT_OUTER_TAIL_LIGHT')}
            onMouseEnter={() => handlePartHover('LEFT_OUTER_TAIL_LIGHT')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-left-tail-light"
          >
            <path className="fill-red-500" d="M1458.5,384.58c0,4.83-3.92,8.75-8.75,8.75h-35c-4.83,0-8.75-3.92-8.75-8.75v-35c0-4.83,3.92-8.75,8.75-8.75h35c4.83,0,8.75,3.92,8.75,8.75V384.58z"/>
          </g>

          {/* Prawe tylne światło */}
          <g 
            id="RIGHT_OUTER_TAIL_LIGHT"
            className={`cursor-pointer transition-colors ${
              isPartSelected('RIGHT_OUTER_TAIL_LIGHT') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
            }`}
            onClick={() => handlePartClick('RIGHT_OUTER_TAIL_LIGHT')}
            onMouseEnter={() => handlePartHover('RIGHT_OUTER_TAIL_LIGHT')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-right-tail-light"
          >
            <path className="fill-red-500" d="M461.5,699.42c0-4.83,3.92-8.75,8.75-8.75h35c4.83,0,8.75,3.92,8.75,8.75v35c0,4.83-3.92,8.75-8.75,8.75h-35c-4.83,0-8.75-3.92-8.75-8.75V699.42z"/>
          </g>
        </svg>
      </div>

      {selectedParts.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Wybrano {selectedParts.length} {selectedParts.length === 1 ? 'część' : selectedParts.length < 5 ? 'części' : 'części'}
          </p>
        </div>
      )}
    </div>
  );
}

export default InteractiveCarDiagram;