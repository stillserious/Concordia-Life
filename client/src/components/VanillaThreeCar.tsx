import { useState } from "react";

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'body': 'Nadwozie',
  'hood': 'Maska',
  'trunk': 'Bagażnik',
  'left-door': 'Drzwi lewe',
  'right-door': 'Drzwi prawe',
  'front-wheel': 'Koło przednie',
  'rear-wheel': 'Koło tylne',
  'roof': 'Dach',
  'windshield': 'Szyba przednia',
  'rear-window': 'Szyba tylna'
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
  const [selectedInfo, setSelectedInfo] = useState<string>('Kliknij część samochodu aby oznaczyć uszkodzenie');

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
    setSelectedInfo(`Wybrano: ${CAR_PARTS[partName]}`);
  };

  return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Interaktywny diagram samochodu</h3>
          
          <style>
            {`
              .car-part { 
                cursor: pointer; 
                transition: fill 0.2s; 
              }
              .car-part:hover { 
                fill: #ffd966 !important; 
              }
              .car-part.highlight { 
                fill: #dc2626 !important; 
              }
            `}
          </style>
          
          <svg viewBox="0 0 600 250" className="w-full h-auto">
            {/* Nadwozie */}
            <rect 
              x="100" y="100" width="400" height="80" rx="30" 
              fill={selectedParts.has('body') ? '#dc2626' : '#4f8ec9'} 
              className={`car-part ${selectedParts.has('body') ? 'highlight' : ''}`} 
              id="body"
              onClick={() => handlePartClick('body')}
              data-testid="car-part-body"
            />
            
            {/* Maska */}
            <rect 
              x="80" y="120" width="60" height="60" rx="15" 
              fill={selectedParts.has('hood') ? '#dc2626' : '#3e6c95'} 
              className={`car-part ${selectedParts.has('hood') ? 'highlight' : ''}`} 
              id="hood"
              onClick={() => handlePartClick('hood')}
              data-testid="car-part-hood"
            />
            
            {/* Bagażnik */}
            <rect 
              x="460" y="120" width="60" height="60" rx="15" 
              fill={selectedParts.has('trunk') ? '#dc2626' : '#3e6c95'} 
              className={`car-part ${selectedParts.has('trunk') ? 'highlight' : ''}`} 
              id="trunk"
              onClick={() => handlePartClick('trunk')}
              data-testid="car-part-trunk"
            />
            
            {/* Drzwi lewe */}
            <rect 
              x="170" y="120" width="90" height="60" rx="12" 
              fill={selectedParts.has('left-door') ? '#dc2626' : '#7ab8f0'} 
              className={`car-part ${selectedParts.has('left-door') ? 'highlight' : ''}`} 
              id="left-door"
              onClick={() => handlePartClick('left-door')}
              data-testid="car-part-left-door"
            />
            
            {/* Drzwi prawe */}
            <rect 
              x="340" y="120" width="90" height="60" rx="12" 
              fill={selectedParts.has('right-door') ? '#dc2626' : '#7ab8f0'} 
              className={`car-part ${selectedParts.has('right-door') ? 'highlight' : ''}`} 
              id="right-door"
              onClick={() => handlePartClick('right-door')}
              data-testid="car-part-right-door"
            />
            
            {/* Koło przednie */}
            <circle 
              cx="140" cy="200" r="34" 
              fill={selectedParts.has('front-wheel') ? '#dc2626' : '#333'} 
              className={`car-part ${selectedParts.has('front-wheel') ? 'highlight' : ''}`} 
              id="front-wheel"
              onClick={() => handlePartClick('front-wheel')}
              data-testid="car-part-front-wheel"
            />
            <circle cx="140" cy="200" r="17" fill="#bbb" />
            
            {/* Koło tylne */}
            <circle 
              cx="460" cy="200" r="34" 
              fill={selectedParts.has('rear-wheel') ? '#dc2626' : '#333'} 
              className={`car-part ${selectedParts.has('rear-wheel') ? 'highlight' : ''}`} 
              id="rear-wheel"
              onClick={() => handlePartClick('rear-wheel')}
              data-testid="car-part-rear-wheel"
            />
            <circle cx="460" cy="200" r="17" fill="#bbb" />
            
            {/* Dach */}
            <rect 
              x="210" y="60" width="180" height="55" rx="20" 
              fill={selectedParts.has('roof') ? '#dc2626' : '#a5c7e7'} 
              className={`car-part ${selectedParts.has('roof') ? 'highlight' : ''}`} 
              id="roof"
              onClick={() => handlePartClick('roof')}
              data-testid="car-part-roof"
            />
            
            {/* Szyba przednia */}
            <rect 
              x="180" y="80" width="70" height="35" rx="10" 
              fill={selectedParts.has('windshield') ? '#dc2626' : '#e3f2fd'} 
              className={`car-part ${selectedParts.has('windshield') ? 'highlight' : ''}`} 
              id="windshield"
              onClick={() => handlePartClick('windshield')}
              data-testid="car-part-windshield"
            />
            
            {/* Szyba tylna */}
            <rect 
              x="350" y="80" width="70" height="35" rx="10" 
              fill={selectedParts.has('rear-window') ? '#dc2626' : '#e3f2fd'} 
              className={`car-part ${selectedParts.has('rear-window') ? 'highlight' : ''}`} 
              id="rear-window"
              onClick={() => handlePartClick('rear-window')}
              data-testid="car-part-rear-window"
            />
          </svg>
          
          {/* Info panel */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-medium text-blue-900">
              {selectedInfo}
            </div>
          </div>
        </div>

        {/* Lista zaznaczonych części */}
        <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Zaznaczone uszkodzenia
          </h4>
          
          {selectedParts.size === 0 ? (
            <p className="text-gray-500 text-sm italic">
              Kliknij znaczniki na modelu samochodu, aby zaznaczyć uszkodzone części
            </p>
          ) : (
            <div className="space-y-2">
              {Array.from(selectedParts).map((partName, index) => (
                <div 
                  key={partName}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="font-medium text-red-800">
                      {CAR_PARTS[partName]}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePartClick(partName)}
                    className="text-red-600 hover:text-red-800 font-bold text-lg px-2"
                    data-testid={`remove-part-${partName}`}
                    title="Usuń zaznaczenie"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Łącznie zaznaczonych części: <strong className="text-red-600">{selectedParts.size}</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export { CAR_PARTS };
export type { CarPartName };