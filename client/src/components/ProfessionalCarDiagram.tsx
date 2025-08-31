import { useState } from "react";

// Polskie nazwy części samochodu  
const CAR_PARTS = {
  // Lewy bok (przód)
  'blotnik-tylny-lewy': 'błotnik tylny lewy',
  'blotnik-przedni-lewy': 'błotnik przedni lewy',
  'chlodnica': 'chłodnica',
  'dach': 'dach',
  'drzwi-przednie-lewe': 'drzwi przednie lewe',
  'drzwi-tylne-lewe': 'drzwi tylne lewe',
  'kolo-przednie-lewe': 'koło przednie lewe',
  'kolo-tylne-lewe': 'koło tylne lewe',
  
  // Prawy bok (tył)
  'szyba-tylna': 'szyba tylna',
  'blotnik-przedni-prawy': 'błotnik przedni prawy',
  'blotnik-tylny-prawy': 'błotnik tylny prawy',
  'drzwi-przednie-prawe': 'drzwi przednie prawe',
  'drzwi-tylne-prawe': 'drzwi tylne prawe',
  'kolo-przednie-prawe': 'koło przednie prawe',
  'kolo-tylne-prawe': 'koło tylne prawe',
  'lampa-tylna-prawa': 'lampa tylna prawa',
  'lampa-tylna-lewa': 'lampa tylna lewa',
  
  // Wspólne
  'maska': 'pokrywa przednia',
  'zderzak-przedni': 'zderzak przedni',
  'zderzak-tylny': 'zderzak tylny',
  'szyba-przednia': 'szyba przednia',
  'reflektor-lewy': 'reflektor przedni lewy',
  'reflektor-prawy': 'reflektor przedni prawy',
  'lusterko-lewe': 'lusterko lewe',
  'lusterko-prawe': 'lusterko prawe',
  'bagaznik': 'pokrywa bagażnika'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface CarPartProps {
  d: string;
  id: CarPartName;
  selected: boolean;
  onSelect: (partName: CarPartName) => void;
  baseColor?: string;
}

function CarPart({ d, id, selected, onSelect, baseColor = "#E3F2FD" }: CarPartProps) {
  const [hovered, setHovered] = useState(false);

  const getColor = () => {
    if (selected) return "#1976D2"; // Niebieski dla zaznaczonych
    if (hovered) return "#90CAF9"; // Jasnoniebieski na hover
    return baseColor;
  };

  return (
    <path
      d={d}
      fill={getColor()}
      stroke="#1565C0"
      strokeWidth={hovered ? 2 : 1}
      className="cursor-pointer transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`car-part-${id}`}
    />
  );
}

interface ProfessionalCarDiagramProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function ProfessionalCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: ProfessionalCarDiagramProps) {
  const [activeView, setActiveView] = useState<'front-left' | 'rear-right'>('front-left');

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Przełącznik widoku */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setActiveView('front-left')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeView === 'front-left' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          data-testid="view-front-left"
        >
          PRZÓD I LEWY BOK
        </button>
        <button
          onClick={() => setActiveView('rear-right')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeView === 'rear-right' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          data-testid="view-rear-right"
        >
          TYŁ I PRAWY BOK
        </button>
      </div>

      <div className="flex gap-8">
        {/* Diagram samochodu */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
          {activeView === 'front-left' ? (
            // Widok przód i lewy bok
            <svg 
              viewBox="0 0 600 400" 
              className="w-full h-auto"
              style={{ minHeight: '400px' }}
            >
              {/* Cień */}
              <ellipse cx="300" cy="370" rx="180" ry="20" fill="rgba(0,0,0,0.1)" />
              
              {/* Główne nadwozie - perspektywa izometryczna */}
              <g transform="translate(150, 100)">
                {/* Nadwozie główne */}
                <path
                  d="M 0 100 L 50 80 L 250 80 L 300 100 L 300 200 L 250 220 L 50 220 L 0 200 Z"
                  fill="#E3F2FD"
                  stroke="#1565C0"
                  strokeWidth="1"
                />
                
                {/* Dach */}
                <CarPart
                  d="M 70 80 L 230 80 L 200 30 L 100 30 Z"
                  id="dach"
                  selected={selectedParts.has('dach')}
                  onSelect={onPartSelect}
                />
                
                {/* Szyba przednia */}
                <CarPart
                  d="M 50 80 L 70 80 L 100 30 L 60 40 Z"
                  id="szyba-przednia"
                  selected={selectedParts.has('szyba-przednia')}
                  onSelect={onPartSelect}
                  baseColor="#B3E5FC"
                />
                
                {/* Maska */}
                <CarPart
                  d="M 0 100 L 50 80 L 50 130 L 0 150 Z"
                  id="maska"
                  selected={selectedParts.has('maska')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi przednie lewe */}
                <CarPart
                  d="M 70 80 L 120 80 L 120 180 L 70 180 Z"
                  id="drzwi-przednie-lewe"
                  selected={selectedParts.has('drzwi-przednie-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi tylne lewe */}
                <CarPart
                  d="M 120 80 L 180 80 L 180 180 L 120 180 Z"
                  id="drzwi-tylne-lewe"
                  selected={selectedParts.has('drzwi-tylne-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik przedni lewy */}
                <CarPart
                  d="M 30 180 L 80 180 L 80 200 L 30 200 Z"
                  id="blotnik-przedni-lewy"
                  selected={selectedParts.has('blotnik-przedni-lewy')}
                  onSelect={onPartSelect}
                  baseColor="#CFD8DC"
                />
                
                {/* Błotnik tylny lewy */}
                <CarPart
                  d="M 150 180 L 200 180 L 200 200 L 150 200 Z"
                  id="blotnik-tylny-lewy"
                  selected={selectedParts.has('blotnik-tylny-lewy')}
                  onSelect={onPartSelect}
                  baseColor="#CFD8DC"
                />
                
                {/* Zderzak przedni */}
                <path
                  d="M -20 150 L 0 150 L 0 180 L -20 180 Z"
                  fill="#607D8B"
                  stroke="#455A64"
                  strokeWidth="1"
                />
                
                {/* Reflektor lewy */}
                <circle cx="10" cy="120" r="15" fill="#FFF9C4" stroke="#F57C00" strokeWidth="1" />
                
                {/* Koło przednie lewe */}
                <CarPart
                  d="M 35 200 A 25 25 0 0 0 75 200 Z M 55 200 A 5 5 0 0 0 55 200"
                  id="kolo-przednie-lewe"
                  selected={selectedParts.has('kolo-przednie-lewe')}
                  onSelect={onPartSelect}
                  baseColor="#424242"
                />
                
                {/* Koło tylne lewe */}
                <CarPart
                  d="M 155 200 A 25 25 0 0 0 195 200 Z M 175 200 A 5 5 0 0 0 175 200"
                  id="kolo-tylne-lewe"
                  selected={selectedParts.has('kolo-tylne-lewe')}
                  onSelect={onPartSelect}
                  baseColor="#424242"
                />
                
                {/* Lusterko lewe */}
                <rect x="65" y="70" width="10" height="8" fill="#607D8B" stroke="#455A64" strokeWidth="1" />
              </g>
              
              {/* Linia podkreślająca "ZMIEŃ WIDOK" */}
              <text x="300" y="390" textAnchor="middle" className="text-sm text-blue-600 font-medium">
                ZMIEŃ WIDOK
              </text>
            </svg>
          ) : (
            // Widok tył i prawy bok
            <svg 
              viewBox="0 0 600 400" 
              className="w-full h-auto"
              style={{ minHeight: '400px' }}
            >
              {/* Cień */}
              <ellipse cx="300" cy="370" rx="180" ry="20" fill="rgba(0,0,0,0.1)" />
              
              {/* Główne nadwozie - perspektywa izometryczna od tyłu */}
              <g transform="translate(150, 100)">
                {/* Nadwozie główne */}
                <path
                  d="M 0 100 L 50 80 L 250 80 L 300 100 L 300 200 L 250 220 L 50 220 L 0 200 Z"
                  fill="#E3F2FD"
                  stroke="#1565C0"
                  strokeWidth="1"
                />
                
                {/* Dach */}
                <CarPart
                  d="M 70 80 L 230 80 L 200 30 L 100 30 Z"
                  id="dach"
                  selected={selectedParts.has('dach')}
                  onSelect={onPartSelect}
                />
                
                {/* Szyba tylna */}
                <CarPart
                  d="M 230 80 L 250 80 L 240 40 L 200 30 Z"
                  id="szyba-tylna"
                  selected={selectedParts.has('szyba-tylna')}
                  onSelect={onPartSelect}
                  baseColor="#B3E5FC"
                />
                
                {/* Bagażnik */}
                <CarPart
                  d="M 250 80 L 300 100 L 300 150 L 250 130 Z"
                  id="bagaznik"
                  selected={selectedParts.has('bagaznik')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi przednie prawe */}
                <CarPart
                  d="M 120 80 L 180 80 L 180 180 L 120 180 Z"
                  id="drzwi-przednie-prawe"
                  selected={selectedParts.has('drzwi-przednie-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi tylne prawe */}
                <CarPart
                  d="M 180 80 L 230 80 L 230 180 L 180 180 Z"
                  id="drzwi-tylne-prawe"
                  selected={selectedParts.has('drzwi-tylne-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik przedni prawy */}
                <CarPart
                  d="M 100 180 L 150 180 L 150 200 L 100 200 Z"
                  id="blotnik-przedni-prawy"
                  selected={selectedParts.has('blotnik-przedni-prawy')}
                  onSelect={onPartSelect}
                  baseColor="#CFD8DC"
                />
                
                {/* Błotnik tylny prawy */}
                <CarPart
                  d="M 220 180 L 270 180 L 270 200 L 220 200 Z"
                  id="blotnik-tylny-prawy"
                  selected={selectedParts.has('blotnik-tylny-prawy')}
                  onSelect={onPartSelect}
                  baseColor="#CFD8DC"
                />
                
                {/* Zderzak tylny */}
                <path
                  d="M 300 150 L 320 150 L 320 180 L 300 180 Z"
                  fill="#607D8B"
                  stroke="#455A64"
                  strokeWidth="1"
                />
                
                {/* Lampa tylna prawa */}
                <CarPart
                  d="M 285 120 A 12 12 0 0 0 285 140"
                  id="lampa-tylna-prawa"
                  selected={selectedParts.has('lampa-tylna-prawa')}
                  onSelect={onPartSelect}
                  baseColor="#F44336"
                />
                
                {/* Koło przednie prawe */}
                <CarPart
                  d="M 105 200 A 25 25 0 0 0 145 200 Z M 125 200 A 5 5 0 0 0 125 200"
                  id="kolo-przednie-prawe"
                  selected={selectedParts.has('kolo-przednie-prawe')}
                  onSelect={onPartSelect}
                  baseColor="#424242"
                />
                
                {/* Koło tylne prawe */}
                <CarPart
                  d="M 225 200 A 25 25 0 0 0 265 200 Z M 245 200 A 5 5 0 0 0 245 200"
                  id="kolo-tylne-prawe"
                  selected={selectedParts.has('kolo-tylne-prawe')}
                  onSelect={onPartSelect}
                  baseColor="#424242"
                />
                
                {/* Lusterko prawe */}
                <rect x="225" y="70" width="10" height="8" fill="#607D8B" stroke="#455A64" strokeWidth="1" />
              </g>
              
              {/* Linia podkreślająca "ZMIEŃ WIDOK" */}
              <text x="300" y="390" textAnchor="middle" className="text-sm text-blue-600 font-medium">
                ZMIEŃ WIDOK
              </text>
            </svg>
          )}
        </div>

        {/* Lista części */}
        <div className="w-80">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            {activeView === 'front-left' ? 'PRZÓD I LEWY BOK' : 'TYŁ I PRAWY BOK'}
          </h3>
          
          <div className="space-y-2">
            {Object.entries(CAR_PARTS)
              .filter(([key]) => {
                if (activeView === 'front-left') {
                  return key.includes('lewy') || key.includes('lewe') || 
                         key === 'dach' || key === 'maska' || 
                         key === 'szyba-przednia' || key === 'chlodnica' ||
                         key === 'zderzak-przedni' || key === 'reflektor-lewy';
                } else {
                  return key.includes('prawy') || key.includes('prawe') || 
                         key === 'szyba-tylna' || key === 'bagaznik' ||
                         key === 'zderzak-tylny' || key.includes('lampa-tylna');
                }
              })
              .map(([key, label]) => (
                <label 
                  key={key} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedParts.has(key as CarPartName)}
                    onChange={() => onPartSelect(key as CarPartName)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    data-testid={`checkbox-${key}`}
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
          </div>
        </div>
      </div>

      {/* Podsumowanie uszkodzeń */}
      {selectedParts.size > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            Zaznaczone uszkodzenia ({selectedParts.size}):
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