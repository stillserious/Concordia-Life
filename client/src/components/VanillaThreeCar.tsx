import { useState } from "react";
import toyotaPriusSvg from "../assets/toyota-prius-full.svg";

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
            {/* Profesjonalny SVG Toyota Prius */}
            <img 
              src={toyotaPriusSvg} 
              alt="Toyota Prius Professional Model" 
              className="w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
            
            {/* Interaktywne obszary dopasowane do rzeczywistych pozycji w SVG (viewBox: 0 0 841.9 595.3) */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* LEWY GÓRNY - WIDOK BOCZNY Z LEWEJ (0-50% x, 0-50% y) */}
              
              {/* Maska - przednia część w widoku bocznym lewym */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '2%',
                  top: '15%',
                  width: '12%',
                  height: '20%',
                  backgroundColor: selectedParts.has('hood') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('hood') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
              />
              
              {/* Główne nadwozie boczne lewe */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '15%',
                  top: '10%',
                  width: '20%',
                  height: '25%',
                  backgroundColor: selectedParts.has('body') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('body') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('body')}
                data-testid="car-part-body"
              />
              
              {/* Przednie drzwi lewe */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '10%',
                  top: '25%',
                  width: '8%',
                  height: '12%',
                  backgroundColor: selectedParts.has('front-door-left') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('front-door-left') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
              />
              
              {/* Tylne drzwi lewe */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '18%',
                  top: '25%',
                  width: '12%',
                  height: '12%',
                  backgroundColor: selectedParts.has('rear-door-left') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('rear-door-left') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('rear-door-left')}
                data-testid="car-part-rear-door-left"
              />
              
              {/* Bagażnik w widoku bocznym lewym */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '35%',
                  top: '15%',
                  width: '12%',
                  height: '20%',
                  backgroundColor: selectedParts.has('trunk') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('trunk') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
              />
              
              {/* PRAWY GÓRNY - WIDOK Z PRZODU (50-100% x, 0-50% y) */}
              
              {/* Przedni zderzak */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '35%',
                  width: '20%',
                  height: '8%',
                  backgroundColor: selectedParts.has('front-bumper') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('front-bumper') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('front-bumper')}
                data-testid="car-part-front-bumper"
              />
              
              {/* Maska z przodu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '25%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('hood') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('hood') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood-front"
              />
              
              {/* Przednia szyba */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '15%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('windshield') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('windshield') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('windshield')}
                data-testid="car-part-windshield"
              />
              
              {/* Dach z przodu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '5%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('roof') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('roof') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof"
              />
              
              {/* PRAWY DOLNY - WIDOK Z TYŁU (50-100% x, 50-100% y) */}
              
              {/* Tylny zderzak */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '85%',
                  width: '20%',
                  height: '8%',
                  backgroundColor: selectedParts.has('rear-bumper') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('rear-bumper') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('rear-bumper')}
                data-testid="car-part-rear-bumper"
              />
              
              {/* Bagażnik z tyłu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '75%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('trunk') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('trunk') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk-rear"
              />
              
              {/* Tylna szyba */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '65%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('rear-window') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('rear-window') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('rear-window')}
                data-testid="car-part-rear-window"
              />
              
              {/* Dach z tyłu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '60%',
                  top: '55%',
                  width: '20%',
                  height: '10%',
                  backgroundColor: selectedParts.has('roof') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('roof') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '8px'
                }}
                onClick={() => handlePartClick('roof')}
                data-testid="car-part-roof-rear"
              />
              
            </div>
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