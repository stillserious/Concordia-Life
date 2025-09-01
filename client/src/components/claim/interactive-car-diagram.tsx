import { useState } from "react";

interface InteractiveCarDiagramProps {
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

// Mapowanie nazw części na polski
const carPartsTranslations: Record<string, string> = {
  'front_bumper': 'Przedni zderzak',
  'rear_bumper': 'Tylny zderzak',
  'hood': 'Maska',
  'roof': 'Dach',
  'trunk': 'Bagażnik',
  'front_left_door': 'Lewe przednie drzwi',
  'front_right_door': 'Prawe przednie drzwi',
  'rear_left_door': 'Lewe tylne drzwi',
  'rear_right_door': 'Prawe tylne drzwi',
  'front_left_fender': 'Lewy przedni błotnik',
  'front_right_fender': 'Prawy przedni błotnik',
  'rear_left_fender': 'Lewy tylny błotnik',
  'rear_right_fender': 'Prawy tylny błotnik',
  'front_left_wheel': 'Lewe przednie koło',
  'front_right_wheel': 'Prawe przednie koło',
  'rear_left_wheel': 'Lewe tylne koło',
  'rear_right_wheel': 'Prawe tylne koło',
  'front_windshield': 'Przednia szyba',
  'rear_windshield': 'Tylna szyba',
  'front_left_window': 'Lewe przednie okno',
  'front_right_window': 'Prawe przednie okno',
  'rear_left_window': 'Lewe tylne okno',
  'rear_right_window': 'Prawe tylne okno',
  'front_left_headlight': 'Lewy przedni reflektor',
  'front_right_headlight': 'Prawy przedni reflektor',
  'rear_left_taillight': 'Lewe tylne światło',
  'rear_right_taillight': 'Prawe tylne światło',
  'left_mirror': 'Lewe lusterko',
  'right_mirror': 'Prawe lusterko',
  'spare_tire': 'Koło zapasowe',
  'front_grille': 'Atrapa chłodnicy',
  'left_side_panel': 'Lewy panel boczny',
  'right_side_panel': 'Prawy panel boczny'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
          {/* Widok z boku (LEFT SIDE) */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-700 mb-4">LEFT SIDE</h4>
            <svg 
              viewBox="0 0 600 300" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white p-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Realistyczny kontur samochodu z boku - sedan */}
              <path 
                d="M50 200 C50 200 60 180 80 160 C100 140 130 120 170 110 C190 105 220 100 250 95 C280 92 320 90 360 90 C400 90 440 92 470 95 C500 100 520 105 540 110 C570 120 590 140 600 160 C600 170 600 180 600 190 C600 200 590 210 580 220 L580 240 C580 250 570 260 560 260 L540 260 C540 260 540 270 520 270 C500 270 480 260 480 260 L480 240 L480 200 L460 200 L380 200 L320 200 L240 200 L220 200 L220 240 L220 260 C220 260 200 270 180 270 C160 270 140 260 140 260 L120 260 C110 260 100 250 100 240 L100 220 C90 210 80 200 80 190 C80 180 80 170 80 160"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
              
              {/* Koła */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel"
              >
                <circle cx="180" cy="240" r="35" stroke="#333" strokeWidth="3"/>
                <circle cx="180" cy="240" r="25" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="180" cy="240" r="15" fill="none" stroke="#333" strokeWidth="1"/>
                <circle cx="180" cy="240" r="5" fill="#333"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_wheel')}
                onMouseEnter={() => handlePartHover('rear_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-wheel"
              >
                <circle cx="520" cy="240" r="35" stroke="#333" strokeWidth="3"/>
                <circle cx="520" cy="240" r="25" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="520" cy="240" r="15" fill="none" stroke="#333" strokeWidth="1"/>
                <circle cx="520" cy="240" r="5" fill="#333"/>
              </g>

              {/* Maska */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('hood') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('hood')}
                onMouseEnter={() => handlePartHover('hood')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-hood"
              >
                <path d="M80 160 C100 140 130 120 170 110 C190 105 220 100 250 95 L250 130 L200 130 L150 140 L120 150 L100 165 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Przednia szyba */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_windshield') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_windshield')}
                onMouseEnter={() => handlePartHover('front_windshield')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-windshield"
              >
                <path d="M250 95 L280 92 L320 90 L320 130 L250 130 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Dach */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('roof') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('roof')}
                onMouseEnter={() => handlePartHover('roof')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-roof"
              >
                <path d="M320 90 L360 90 L400 90 L440 92 L440 130 L320 130 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylna szyba */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_windshield') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_windshield')}
                onMouseEnter={() => handlePartHover('rear_windshield')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-windshield"
              >
                <path d="M440 92 L470 95 L470 130 L440 130 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Bagażnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('trunk') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('trunk')}
                onMouseEnter={() => handlePartHover('trunk')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-trunk"
              >
                <path d="M470 95 C500 100 520 105 540 110 C570 120 590 140 600 160 L580 165 L550 150 L500 140 L470 130 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe przednie drzwi */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_door')}
                onMouseEnter={() => handlePartHover('front_left_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-door"
              >
                <path d="M250 130 L350 130 L350 200 L250 200 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe tylne drzwi */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_door')}
                onMouseEnter={() => handlePartHover('rear_left_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-door"
              >
                <path d="M350 130 L440 130 L440 200 L350 200 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Przedni zderzak */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_bumper') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_bumper')}
                onMouseEnter={() => handlePartHover('front_bumper')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-bumper"
              >
                <path d="M50 200 C60 180 80 160 100 165 L120 150 L150 140 L150 200 L100 220 L80 200 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylny zderzak */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_bumper') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_bumper')}
                onMouseEnter={() => handlePartHover('rear_bumper')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-bumper"
              >
                <path d="M600 160 C600 170 600 180 600 190 C600 200 590 210 580 220 L550 200 L500 200 L500 140 L550 150 L580 165 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Reflektor przedni */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_headlight')}
                onMouseEnter={() => handlePartHover('front_left_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-headlight"
              >
                <ellipse cx="90" cy="180" rx="20" ry="15" stroke="#333" strokeWidth="2"/>
              </g>

              {/* Światło tylne */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_left_taillight')}
                onMouseEnter={() => handlePartHover('rear_left_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-taillight"
              >
                <rect x="580" y="165" width="15" height="25" className="fill-red-500" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lusterko */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('left_mirror') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('left_mirror')}
                onMouseEnter={() => handlePartHover('left_mirror')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-left-mirror"
              >
                <ellipse cx="240" cy="120" rx="8" ry="5" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Okna */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_window') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_window')}
                onMouseEnter={() => handlePartHover('front_left_window')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-window"
              >
                <path d="M270 110 L330 110 L330 125 L270 125 Z" stroke="#333" strokeWidth="1"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_window') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_window')}
                onMouseEnter={() => handlePartHover('rear_left_window')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-window"
              >
                <path d="M370 110 L420 110 L420 125 L370 125 Z" stroke="#333" strokeWidth="1"/>
              </g>
            </svg>
          </div>

          {/* Widok z góry (TOP VIEW) */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-700 mb-4">TOP</h4>
            <svg 
              viewBox="0 0 300 600" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white p-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Realistyczny kontur samochodu z góry */}
              <path 
                d="M120 50 L180 50 C200 50 220 60 230 80 L250 120 L250 180 L250 240 L250 300 L250 360 L250 420 L250 480 L230 520 C220 540 200 550 180 550 L120 550 C100 550 80 540 70 520 L50 480 L50 420 L50 360 L50 300 L50 240 L50 180 L50 120 L70 80 C80 60 100 50 120 50 Z"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />

              {/* Maska */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('hood') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('hood')}
                onMouseEnter={() => handlePartHover('hood')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-hood-top"
              >
                <path d="M120 50 L180 50 C200 50 220 60 230 80 L250 120 L50 120 L70 80 C80 60 100 50 120 50 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Przednia szyba */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_windshield') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_windshield')}
                onMouseEnter={() => handlePartHover('front_windshield')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-windshield-top"
              >
                <path d="M50 120 L250 120 L250 180 L50 180 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe drzwi przednie */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_door')}
                onMouseEnter={() => handlePartHover('front_left_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-door-top"
              >
                <path d="M30 180 L50 180 L50 280 L30 280 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawe drzwi przednie */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_door')}
                onMouseEnter={() => handlePartHover('front_right_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-door-top"
              >
                <path d="M250 180 L270 180 L270 280 L250 280 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe drzwi tylne */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_door')}
                onMouseEnter={() => handlePartHover('rear_left_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-door-top"
              >
                <path d="M30 320 L50 320 L50 420 L30 420 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawe drzwi tylne */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_door') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_right_door')}
                onMouseEnter={() => handlePartHover('rear_right_door')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-door-top"
              >
                <path d="M250 320 L270 320 L270 420 L250 420 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Dach środkowy */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('roof') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('roof')}
                onMouseEnter={() => handlePartHover('roof')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-roof-center"
              >
                <path d="M50 180 L250 180 L250 420 L50 420 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylna szyba */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_windshield') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_windshield')}
                onMouseEnter={() => handlePartHover('rear_windshield')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-windshield-top2"
              >
                <path d="M50 420 L250 420 L250 480 L50 480 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Bagażnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('trunk') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('trunk')}
                onMouseEnter={() => handlePartHover('trunk')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-trunk-top2"
              >
                <path d="M50 480 L250 480 L230 520 C220 540 200 550 180 550 L120 550 C100 550 80 540 70 520 L50 480 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Koła z góry */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel-top"
              >
                <circle cx="20" cy="140" r="18" stroke="#333" strokeWidth="2"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_wheel')}
                onMouseEnter={() => handlePartHover('front_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-wheel-top"
              >
                <circle cx="280" cy="140" r="18" stroke="#333" strokeWidth="2"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_wheel')}
                onMouseEnter={() => handlePartHover('rear_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-wheel-top"
              >
                <circle cx="20" cy="460" r="18" stroke="#333" strokeWidth="2"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_right_wheel')}
                onMouseEnter={() => handlePartHover('rear_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-wheel-top"
              >
                <circle cx="280" cy="460" r="18" stroke="#333" strokeWidth="2"/>
              </g>
            </svg>
          </div>

          {/* Widok z przodu (FRONT) */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-700 mb-4">FRONT</h4>
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white p-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z przodu */}
              <path 
                d="M80 250 L80 180 C80 160 90 140 110 130 L130 120 L150 110 L200 100 L250 110 L270 120 L290 130 C310 140 320 160 320 180 L320 250 C320 260 310 270 300 270 L280 270 L280 280 L120 280 L120 270 L100 270 C90 270 80 260 80 250 Z"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />

              {/* Maska */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('hood') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('hood')}
                onMouseEnter={() => handlePartHover('hood')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-hood-front"
              >
                <path d="M130 120 L150 110 L200 100 L250 110 L270 120 L270 150 L130 150 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Atrapa chłodnicy */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_grille') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_grille')}
                onMouseEnter={() => handlePartHover('front_grille')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-grille"
              >
                <path d="M130 150 L270 150 L270 200 L130 200 Z" stroke="#333" strokeWidth="1"/>
                {/* Linie kratki */}
                <line x1="140" y1="160" x2="260" y2="160" stroke="#333" strokeWidth="0.5"/>
                <line x1="140" y1="170" x2="260" y2="170" stroke="#333" strokeWidth="0.5"/>
                <line x1="140" y1="180" x2="260" y2="180" stroke="#333" strokeWidth="0.5"/>
                <line x1="140" y1="190" x2="260" y2="190" stroke="#333" strokeWidth="0.5"/>
              </g>

              {/* Przedni zderzak */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_bumper') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_bumper')}
                onMouseEnter={() => handlePartHover('front_bumper')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-bumper-front"
              >
                <path d="M110 130 C90 140 80 160 80 180 L80 250 C80 260 90 270 100 270 L120 270 L120 230 L280 230 L280 270 L300 270 C310 270 320 260 320 250 L320 180 C320 160 310 140 290 130 L280 200 L120 200 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Reflektory */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_headlight')}
                onMouseEnter={() => handlePartHover('front_left_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-headlight-front"
              >
                <ellipse cx="120" cy="170" rx="25" ry="15" stroke="#333" strokeWidth="2"/>
                <circle cx="120" cy="170" r="8" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_headlight')}
                onMouseEnter={() => handlePartHover('front_right_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-headlight-front"
              >
                <ellipse cx="280" cy="170" rx="25" ry="15" stroke="#333" strokeWidth="2"/>
                <circle cx="280" cy="170" r="8" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Koła z przodu */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel-front"
              >
                <circle cx="50" cy="240" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="50" cy="240" r="20" fill="none" stroke="#333" strokeWidth="2"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_wheel')}
                onMouseEnter={() => handlePartHover('front_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-wheel-front"
              >
                <circle cx="350" cy="240" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="350" cy="240" r="20" fill="none" stroke="#333" strokeWidth="2"/>
              </g>
            </svg>
          </div>

          {/* Widok z tyłu (REAR) */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-700 mb-4">REAR</h4>
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white p-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z tyłu - identyczny jak z przodu */}
              <path 
                d="M80 250 L80 180 C80 160 90 140 110 130 L130 120 L150 110 L200 100 L250 110 L270 120 L290 130 C310 140 320 160 320 180 L320 250 C320 260 310 270 300 270 L280 270 L280 280 L120 280 L120 270 L100 270 C90 270 80 260 80 250 Z"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />

              {/* Bagażnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('trunk') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('trunk')}
                onMouseEnter={() => handlePartHover('trunk')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-trunk-rear"
              >
                <path d="M130 120 L150 110 L200 100 L250 110 L270 120 L270 150 L130 150 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylny zderzak */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_bumper') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_bumper')}
                onMouseEnter={() => handlePartHover('rear_bumper')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-bumper-rear"
              >
                <path d="M110 130 C90 140 80 160 80 180 L80 250 C80 260 90 270 100 270 L120 270 L120 230 L280 230 L280 270 L300 270 C310 270 320 260 320 250 L320 180 C320 160 310 140 290 130 L280 200 L120 200 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylne światła */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_left_taillight')}
                onMouseEnter={() => handlePartHover('rear_left_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-taillight-rear"
              >
                <rect x="110" y="160" width="25" height="35" className="fill-red-500" stroke="#333" strokeWidth="1"/>
                <rect x="115" y="165" width="15" height="10" fill="white" stroke="#333" strokeWidth="0.5"/>
                <rect x="115" y="180" width="15" height="10" fill="white" stroke="#333" strokeWidth="0.5"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_right_taillight')}
                onMouseEnter={() => handlePartHover('rear_right_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-taillight-rear"
              >
                <rect x="265" y="160" width="25" height="35" className="fill-red-500" stroke="#333" strokeWidth="1"/>
                <rect x="270" y="165" width="15" height="10" fill="white" stroke="#333" strokeWidth="0.5"/>
                <rect x="270" y="180" width="15" height="10" fill="white" stroke="#333" strokeWidth="0.5"/>
              </g>

              {/* Koła z tyłu */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_wheel')}
                onMouseEnter={() => handlePartHover('rear_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-wheel-rear"
              >
                <circle cx="50" cy="240" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="50" cy="240" r="20" fill="none" stroke="#333" strokeWidth="2"/>
              </g>

              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_right_wheel')}
                onMouseEnter={() => handlePartHover('rear_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-wheel-rear"
              >
                <circle cx="350" cy="240" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="350" cy="240" r="20" fill="none" stroke="#333" strokeWidth="2"/>
              </g>
            </svg>
          </div>

          {/* Koło zapasowe */}
          <div className="text-center lg:col-span-2 2xl:col-span-1">
            <h4 className="font-semibold text-gray-700 mb-4">SPARE</h4>
            <svg 
              viewBox="0 0 200 200" 
              className="w-32 h-32 mx-auto border border-gray-300 rounded-lg bg-white p-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('spare_tire') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('spare_tire')}
                onMouseEnter={() => handlePartHover('spare_tire')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-spare-tire"
              >
                <circle cx="100" cy="100" r="80" stroke="#333" strokeWidth="4"/>
                <circle cx="100" cy="100" r="60" fill="none" stroke="#333" strokeWidth="3"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="100" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2"/>
                {/* Śruby koła - radialne */}
                <circle cx="100" cy="60" r="4" fill="#333"/>
                <circle cx="135" cy="75" r="4" fill="#333"/>
                <circle cx="140" cy="100" r="4" fill="#333"/>
                <circle cx="135" cy="125" r="4" fill="#333"/>
                <circle cx="100" cy="140" r="4" fill="#333"/>
                <circle cx="65" cy="125" r="4" fill="#333"/>
                <circle cx="60" cy="100" r="4" fill="#333"/>
                <circle cx="65" cy="75" r="4" fill="#333"/>
                {/* Środkowa śruba */}
                <circle cx="100" cy="100" r="6" fill="#333"/>
              </g>
            </svg>
          </div>
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