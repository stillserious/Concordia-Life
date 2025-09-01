import { useState } from "react";

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'hood': 'Pokrywa przednia (maska)',
  'front-bumper': 'Zderzak przedni', 
  'front-door-left': 'Drzwi przednie lewe',
  'front-door-right': 'Drzwi przednie prawe',
  'rear-door-left': 'Drzwi tylne lewe',
  'rear-door-right': 'Drzwi tylne prawe',
  'roof': 'Dach',
  'rear-bumper': 'Zderzak tylny',
  'trunk': 'Pokrywa bagażnika',
  'windshield': 'Szyba przednia',
  'rear-window': 'Szyba tylna',
  'body': 'Nadwozie'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface VanillaThreeCarProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function VanillaThreeCar({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: VanillaThreeCarProps) {
  const [currentView, setCurrentView] = useState<'side' | 'top'>('side');

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  const getPartColor = (partName: CarPartName) => {
    return selectedParts.has(partName) ? '#ff6b6b' : '#ffffff';
  };

  const getPartStroke = (partName: CarPartName) => {
    return selectedParts.has(partName) ? '#cc0000' : '#2c3e50';
  };

  if (currentView === 'side') {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
          <div className="relative">
            {/* Profesjonalny SVG Toyota Prius z Vecteezy */}
            <svg width="100%" height="400" viewBox="0 0 1400 980" className="w-full h-auto">
              <g>
                {/* Koła i elementy podłogo */}
                <g>
                  <g>
                    <g>
                      <path fillRule="evenodd" clipRule="evenodd" fill="#4D4D4D" d="M588.32,518.225c-5.085,8.48-10.17,16.965-15.305,25.414 l-0.178,0.293l-10.946-0.606l-13.239-14.985l0.849-0.259c12.624-3.912,25.313-7.751,38.199-10.711l1.313-0.302L588.32,518.225z M845.983,597.019c12.331,12.335,12.331,32.326,0,44.661c-12.334,12.33-32.326,12.33-44.66,0c-12.331-12.335-12.331-32.326,0-44.661C813.657,584.689,833.649,584.689,845.983,597.019z M575.714,597.019c12.33,12.335,12.33,32.326,0,44.661c-12.333,12.33-32.326,12.33-44.659,0c-12.332-12.335-12.332-32.326,0-44.661C543.388,584.689,563.381,584.689,575.714,597.019z"/>
                    </g>
                  </g>
                </g>
                
                {/* Główne nadwozie samochodu */}
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" fill="#1A1A1A" d="M299.655,378.728c172.028,6.204,172.028,6.204,172.028,6.204s25.053-51.776,7.874-82.795c-17.177-31.016-51.06-44.377-87.325-43.423c-36.267,0.952-56.307-4.771-81.6,18.132c-25.291,22.906-26.245,37.222-26.245,41.04C284.386,321.703,299.655,378.728,299.655,378.728z"/>
                  <path fillRule="evenodd" clipRule="evenodd" fill="#1A1A1A" d="M942.432,384.215c177.99-12.885,181.331-14.316,181.331-14.316s0.956-18.61,1.433-26.245c0.477-7.634,6.682-81.601-88.281-87.804C941.955,249.646,903.304,349.38,942.432,384.215z"/>
                  
                  <g>
                    <path fillRule="evenodd" clipRule="evenodd" fill="#CCCCCC" d="M477.229,385.186c459.055,0,459.055,0,459.055,0l5.973-0.417c-3.841-9.896-5.957-20.654-5.957-31.909c0-48.684,39.47-88.151,88.151-88.151c48.687,0,88.151,39.468,88.151,88.151c0,7.022-0.826,13.851-2.377,20.397h62.269l17.415-17.417l37.074-9.935v-62.838l-26.336-16.226l-6.201-46.287l-9.545-58.217l21.951-15.27h-47.721c0,0-159.379-71.58-310.173-79.213C698.166,60.22,646.63,86.465,589.845,102.69c-56.785,16.223-177.993,78.735-177.993,78.735h-42.948c0,0-85.893,10.021-135.521,34.835c-49.628,24.814-48.674,54.398-48.674,54.398l-1.432,14.795l-10.258,10.258v31.732l15.322,8.848v19.786l-12.938,4.055v10.021l37.697,8.828h88.281l1.343,0.047c-2.567-8.269-3.951-17.058-3.951-26.17c0-48.684,39.467-88.151,88.153-88.151c48.684,0,88.149,39.468,88.149,88.151c0,11.304-2.128,22.106-6.006,32.039L477.229,385.186z"/>
                  </g>
                  
                  {/* Gradienty dla nadwozia */}
                  <defs>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="626.8398" y1="395.8965" x2="626.8409" y2="290.9252">
                      <stop offset="0" stopColor="#B3B3B3"/>
                      <stop offset="1" stopColor="#FFFFFF"/>
                    </linearGradient>
                    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="864.1494" y1="396.0278" x2="833.5083" y2="265.2922">
                      <stop offset="0" stopColor="#B3B3B3"/>
                      <stop offset="1" stopColor="#FFFFFF"/>
                    </linearGradient>
                  </defs>
                  
                  <path fillRule="evenodd" clipRule="evenodd" fill="url(#SVGID_1_)" d="M751.525,338.115l-256.067,17.133c4.13,9.096,12.943,8.396,12.943,8.396h249.821c-0.154-0.407-0.659-1.765-0.862-2.527c-0.737-2.785-2.522-10.081-4.83-23.22L751.525,338.115z"/>
                  <path fillRule="evenodd" clipRule="evenodd" fill="url(#SVGID_2_)" d="M752.53,337.897c2.308,13.139,4.093,20.435,4.83,23.22c0.203,0.763,0.708,2.12,0.862,2.527h128.113c33.402,0,29.586-18.134,39.127-41.992c2.572-6.43,7.809-14.901,14.234-24.224L752.53,337.897z"/>
                </g>
              </g>
            </svg>
            
            {/* Interaktywne obszary na nadwoziu */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Maska - przednia część */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '10%',
                  top: '25%',
                  width: '25%',
                  height: '35%',
                  backgroundColor: selectedParts.has('hood') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('hood') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
              />
              
              {/* Przedni zderzak */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '2%',
                  top: '40%',
                  width: '12%',
                  height: '20%',
                  backgroundColor: selectedParts.has('front-bumper') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('front-bumper') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('front-bumper')}
                data-testid="car-part-front-bumper"
              />
              
              {/* Nadwozie główne */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '35%',
                  top: '15%',
                  width: '40%',
                  height: '50%',
                  backgroundColor: selectedParts.has('body') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('body') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('body')}
                data-testid="car-part-body"
              />
              
              {/* Dach */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '37%',
                  top: '12%',
                  width: '36%',
                  height: '25%',
                  backgroundColor: selectedParts.has('roof') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('roof') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof"
              />
              
              {/* Bagażnik */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '75%',
                  top: '25%',
                  width: '20%',
                  height: '35%',
                  backgroundColor: selectedParts.has('trunk') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('trunk') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
              />
              
              {/* Tylny zderzak */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '92%',
                  top: '40%',
                  width: '8%',
                  height: '20%',
                  backgroundColor: selectedParts.has('rear-bumper') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('rear-bumper') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('rear-bumper')}
                data-testid="car-part-rear-bumper"
              />
            </div>
            
            {/* Przycisk zmiany widoku */}
            <button
              onClick={() => setCurrentView('top')}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
              data-testid="button-change-view"
            >
              ZMIEŃ WIDOK
            </button>
          </div>
        </div>

        {/* Lista zaznaczonych części */}
        {selectedParts.size > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Uszkodzone części ({selectedParts.size}):
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedParts).map(partName => (
                <span 
                  key={partName}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {CAR_PARTS[partName]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Widok z góry - prosty schemat
  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
        <div className="relative">
          <svg width="100%" height="500" viewBox="0 0 400 600" className="w-full h-auto">
            {/* Cień */}
            <ellipse cx="200" cy="300" rx="80" ry="220" fill="#ddd" opacity="0.3"/>
            
            {/* Główne nadwozie z góry */}
            <rect 
              x="140" y="100" width="120" height="400" rx="25"
              fill={getPartColor('body')}
              stroke={getPartStroke('body')}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('body')}
              data-testid="car-part-body-top"
            />
            
            {/* Maska */}
            <rect 
              x="150" y="60" width="100" height="60" rx="20"
              fill={getPartColor('hood')}
              stroke={getPartStroke('hood')}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('hood')}
              data-testid="car-part-hood-top"
            />
            
            {/* Bagażnik */}
            <rect 
              x="150" y="480" width="100" height="60" rx="20"
              fill={getPartColor('trunk')}
              stroke={getPartStroke('trunk')}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('trunk')}
              data-testid="car-part-trunk-top"
            />
            
            {/* Dach */}
            <rect 
              x="160" y="200" width="80" height="200" rx="8"
              fill={getPartColor('roof')}
              stroke={getPartStroke('roof')}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('roof')}
              data-testid="car-part-roof-top"
            />
            
            {/* Szyby */}
            <rect 
              x="170" y="140" width="60" height="50" rx="8"
              fill={getPartColor('windshield')}
              stroke={getPartStroke('windshield')}
              strokeWidth="1.5"
              fillOpacity="0.1"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('windshield')}
              data-testid="car-part-windshield-top"
            />
            
            <rect 
              x="170" y="410" width="60" height="50" rx="8"
              fill={getPartColor('rear-window')}
              stroke={getPartStroke('rear-window')}
              strokeWidth="1.5"
              fillOpacity="0.1"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePartClick('rear-window')}
              data-testid="car-part-rear-window-top"
            />
            
            {/* Koła */}
            <circle cx="140" cy="130" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
            <circle cx="260" cy="130" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
            <circle cx="140" cy="470" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
            <circle cx="260" cy="470" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
          </svg>
          
          {/* Przycisk powrotu do widoku z boku */}
          <button
            onClick={() => setCurrentView('side')}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            data-testid="button-change-view-back"
          >
            WIDOK Z BOKU
          </button>
        </div>
      </div>

      {/* Lista zaznaczonych części */}
      {selectedParts.size > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            Uszkodzone części ({selectedParts.size}):
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedParts).map(partName => (
              <span 
                key={partName}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {CAR_PARTS[partName]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { CAR_PARTS };
export type { CarPartName };