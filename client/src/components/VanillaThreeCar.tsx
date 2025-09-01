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
          <svg width="100%" height="400" viewBox="0 0 800 400" className="w-full h-auto">
            {/* Cień pod samochodem */}
            <ellipse cx="400" cy="350" rx="280" ry="20" fill="#ddd" opacity="0.4"/>
            
            {/* Główne nadwozie - clean style jak Toyota Prius */}
            <g>
              {/* Dolna część nadwozia */}
              <path 
                d="M 120 240 L 680 240 L 680 300 L 150 320 L 120 300 Z"
                fill={getPartColor('roof')}
                stroke={getPartStroke('roof')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof"
              />
              
              {/* Górna część - kabina */}
              <path 
                d="M 180 140 L 220 120 L 580 120 L 620 140 L 620 240 L 180 240 Z"
                fill={getPartColor('roof')}
                stroke={getPartStroke('roof')}
                strokeWidth="2"
                rx="5"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof-cabin"
              />
              
              {/* Maska */}
              <path 
                d="M 80 220 L 180 220 L 220 160 L 180 140 L 120 160 Z"
                fill={getPartColor('hood')}
                stroke={getPartStroke('hood')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
              />
              
              {/* Bagażnik */}
              <path 
                d="M 620 140 L 580 160 L 620 220 L 720 220 L 680 160 Z"
                fill={getPartColor('trunk')}
                stroke={getPartStroke('trunk')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
              />
              
              {/* Przednia szyba */}
              <path 
                d="M 220 120 L 280 105 L 380 105 L 380 140 L 220 140 Z"
                fill={getPartColor('windshield')}
                stroke={getPartStroke('windshield')}
                strokeWidth="1.5"
                fillOpacity="0.1"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('windshield')}
                data-testid="car-part-windshield"
              />
              
              {/* Tylna szyba */}
              <path 
                d="M 420 105 L 520 105 L 580 120 L 580 140 L 420 140 Z"
                fill={getPartColor('rear-window')}
                stroke={getPartStroke('rear-window')}
                strokeWidth="1.5"
                fillOpacity="0.1"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-window')}
                data-testid="car-part-rear-window"
              />
              
              {/* Linia rozdziału szyb */}
              <line x1="400" y1="105" x2="400" y2="140" stroke="#2c3e50" strokeWidth="1"/>
              
              {/* Przednie drzwi */}
              <rect 
                x="220" y="140" width="90" height="100" 
                fill={getPartColor('front-door-left')}
                stroke={getPartStroke('front-door-left')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
              />
              
              {/* Tylne drzwi */}
              <rect 
                x="310" y="140" width="90" height="100" 
                fill={getPartColor('rear-door-left')}
                stroke={getPartStroke('rear-door-left')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-door-left')}
                data-testid="car-part-rear-door-left"
              />
              
              {/* Słupki */}
              <line x1="220" y1="120" x2="220" y2="240" stroke="#2c3e50" strokeWidth="3"/>
              <line x1="310" y1="120" x2="310" y2="240" stroke="#2c3e50" strokeWidth="2"/>
              <line x1="400" y1="120" x2="400" y2="240" stroke="#2c3e50" strokeWidth="2"/>
              <line x1="490" y1="120" x2="490" y2="240" stroke="#2c3e50" strokeWidth="2"/>
              <line x1="580" y1="120" x2="580" y2="240" stroke="#2c3e50" strokeWidth="3"/>
              
              {/* Więcej drzwi (prawe strony) */}
              <rect 
                x="400" y="140" width="90" height="100" 
                fill={getPartColor('rear-door-right')}
                stroke={getPartStroke('rear-door-right')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-door-right')}
                data-testid="car-part-rear-door-right"
              />
              
              <rect 
                x="490" y="140" width="90" height="100" 
                fill={getPartColor('front-door-right')}
                stroke={getPartStroke('front-door-right')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-door-right')}
                data-testid="car-part-front-door-right"
              />
              
              {/* Przedni zderzak */}
              <rect 
                x="40" y="230" width="50" height="40" rx="8"
                fill={getPartColor('front-bumper')}
                stroke={getPartStroke('front-bumper')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('front-bumper')}
                data-testid="car-part-front-bumper"
              />
              
              {/* Tylny zderzak */}
              <rect 
                x="710" y="230" width="50" height="40" rx="8"
                fill={getPartColor('rear-bumper')}
                stroke={getPartStroke('rear-bumper')}
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePartClick('rear-bumper')}
                data-testid="car-part-rear-bumper"
              />
            </g>
            
            {/* Koła - minimalistyczny styl */}
            <circle cx="180" cy="330" r="30" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="3"/>
            <circle cx="180" cy="330" r="20" fill="#e9ecef" stroke="#6c757d" strokeWidth="1"/>
            <circle cx="180" cy="330" r="8" fill="#495057"/>
            
            <circle cx="620" cy="330" r="30" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="3"/>
            <circle cx="620" cy="330" r="20" fill="#e9ecef" stroke="#6c757d" strokeWidth="1"/>
            <circle cx="620" cy="330" r="8" fill="#495057"/>
            
            {/* Reflektory */}
            <ellipse cx="50" cy="240" rx="12" ry="8" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1.5"/>
            <ellipse cx="50" cy="260" rx="12" ry="8" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1.5"/>
            
            {/* Tylne światła */}
            <rect x="745" y="235" width="10" height="12" rx="2" fill="#ff6b6b" stroke="#cc0000" strokeWidth="1"/>
            <rect x="745" y="253" width="10" height="12" rx="2" fill="#ff6b6b" stroke="#cc0000" strokeWidth="1"/>
            
            {/* Lusterka */}
            <ellipse cx="200" cy="150" rx="6" ry="4" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1"/>
            <ellipse cx="600" cy="150" rx="6" ry="4" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1"/>
            
            {/* Klamki drzwi */}
            <circle cx="265" cy="190" r="2" fill="#6c757d"/>
            <circle cx="355" cy="190" r="2" fill="#6c757d"/>
            <circle cx="445" cy="190" r="2" fill="#6c757d"/>
            <circle cx="535" cy="190" r="2" fill="#6c757d"/>
            
            {/* Przycisk zmiany widoku */}
            <g 
              onClick={() => setCurrentView('top')}
              style={{ cursor: 'pointer' }}
              data-testid="button-change-view"
            >
              <rect x="350" y="360" width="100" height="30" rx="15" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1"/>
              <text x="400" y="380" fontFamily="Arial" fontSize="12" fontWeight="500" fill="white" textAnchor="middle">
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

  // Widok z góry - clean minimalistyczny styl
  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
        <svg width="100%" height="500" viewBox="0 0 400 600" className="w-full h-auto">
          {/* Cień */}
          <ellipse cx="200" cy="300" rx="80" ry="220" fill="#ddd" opacity="0.3"/>
          
          {/* Główne nadwozie z góry */}
          <rect 
            x="140" y="100" width="120" height="400" rx="25"
            fill={getPartColor('roof')}
            stroke={getPartStroke('roof')}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('roof')}
            data-testid="car-part-roof-top"
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
          
          {/* Szyby */}
          <rect 
            x="160" y="140" width="80" height="60" rx="8"
            fill={getPartColor('windshield')}
            stroke={getPartStroke('windshield')}
            strokeWidth="1.5"
            fillOpacity="0.1"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('windshield')}
            data-testid="car-part-windshield-top"
          />
          
          <rect 
            x="160" y="400" width="80" height="60" rx="8"
            fill={getPartColor('rear-window')}
            stroke={getPartStroke('rear-window')}
            strokeWidth="1.5"
            fillOpacity="0.1"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-window')}
            data-testid="car-part-rear-window-top"
          />
          
          {/* Drzwi lewe */}
          <rect 
            x="110" y="160" width="40" height="80"
            fill={getPartColor('front-door-left')}
            stroke={getPartStroke('front-door-left')}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('front-door-left')}
            data-testid="car-part-front-door-left-top"
          />
          
          <rect 
            x="110" y="260" width="40" height="80"
            fill={getPartColor('rear-door-left')}
            stroke={getPartStroke('rear-door-left')}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-door-left')}
            data-testid="car-part-rear-door-left-top"
          />
          
          {/* Drzwi prawe */}
          <rect 
            x="250" y="160" width="40" height="80"
            fill={getPartColor('front-door-right')}
            stroke={getPartStroke('front-door-right')}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('front-door-right')}
            data-testid="car-part-front-door-right-top"
          />
          
          <rect 
            x="250" y="260" width="40" height="80"
            fill={getPartColor('rear-door-right')}
            stroke={getPartStroke('rear-door-right')}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick('rear-door-right')}
            data-testid="car-part-rear-door-right-top"
          />
          
          {/* Koła */}
          <circle cx="140" cy="130" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="260" cy="130" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="140" cy="470" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="260" cy="470" r="18" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="2"/>
          
          {/* Lusterka */}
          <ellipse cx="130" cy="180" rx="4" ry="8" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1"/>
          <ellipse cx="270" cy="180" rx="4" ry="8" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1"/>
          
          {/* Przycisk powrotu do widoku z boku */}
          <g 
            onClick={() => setCurrentView('side')}
            style={{ cursor: 'pointer' }}
            data-testid="button-change-view-back"
          >
            <rect x="150" y="20" width="100" height="30" rx="15" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1"/>
            <text x="200" y="40" fontFamily="Arial" fontSize="12" fontWeight="500" fill="white" textAnchor="middle">
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