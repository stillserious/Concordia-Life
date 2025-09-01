import { useState } from "react";

interface InteractiveCarDiagramProps {
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

// Mapowanie nazw części z angielskiego na polski
const carPartsTranslations: Record<string, string> = {
  'FRONT_LEFT_SIDE_WHEEL_ARCH': 'Lewy przedni łuk koła',
  'FRONT_RIGHT_SIDE_WHEEL_ARCH': 'Prawy przedni łuk koła',
  'REAR_LEFT_SIDE_WHEEL_ARCH': 'Lewy tylny łuk koła',
  'REAR_RIGHT_SIDE_WHEEL_ARCH': 'Prawy tylny łuk koła',
  'LEFT_SIDE_REAR_MARKERS': 'Lewe tylne światła',
  'RIGHT_SIDE_REAR_MARKERS': 'Prawe tylne światła',
  'EXHAUST_TIPS': 'Końcówki wydechu',
  'FRONT_LEFT_WHEEL': 'Lewe przednie koło',
  'FRONT_RIGHT_WHEEL': 'Prawe przednie koło',
  'REAR_LEFT_WHEEL': 'Lewe tylne koło',
  'REAR_RIGHT_WHEEL': 'Prawe tylne koło',
  'FRONT_BUMPER': 'Przedni zderzak',
  'REAR_BUMPER': 'Tylny zderzak',
  'FRONT_LEFT_DOOR': 'Lewe przednie drzwi',
  'FRONT_RIGHT_DOOR': 'Prawe przednie drzwi',
  'REAR_LEFT_DOOR': 'Lewe tylne drzwi',
  'REAR_RIGHT_DOOR': 'Prawe tylne drzwi',
  'HOOD': 'Maska',
  'TRUNK': 'Bagażnik',
  'ROOF': 'Dach',
  'WINDSHIELD': 'Przednia szyba',
  'REAR_WINDSHIELD': 'Tylna szyba',
  'LEFT_HEADLIGHT': 'Lewy reflektor',
  'RIGHT_HEADLIGHT': 'Prawy reflektor',
  'LEFT_SIDE_PANEL': 'Lewy panel boczny',
  'RIGHT_SIDE_PANEL': 'Prawy panel boczny'
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

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {hoveredPart && (
          <div 
            className="absolute z-50 bg-black text-white px-3 py-2 rounded text-sm pointer-events-none whitespace-nowrap"
            style={{ 
              left: '50%', 
              top: '20px',
              transform: 'translateX(-50%)'
            }}
          >
            {getPartName(hoveredPart)}
          </div>
        )}

        <div className="diagram-box w-full max-w-4xl mx-auto">
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
            <style jsx>{`
              .st0 { fill: #FFFFFF; stroke: #000000; stroke-width: 2; }
              .st1 { stroke: #000000; stroke-width: 3; stroke-miterlimit: 10; }
              .st2 { fill: #221F1F; }
              .st3 { fill: #231F20; }
              .st4 { fill: none; stroke: #231F20; stroke-width: 2; stroke-miterlimit: 10; }
              .st5 { fill: none; }
              .st6 { fill: #FFFFFF; stroke: #000000; stroke-miterlimit: 10; opacity: 0; }
              
              /* Hover efekty */
              .car-part:hover .st0 { fill: #60A5FA; }
              .car-part:hover .st2 { fill: #60A5FA; }
              .car-part:hover .stts { fill: #60A5FA; }
              
              /* Zaznaczone części */
              .car-part-selected .st0 { fill: #3B82F6; }
              .car-part-selected .st2 { fill: #3B82F6; }
              .car-part-selected .stts { fill: #3B82F6; }
              
              .car-part { cursor: pointer; }
            `}</style>

            {/* FRONT LEFT SIDE WHEEL ARCH */}
            <g 
              className={`car-part ${isPartSelected('FRONT_LEFT_SIDE_WHEEL_ARCH') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('FRONT_LEFT_SIDE_WHEEL_ARCH')}
              onMouseEnter={() => handlePartHover('FRONT_LEFT_SIDE_WHEEL_ARCH')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-front-left-wheel-arch"
            >
              <path className="st0" d="M727.95,241.74c-0.71-4.37-1.66-8.68-2.84-12.8c-5.23-18.36-14.76-33.4-27.56-43.47
                c-11.96-9.41-28.16-14.81-44.43-14.81c-3.36,0-6.74,0.23-10.03,0.68c-17.58,2.41-34.05,10.92-44.06,22.75
                c-4.18,4.94-7.77,10.78-10.66,17.36c-3.45,7.84-5.74,16.3-6.81,25.14c-0.88,7.29-0.45,14.95-0.04,22.36
                c0.13,2.24,0.25,4.55,0.34,6.81l6.85,0.76c-0.18-4.73-0.81-22.04-0.6-24.91c1.17-16.49,7.1-32.16,16.26-42.99
                c8.79-10.39,23.99-18.18,39.67-20.33c17.61-2.42,36,2.33,49.17,12.69c14.71,11.57,21.8,28.08,25.16,39.89
                c1.1,3.87,2,7.91,2.66,12.01c0.56,3.48,0.98,7.09,1.26,10.74l7.01-0.15C729.02,249.48,728.57,245.55,727.95,241.74z" />
              <path className="st0" d="M595.51,243.07c0-31.57,25.68-57.25,57.25-57.25s57.25,25.68,57.25,57.25c0,5.05-0.66,9.95-1.90,14.62
                l12.44-0.02c-0.05-0.93-0.09-1.87-0.15-2.78c-0.27-3.98-0.72-7.91-1.33-11.7c-0.65-4.02-1.53-7.99-2.61-11.78
                c-3.28-11.52-10.19-27.62-24.47-38.86c-12.76-10.04-30.58-14.63-47.67-12.29c-15.21,2.09-29.93,9.62-38.41,19.64
                c-8.89,10.51-14.65,25.76-15.8,41.84c-0.13,1.77,0.09,9.56,0.31,16.14l7.03-0.01C596.19,253.14,595.51,248.18,595.51,243.07z" />
            </g>

            {/* FRONT RIGHT SIDE WHEEL ARCH */}
            <g 
              className={`car-part ${isPartSelected('FRONT_RIGHT_SIDE_WHEEL_ARCH') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
              onMouseEnter={() => handlePartHover('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-front-right-wheel-arch"
            >
              <path className="st0" d="M710.01,841.94c0,31.57-25.68,57.25-57.25,57.25s-57.25-25.68-57.25-57.25c0-5.12,0.68-10.07,1.95-14.8
                l-7.03-0.01c-0.22,6.58-0.43,14.37-0.31,16.14c1.14,16.08,6.9,31.33,15.8,41.84c8.48,10.03,23.2,17.55,38.41,19.64
                c17.09,2.35,34.91-2.25,47.67-12.29c14.28-11.24,21.19-27.34,24.47-38.86c1.08-3.79,1.96-7.76,2.61-11.78
                c0.61-3.79,1.06-7.72,1.33-11.70c0.06-0.91,0.11-1.85,0.15-2.78l-12.44-0.02C709.35,831.99,710.01,836.89,710.01,841.94z" />
              <path className="st0" d="M581.57,848.42c1.07,8.84,3.36,17.3,6.81,25.14c2.89,6.57,6.48,12.41,10.66,17.36
                c10.01,11.83,26.48,20.33,44.06,22.75c3.29,0.45,6.67,0.68,10.03,0.68c16.27,0,32.46-5.4,44.43-14.81
                c12.8-10.07,22.33-25.11,27.56-43.47c1.17-4.12,2.13-8.43,2.84-12.8c0.62-3.81,1.07-7.75,1.36-11.71l-7.01-0.15
                c-0.28,3.65-0.7,7.26-1.26,10.74c-0.66,4.1-1.56,8.14-2.66,12.01c-3.36,11.81-10.45,28.31-25.16,39.89
                c-13.18,10.37-31.56,15.11-49.17,12.69c-15.68-2.15-30.88-9.94-39.67-20.33c-9.16-10.83-15.09-26.5-16.26-42.99
                c-0.2-2.88,0.43-20.19,0.6-24.91l-6.85,0.76c-0.09,2.26-0.22,4.57-0.34,6.81C581.12,833.47,580.69,841.13,581.57,848.42z" />
            </g>

            {/* REAR LEFT SIDE WHEEL ARCH */}
            <g 
              className={`car-part ${isPartSelected('REAR_LEFT_SIDE_WHEEL_ARCH') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('REAR_LEFT_SIDE_WHEEL_ARCH')}
              onMouseEnter={() => handlePartHover('REAR_LEFT_SIDE_WHEEL_ARCH')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-rear-left-wheel-arch"
            >
              <path className="st0" d="M1195.31,198.52c-1.41-1.92-2.93-3.75-4.55-5.5l-7.89,1.99c2.5,2.37,4.79,4.92,6.8,7.66
                c9.42,12.81,14.27,29.86,13.62,46.98l7.08-1.56C1210.74,229.83,1205.41,212.26,1195.31,198.52z" />
              <path className="st0" d="M1144.9,170.3c-3.3-0.4-6.6-0.6-9.8-0.6c-22.1,0-42.6,9.7-56.4,26.7l-0.1-0.1c-11.1,15.9-17,33.2-16.8,49.9
                l5.2-0.1c1-9.3,3-17.9,6-25.8c11.1-29.7,39.7-47,71-43.1c14.2,1.8,27.2,7.5,37,16.1l8-2C1177.9,180.1,1162.3,172.5,1144.9,170.3z"/>
              <path className="st0" d="M1079,243.1c0-31.6,25.7-57.2,57.2-57.2s57.2,25.7,57.2,57.2c0,4.8-0.6,9.4-1.7,13.8l8.8,0
                c2.6-19-2.1-38.8-12.6-53c-9.8-13.3-25.9-22.3-44.2-24.6c-30.4-3.9-58.1,12.9-68.9,41.8c-3.5,9.2-5.6,19.6-6.4,30.9
                c0,0.3,0,2.4-0.1,5.2l12.2,0C1079.6,252.6,1079,247.9,1079,243.1z"/>
            </g>

            {/* REAR RIGHT SIDE WHEEL ARCH */}
            <g 
              className={`car-part ${isPartSelected('REAR_RIGHT_SIDE_WHEEL_ARCH') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('REAR_RIGHT_SIDE_WHEEL_ARCH')}
              onMouseEnter={() => handlePartHover('REAR_RIGHT_SIDE_WHEEL_ARCH')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-rear-right-wheel-arch"
            >
              <path className="st0" d="M1193.5,841.9c0,31.6-25.7,57.2-57.2,57.2s-57.2-25.7-57.2-57.2c0-4.8,0.6-9.5,1.7-14l-12.2,0
                c0,2.8,0.1,4.9,0.1,5.2c0.8,11.2,2.9,21.6,6.4,30.9c10.8,28.8,38.5,45.6,68.9,41.8c18.3-2.3,34.5-11.3,44.2-24.6
                c10.5-14.3,15.2-34,12.6-53l-8.8,0C1192.9,832.5,1193.5,837.2,1193.5,841.9z"/>
              <path className="st0" d="M1196.92,887.67c10.28-13.97,15.73-31.79,15.45-50.31l-2-0.44c0.37,18.26-4.96,35.83-15.06,49.57
                c-1.41,1.92-2.93,3.75-4.55,5.5l2.18,0.55C1194.33,890.98,1195.67,889.36,1196.92,887.67z" />
            </g>

            {/* LEFT SIDE REAR MARKERS (tylne światła) */}
            <g 
              className={`car-part ${isPartSelected('LEFT_SIDE_REAR_MARKERS') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('LEFT_SIDE_REAR_MARKERS')}
              onMouseEnter={() => handlePartHover('LEFT_SIDE_REAR_MARKERS')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-left-rear-lights"
            >
              <path className="st2 stts" d="M1631.36,352.14c-1.87,0-3.39,1.52-3.39,3.39V404c0,1.73,0.57,3.45,1.61,4.83l5.16,6.89v-60.19
                C1634.75,353.66,1633.23,352.14,1631.36,352.14z" />
            </g>

            {/* RIGHT SIDE REAR MARKERS (tylne światła) */}
            <g 
              className={`car-part ${isPartSelected('RIGHT_SIDE_REAR_MARKERS') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('RIGHT_SIDE_REAR_MARKERS')}
              onMouseEnter={() => handlePartHover('RIGHT_SIDE_REAR_MARKERS')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-right-rear-lights"
            >
              <path className="st2 stts" d="M1627.97,676.21v48.48c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39V664.5l-5.16,6.89
                C1628.55,672.76,1627.97,674.48,1627.97,676.21z" />
            </g>

            {/* GŁÓWNA CZĘŚĆ POJAZDU - karoseria */}
            <g 
              className={`car-part ${isPartSelected('MAIN_BODY') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('MAIN_BODY')}
              onMouseEnter={() => handlePartHover('MAIN_BODY')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-main-body"
            >
              {/* Kontury głównej części samochodu */}
              <path className="st0" d="M300,300 L300,150 C300,120 320,100 350,100 L1400,100 C1430,100 1450,120 1450,150 L1450,300 
                L1450,750 L1450,900 C1450,930 1430,950 1400,950 L350,950 C320,950 300,930 300,900 L300,750 Z" />
              
              {/* Linia dachu */}
              <path className="st0" d="M350,100 L400,80 L1300,80 L1400,100" />
              
              {/* Przednia i tylna część */}
              <path className="st0" d="M300,200 C280,200 260,220 260,250 L260,800 C260,830 280,850 300,870" />
              <path className="st0" d="M1450,200 C1470,200 1490,220 1490,250 L1490,800 C1490,830 1470,850 1450,870" />
            </g>

            {/* Dodatkowe elementy - reflektory, zderzaki itp. */}
            <g 
              className={`car-part ${isPartSelected('FRONT_LIGHTS') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('FRONT_LIGHTS')}
              onMouseEnter={() => handlePartHover('FRONT_LIGHTS')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-front-lights"
            >
              <ellipse className="st0" cx="320" cy="250" rx="20" ry="35" />
              <ellipse className="st0" cx="320" cy="820" rx="20" ry="35" />
            </g>

            <g 
              className={`car-part ${isPartSelected('REAR_LIGHTS') ? 'car-part-selected' : ''}`}
              onClick={() => handlePartClick('REAR_LIGHTS')}
              onMouseEnter={() => handlePartHover('REAR_LIGHTS')}
              onMouseLeave={() => handlePartHover(null)}
              data-testid="car-part-rear-lights"
            >
              <rect className="st2" x="1460" y="230" width="15" height="40" />
              <rect className="st2" x="1460" y="800" width="15" height="40" />
            </g>

          </svg>
        </div>
      </div>

      {/* Lista wybranych części */}
      {selectedParts.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Wybrane uszkodzenia:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedParts.map((partId) => (
              <span
                key={partId}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                data-testid={`selected-part-${partId}`}
              >
                {getPartName(partId)}
                <button
                  onClick={() => onPartToggle(partId)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  data-testid={`remove-part-${partId}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveCarDiagram;