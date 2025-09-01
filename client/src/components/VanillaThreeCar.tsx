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
  const [currentView, setCurrentView] = useState<'side' | 'top'>('side');

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  const getPartColor = (partName: CarPartName, defaultColor: string) => {
    return selectedParts.has(partName) ? '#ff4444' : defaultColor;
  };

  if (currentView === 'side') {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm p-4">
          <svg width="100%" height="450" viewBox="0 0 600 450" className="w-full h-auto">
            {/* Cień pod autem */}
            <ellipse cx="300" cy="370" rx="220" ry="25" fill="#ddd" opacity="0.5"/>
            
            {/* Główne nadwozie samochodu - realistyczny kształt */}
            <g>
              {/* Dolna część nadwozia */}
              <path 
                d="M 80 280 L 520 280 L 520 340 L 80 340 Z"
                fill={getPartColor('roof', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof"
              />
              
              {/* Kabina pasażerska */}
              <path 
                d="M 120 180 L 150 140 L 450 140 L 480 180 L 480 280 L 120 280 Z"
                fill={getPartColor('roof', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof-cabin"
              />
              
              {/* Maska */}
              <path 
                d="M 50 250 L 120 250 L 150 200 L 120 180 L 80 200 Z"
                fill={getPartColor('hood', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
              />
              
              {/* Bagażnik */}
              <path 
                d="M 480 180 L 450 200 L 480 250 L 550 250 L 520 200 Z"
                fill={getPartColor('trunk', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
              />
              
              {/* Przednia szyba */}
              <path 
                d="M 150 140 L 200 120 L 300 120 L 300 180 L 150 180 Z"
                fill={getPartColor('windshield', '#87ceeb')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                opacity="0.7"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('windshield')}
                data-testid="car-part-windshield"
              />
              
              {/* Tylna szyba */}
              <path 
                d="M 300 120 L 400 120 L 450 140 L 450 180 L 300 180 Z"
                fill={getPartColor('rear-window', '#87ceeb')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                opacity="0.7"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-window')}
                data-testid="car-part-rear-window"
              />
              
              {/* Przednie drzwi */}
              <rect 
                x="150" y="180" width="80" height="100" 
                fill={getPartColor('front-door-left', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
              />
              
              {/* Tylne drzwi */}
              <rect 
                x="230" y="180" width="80" height="100" 
                fill={getPartColor('rear-door-left', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-door-left')}
                data-testid="car-part-rear-door-left"
              />
              
              {/* Następne drzwi */}
              <rect 
                x="310" y="180" width="80" height="100" 
                fill={getPartColor('rear-door-right', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-door-right')}
                data-testid="car-part-rear-door-right"
              />
              
              {/* Ostatnie drzwi */}
              <rect 
                x="390" y="180" width="60" height="100" 
                fill={getPartColor('front-door-right', '#4a90e2')} 
                stroke="#2c5aa0" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-door-right')}
                data-testid="car-part-front-door-right"
              />
              
              {/* Przedni zderzak */}
              <rect 
                x="20" y="260" width="50" height="40" rx="5"
                fill={getPartColor('front-bumper', '#2c5aa0')} 
                stroke="#1a4480" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-bumper')}
                data-testid="car-part-front-bumper"
              />
              
              {/* Tylny zderzak */}
              <rect 
                x="530" y="260" width="50" height="40" rx="5"
                fill={getPartColor('rear-bumper', '#2c5aa0')} 
                stroke="#1a4480" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-bumper')}
                data-testid="car-part-rear-bumper"
              />
            </g>
            
            {/* Koła */}
            <circle cx="140" cy="360" r="35" fill="#333" stroke="#222" strokeWidth="3"/>
            <circle cx="140" cy="360" r="25" fill="#666"/>
            <circle cx="140" cy="360" r="15" fill="#999"/>
            
            <circle cx="460" cy="360" r="35" fill="#333" stroke="#222" strokeWidth="3"/>
            <circle cx="460" cy="360" r="25" fill="#666"/>
            <circle cx="460" cy="360" r="15" fill="#999"/>
            
            {/* Reflektory */}
            <ellipse cx="35" cy="270" rx="8" ry="12" fill="#fff9c4" stroke="#2c5aa0" strokeWidth="1"/>
            <ellipse cx="35" cy="290" rx="8" ry="12" fill="#fff9c4" stroke="#2c5aa0" strokeWidth="1"/>
            
            {/* Tylne światła */}
            <rect x="570" y="270" width="8" height="15" fill="#ff6b6b" stroke="#cc0000" strokeWidth="1"/>
            <rect x="570" y="290" width="8" height="15" fill="#ff6b6b" stroke="#cc0000" strokeWidth="1"/>
            
            {/* Lusterka */}
            <ellipse cx="145" cy="160" rx="8" ry="5" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
            <ellipse cx="455" cy="160" rx="8" ry="5" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
            
            {/* Klamki */}
            <circle cx="200" cy="230" r="3" fill="#888"/>
            <circle cx="280" cy="230" r="3" fill="#888"/>
            <circle cx="360" cy="230" r="3" fill="#888"/>
            <circle cx="420" cy="230" r="3" fill="#888"/>
            
            {/* Przycisk zmiany widoku */}
            <g 
              onClick={() => setCurrentView('top')}
              style={{ cursor: 'pointer' }}
              data-testid="button-change-view"
            >
              <rect x="250" y="400" width="100" height="30" rx="15" fill="#45a7e5"/>
              <text x="300" y="420" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
                WIDOK Z GÓRY
              </text>
            </g>
          </svg>
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

  // Widok z góry - prostszy i czytelniejszy
  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm p-4">
        <svg width="100%" height="450" viewBox="0 0 400 600" className="w-full h-auto">
          {/* Cień */}
          <ellipse cx="200" cy="300" rx="90" ry="250" fill="#ddd" opacity="0.5"/>
          
          {/* Główne nadwozie z góry */}
          <rect 
            x="140" y="80" width="120" height="440" rx="20"
            fill={getPartColor('roof', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('roof')}
            data-testid="car-part-roof-top"
          />
          
          {/* Maska */}
          <rect 
            x="150" y="40" width="100" height="60" rx="15"
            fill={getPartColor('hood', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('hood')}
            data-testid="car-part-hood-top"
          />
          
          {/* Bagażnik */}
          <rect 
            x="150" y="500" width="100" height="60" rx="15"
            fill={getPartColor('trunk', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('trunk')}
            data-testid="car-part-trunk-top"
          />
          
          {/* Drzwi lewe */}
          <rect 
            x="100" y="120" width="50" height="90"
            fill={getPartColor('front-door-left', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('front-door-left')}
            data-testid="car-part-front-door-left-top"
          />
          
          <rect 
            x="100" y="230" width="50" height="90"
            fill={getPartColor('rear-door-left', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-door-left')}
            data-testid="car-part-rear-door-left-top"
          />
          
          {/* Drzwi prawe */}
          <rect 
            x="250" y="120" width="50" height="90"
            fill={getPartColor('front-door-right', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('front-door-right')}
            data-testid="car-part-front-door-right-top"
          />
          
          <rect 
            x="250" y="230" width="50" height="90"
            fill={getPartColor('rear-door-right', '#4a90e2')} 
            stroke="#2c5aa0" 
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-door-right')}
            data-testid="car-part-rear-door-right-top"
          />
          
          {/* Szyby */}
          <rect 
            x="160" y="140" width="80" height="40"
            fill={getPartColor('windshield', '#87ceeb')} 
            stroke="#2c5aa0" 
            strokeWidth="1"
            opacity="0.7"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('windshield')}
            data-testid="car-part-windshield-top"
          />
          
          <rect 
            x="160" y="250" width="80" height="40"
            fill={getPartColor('rear-window', '#87ceeb')} 
            stroke="#2c5aa0" 
            strokeWidth="1"
            opacity="0.7"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-window')}
            data-testid="car-part-rear-window-top"
          />
          
          {/* Koła */}
          <circle cx="130" cy="110" r="20" fill="#333" stroke="#222" strokeWidth="2"/>
          <circle cx="270" cy="110" r="20" fill="#333" stroke="#222" strokeWidth="2"/>
          <circle cx="130" cy="490" r="20" fill="#333" stroke="#222" strokeWidth="2"/>
          <circle cx="270" cy="490" r="20" fill="#333" stroke="#222" strokeWidth="2"/>
          
          {/* Przycisk powrotu do widoku z boku */}
          <g 
            onClick={() => setCurrentView('side')}
            style={{ cursor: 'pointer' }}
            data-testid="button-change-view-back"
          >
            <rect x="150" y="10" width="100" height="30" rx="15" fill="#45a7e5"/>
            <text x="200" y="30" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
              WIDOK Z BOKU
            </text>
          </g>
        </svg>
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