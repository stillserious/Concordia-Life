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

  const getPartStyle = (partName: CarPartName) => {
    const isSelected = selectedParts.has(partName);
    return {
      fill: isSelected ? '#ff6b6b' : (partName === 'trunk' ? '#6fc0ff' : '#d2ebfb'),
      stroke: '#3890cf',
      strokeWidth: 2,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    };
  };

  const getWindowStyle = (partName: CarPartName) => {
    const isSelected = selectedParts.has(partName);
    return {
      fill: isSelected ? '#ff9999' : '#e9f6fb',
      stroke: '#3890cf',
      strokeWidth: 2,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    };
  };

  if (currentView === 'side') {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm p-4">
          <svg width="100%" height="450" viewBox="0 0 500 450" className="w-full h-auto">
            {/* Cień pod autem */}
            <ellipse cx="260" cy="300" rx="180" ry="35" fill="#eee"/>
            
            {/* Główna bryła auta */}
            <g>
              {/* Główne nadwozie */}
              <polygon 
                points="70,200 100,130 400,95 430,200 450,260 400,350 160,350 75,260"
                {...getPartStyle('roof')}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof"
              />
              
              {/* Maska */}
              <polygon 
                points="70,200 100,130 140,135 110,205"
                {...getPartStyle('hood')}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
              />
              
              {/* Bagażnik */}
              <polygon 
                points="330,115 430,130 450,260 400,350 330,350"
                {...getPartStyle('trunk')}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
              />
              
              {/* Szyby */}
              <polygon 
                points="120,150 180,110 280,105 290,150"
                {...getWindowStyle('windshield')}
                onClick={() => handlePartClick('windshield')}
                data-testid="car-part-windshield"
              />
              
              <polygon 
                points="290,150 370,100 390,140 330,155"
                {...getWindowStyle('rear-window')}
                onClick={() => handlePartClick('rear-window')}
                data-testid="car-part-rear-window"
              />
              
              {/* Przednie drzwi */}
              <rect 
                x="140" y="185" width="85" height="70" 
                {...getPartStyle('front-door-left')}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
              />
              
              {/* Tylne drzwi */}
              <rect 
                x="240" y="185" width="85" height="70" 
                {...getPartStyle('rear-door-left')}
                onClick={() => handlePartClick('rear-door-left')}
                data-testid="car-part-rear-door-left"
              />
              
              {/* Przedni zderzak */}
              <rect 
                x="75" y="220" width="40" height="30" 
                {...getPartStyle('front-bumper')}
                onClick={() => handlePartClick('front-bumper')}
                data-testid="car-part-front-bumper"
              />
              
              {/* Tylny zderzak */}
              <rect 
                x="400" y="220" width="50" height="30" 
                {...getPartStyle('rear-bumper')}
                onClick={() => handlePartClick('rear-bumper')}
                data-testid="car-part-rear-bumper"
              />
            </g>
            
            {/* Koła */}
            <ellipse cx="120" cy="340" rx="36" ry="36" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
            <ellipse cx="370" cy="350" rx="35" ry="35" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
            <ellipse cx="120" cy="340" rx="22" ry="22" fill="#cfcfcf"/>
            <ellipse cx="370" cy="350" rx="20" ry="20" fill="#cfcfcf"/>
            
            {/* Lusterko */}
            <ellipse cx="170" cy="177" rx="14" ry="8" fill="#e9f6fb" stroke="#3890cf" strokeWidth="2"/>
            
            {/* Lampy tył */}
            <rect x="425" y="170" width="20" height="17" fill="#fed4d4" stroke="#3890cf" strokeWidth="1"/>
            
            {/* Przycisk zmiany widoku */}
            <g 
              onClick={() => setCurrentView('top')}
              style={{ cursor: 'pointer' }}
              data-testid="button-change-view"
            >
              <rect x="230" y="390" width="40" height="6" rx="3" fill="#45a7e5"/>
              <rect x="242" y="376" width="17" height="6" rx="3" fill="#45a7e5"/>
              <rect x="242" y="363" width="17" height="6" rx="3" fill="#45a7e5"/>
              <text x="115" y="430" fontFamily="Arial" fontSize="22" fontWeight="bold" fill="#45a7e5">
                ZMIEŃ WIDOK
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

  // Widok z góry (uproszczony)
  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm p-4">
        <svg width="100%" height="450" viewBox="0 0 500 450" className="w-full h-auto">
          {/* Widok z góry - prostokątny samochód */}
          <rect 
            x="150" y="100" width="200" height="300" rx="20"
            {...getPartStyle('roof')}
            onClick={() => handlePartClick('roof')}
            data-testid="car-part-roof-top"
          />
          
          {/* Maska */}
          <rect 
            x="170" y="80" width="160" height="40" rx="8"
            {...getPartStyle('hood')}
            onClick={() => handlePartClick('hood')}
            data-testid="car-part-hood-top"
          />
          
          {/* Bagażnik */}
          <rect 
            x="170" y="380" width="160" height="40" rx="8"
            {...getPartStyle('trunk')}
            onClick={() => handlePartClick('trunk')}
            data-testid="car-part-trunk-top"
          />
          
          {/* Drzwi lewe */}
          <rect 
            x="120" y="140" width="40" height="80"
            {...getPartStyle('front-door-left')}
            onClick={() => handlePartClick('front-door-left')}
            data-testid="car-part-front-door-left-top"
          />
          
          <rect 
            x="120" y="240" width="40" height="80"
            {...getPartStyle('rear-door-left')}
            onClick={() => handlePartClick('rear-door-left')}
            data-testid="car-part-rear-door-left-top"
          />
          
          {/* Drzwi prawe */}
          <rect 
            x="340" y="140" width="40" height="80"
            {...getPartStyle('front-door-right')}
            onClick={() => handlePartClick('front-door-right')}
            data-testid="car-part-front-door-right-top"
          />
          
          <rect 
            x="340" y="240" width="80" height="80"
            {...getPartStyle('rear-door-right')}
            onClick={() => handlePartClick('rear-door-right')}
            data-testid="car-part-rear-door-right-top"
          />
          
          {/* Koła */}
          <circle cx="140" cy="130" r="25" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
          <circle cx="360" cy="130" r="25" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
          <circle cx="140" cy="370" r="25" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
          <circle cx="360" cy="370" r="25" fill="#b7d0e0" stroke="#3890cf" strokeWidth="3"/>
          
          {/* Przycisk powrotu do widoku z boku */}
          <g 
            onClick={() => setCurrentView('side')}
            style={{ cursor: 'pointer' }}
            data-testid="button-change-view-back"
          >
            <rect x="200" y="20" width="100" height="30" rx="15" fill="#45a7e5"/>
            <text x="250" y="40" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
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