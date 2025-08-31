import { useState } from "react";

// Polskie nazwy części samochodu dokładnie jak na wzorze
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
  'lampa-tylna-prawa': 'lampa tylna prawa'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface CarPartProps {
  d: string;
  id: CarPartName;
  selected: boolean;
  onSelect: (partName: CarPartName) => void;
}

function CarPart({ d, id, selected, onSelect }: CarPartProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <path
      d={d}
      fill={selected ? "#1976D2" : "#E3F2FD"}
      stroke="#FFFFFF"
      strokeWidth="1.5"
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

interface PreciseCarDiagramProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function PreciseCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: PreciseCarDiagramProps) {
  const [activeView, setActiveView] = useState<'front-left' | 'rear-right'>('front-left');

  const frontLeftParts: CarPartName[] = [
    'blotnik-tylny-lewy',
    'blotnik-przedni-lewy', 
    'chlodnica',
    'dach',
    'drzwi-przednie-lewe',
    'drzwi-tylne-lewe',
    'kolo-przednie-lewe',
    'kolo-tylne-lewe'
  ];

  const rearRightParts: CarPartName[] = [
    'szyba-tylna',
    'blotnik-przedni-prawy',
    'blotnik-tylny-prawy',
    'drzwi-przednie-prawe',
    'drzwi-tylne-prawe',
    'kolo-przednie-prawe',
    'kolo-tylne-prawe',
    'lampa-tylna-prawa'
  ];

  const currentParts = activeView === 'front-left' ? frontLeftParts : rearRightParts;

  return (
    <div className={`bg-white ${className}`}>
      {/* Przełącznik widoku */}
      <div className="flex justify-center mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveView('front-left')}
          className={`px-8 py-3 font-medium border-b-2 transition-all ${
            activeView === 'front-left' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          data-testid="view-front-left"
        >
          PRZÓD I LEWY BOK
        </button>
        <button
          onClick={() => setActiveView('rear-right')}
          className={`px-8 py-3 font-medium border-b-2 transition-all ${
            activeView === 'rear-right' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          data-testid="view-rear-right"
        >
          TYŁ I PRAWY BOK
        </button>
      </div>

      <div className="flex gap-8">
        {/* Diagram samochodu */}
        <div className="flex-1">
          {activeView === 'front-left' ? (
            // Widok przód i lewy bok - dokładnie jak na pierwszym zrzucie
            <svg 
              viewBox="0 0 500 300" 
              className="w-full h-auto bg-gray-50 rounded-lg"
              style={{ minHeight: '300px' }}
            >
              {/* Cień */}
              <ellipse cx="250" cy="280" rx="120" ry="15" fill="rgba(0,0,0,0.1)" />
              
              {/* Samochód izometryczny - przód i lewy bok */}
              <g transform="translate(100, 50)">
                {/* Główne nadwozie */}
                <path
                  d="M 20 120 L 80 90 L 240 90 L 300 120 L 300 180 L 240 210 L 80 210 L 20 180 Z"
                  fill="#E3F2FD"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                
                {/* Dach */}
                <CarPart
                  d="M 80 90 L 240 90 L 220 40 L 100 40 Z"
                  id="dach"
                  selected={selectedParts.has('dach')}
                  onSelect={onPartSelect}
                />
                
                {/* Szyba przednia */}
                <path
                  d="M 80 90 L 100 40 L 70 50 L 50 100 Z"
                  fill="#B3E5FC"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                
                {/* Maska/pokrywa przednia */}
                <path
                  d="M 20 120 L 80 90 L 80 140 L 20 170 Z"
                  fill="#E3F2FD"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                
                {/* Drzwi przednie lewe */}
                <CarPart
                  d="M 80 90 L 130 90 L 130 160 L 80 160 Z"
                  id="drzwi-przednie-lewe"
                  selected={selectedParts.has('drzwi-przednie-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi tylne lewe */}
                <CarPart
                  d="M 130 90 L 190 90 L 190 160 L 130 160 Z"
                  id="drzwi-tylne-lewe"
                  selected={selectedParts.has('drzwi-tylne-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik przedni lewy */}
                <CarPart
                  d="M 50 180 L 100 180 L 100 200 L 50 200 Z"
                  id="blotnik-przedni-lewy"
                  selected={selectedParts.has('blotnik-przedni-lewy')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik tylny lewy */}
                <CarPart
                  d="M 160 180 L 210 180 L 210 200 L 160 200 Z"
                  id="blotnik-tylny-lewy"
                  selected={selectedParts.has('blotnik-tylny-lewy')}
                  onSelect={onPartSelect}
                />
                
                {/* Chłodnica */}
                <CarPart
                  d="M 15 130 L 25 130 L 25 160 L 15 160 Z"
                  id="chlodnica"
                  selected={selectedParts.has('chlodnica')}
                  onSelect={onPartSelect}
                />
                
                {/* Koło przednie lewe */}
                <CarPart
                  d="M 60 200 A 20 20 0 1 0 90 200 A 20 20 0 1 0 60 200"
                  id="kolo-przednie-lewe"
                  selected={selectedParts.has('kolo-przednie-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Koło tylne lewe */}
                <CarPart
                  d="M 170 200 A 20 20 0 1 0 200 200 A 20 20 0 1 0 170 200"
                  id="kolo-tylne-lewe"
                  selected={selectedParts.has('kolo-tylne-lewe')}
                  onSelect={onPartSelect}
                />
                
                {/* Reflektor */}
                <circle cx="30" cy="135" r="8" fill="#FFF9C4" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            </svg>
          ) : (
            // Widok tył i prawy bok - dokładnie jak na drugim zrzucie
            <svg 
              viewBox="0 0 500 300" 
              className="w-full h-auto bg-gray-50 rounded-lg"
              style={{ minHeight: '300px' }}
            >
              {/* Cień */}
              <ellipse cx="250" cy="280" rx="120" ry="15" fill="rgba(0,0,0,0.1)" />
              
              {/* Samochód izometryczny - tył i prawy bok */}
              <g transform="translate(100, 50)">
                {/* Główne nadwozie */}
                <path
                  d="M 20 120 L 80 90 L 240 90 L 300 120 L 300 180 L 240 210 L 80 210 L 20 180 Z"
                  fill="#E3F2FD"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                
                {/* Dach */}
                <CarPart
                  d="M 80 90 L 240 90 L 220 40 L 100 40 Z"
                  id="dach"
                  selected={selectedParts.has('dach')}
                  onSelect={onPartSelect}
                />
                
                {/* Szyba tylna */}
                <CarPart
                  d="M 240 90 L 220 40 L 250 50 L 270 100 Z"
                  id="szyba-tylna"
                  selected={selectedParts.has('szyba-tylna')}
                  onSelect={onPartSelect}
                />
                
                {/* Bagażnik */}
                <path
                  d="M 240 90 L 300 120 L 300 170 L 240 140 Z"
                  fill="#E3F2FD"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                
                {/* Drzwi przednie prawe */}
                <CarPart
                  d="M 130 90 L 190 90 L 190 160 L 130 160 Z"
                  id="drzwi-przednie-prawe"
                  selected={selectedParts.has('drzwi-przednie-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Drzwi tylne prawe */}
                <CarPart
                  d="M 190 90 L 240 90 L 240 160 L 190 160 Z"
                  id="drzwi-tylne-prawe"
                  selected={selectedParts.has('drzwi-tylne-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik przedni prawy */}
                <CarPart
                  d="M 110 180 L 160 180 L 160 200 L 110 200 Z"
                  id="blotnik-przedni-prawy"
                  selected={selectedParts.has('blotnik-przedni-prawy')}
                  onSelect={onPartSelect}
                />
                
                {/* Błotnik tylny prawy */}
                <CarPart
                  d="M 220 180 L 270 180 L 270 200 L 220 200 Z"
                  id="blotnik-tylny-prawy"
                  selected={selectedParts.has('blotnik-tylny-prawy')}
                  onSelect={onPartSelect}
                />
                
                {/* Koło przednie prawe */}
                <CarPart
                  d="M 120 200 A 20 20 0 1 0 150 200 A 20 20 0 1 0 120 200"
                  id="kolo-przednie-prawe"
                  selected={selectedParts.has('kolo-przednie-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Koło tylne prawe */}
                <CarPart
                  d="M 230 200 A 20 20 0 1 0 260 200 A 20 20 0 1 0 230 200"
                  id="kolo-tylne-prawe"
                  selected={selectedParts.has('kolo-tylne-prawe')}
                  onSelect={onPartSelect}
                />
                
                {/* Lampa tylna prawa */}
                <CarPart
                  d="M 285 135 L 295 135 L 295 155 L 285 155 Z"
                  id="lampa-tylna-prawa"
                  selected={selectedParts.has('lampa-tylna-prawa')}
                  onSelect={onPartSelect}
                />
              </g>
            </svg>
          )}
          
          {/* ZMIEŃ WIDOK */}
          <div className="text-center mt-4">
            <button
              onClick={() => setActiveView(activeView === 'front-left' ? 'rear-right' : 'front-left')}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              data-testid="change-view"
            >
              ZMIEŃ WIDOK
            </button>
          </div>
        </div>

        {/* Lista części - dokładnie jak na wzorze */}
        <div className="w-80 border-l border-gray-200 pl-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                activeView === 'front-left' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-400'
              }`}
            >
              PRZÓD I LEWY BOK
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                activeView === 'rear-right' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-400'
              }`}
            >
              TYŁ I PRAWY BOK
            </button>
          </div>
          
          <div className="space-y-3">
            {currentParts.map((partName) => (
              <label 
                key={partName} 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedParts.has(partName)}
                    onChange={() => onPartSelect(partName)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    data-testid={`checkbox-${partName}`}
                  />
                  {selectedParts.has(partName) && (
                    <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-2 border-blue-500 rounded"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {CAR_PARTS[partName]}
                </span>
              </label>
            ))}
          </div>
          
          {/* Niebieska linia pionowa po prawej - jak na wzorze */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export { CAR_PARTS };
export type { CarPartName };