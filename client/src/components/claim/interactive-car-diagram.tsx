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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Widok z boku (LEFT SIDE) */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">STRONA LEWA</h4>
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z boku - sedan */}
              <path 
                d="M100 280 L120 260 L140 240 L180 210 L220 200 L280 190 L350 185 L450 185 L520 185 L580 190 L620 200 L660 210 L700 240 L720 260 L740 280 L740 300 L700 320 L680 320 L650 320 L600 320 L550 320 L450 320 L350 320 L250 320 L200 320 L150 320 L120 320 L100 300 Z"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
              
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
                <path d="M100 280 L140 240 L180 210 L180 320 L100 320 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M180 210 L220 200 L280 190 L320 195 L320 240 L180 240 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M320 185 L350 185 L350 240 L320 240 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M350 185 L520 185 L520 240 L350 240 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M520 185 L550 185 L550 240 L520 240 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M550 185 L580 190 L620 200 L620 240 L550 240 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M620 200 L660 210 L700 240 L740 280 L740 320 L620 320 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M320 240 L420 240 L420 320 L320 320 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M420 240 L520 240 L520 320 L420 320 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewy przedni błotnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_fender') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_fender')}
                onMouseEnter={() => handlePartHover('front_left_fender')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-fender"
              >
                <path d="M180 240 L320 240 L320 320 L180 320 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewy tylny błotnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_fender') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_fender')}
                onMouseEnter={() => handlePartHover('rear_left_fender')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-fender"
              >
                <path d="M520 240 L620 240 L620 320 L520 320 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe przednie koło */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel"
              >
                <circle cx="250" cy="320" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="250" cy="320" r="20" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="250" cy="320" r="10" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe tylne koło */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_wheel')}
                onMouseEnter={() => handlePartHover('rear_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-wheel"
              >
                <circle cx="570" cy="320" r="30" stroke="#333" strokeWidth="3"/>
                <circle cx="570" cy="320" r="20" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="570" cy="320" r="10" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewy przedni reflektor */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_headlight')}
                onMouseEnter={() => handlePartHover('front_left_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-headlight"
              >
                <ellipse cx="150" cy="250" rx="15" ry="25" stroke="#333" strokeWidth="2"/>
              </g>

              {/* Lewe tylne światło */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_left_taillight')}
                onMouseEnter={() => handlePartHover('rear_left_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-taillight"
              >
                <rect x="680" y="235" width="20" height="30" className="fill-red-500" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe lusterko */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('left_mirror') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('left_mirror')}
                onMouseEnter={() => handlePartHover('left_mirror')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-left-mirror"
              >
                <ellipse cx="305" cy="220" rx="12" ry="8" stroke="#333" strokeWidth="1"/>
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
                <path d="M330 200 L400 200 L400 230 L330 230 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M430 200 L500 200 L500 230 L430 230 Z" stroke="#333" strokeWidth="1"/>
              </g>
            </svg>
          </div>

          {/* Widok z góry (TOP VIEW) */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">WIDOK Z GÓRY</h4>
            <svg 
              viewBox="0 0 400 800" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z góry */}
              <path 
                d="M150 100 L250 100 L280 120 L300 150 L300 200 L300 300 L300 400 L300 500 L300 600 L300 650 L280 680 L250 700 L150 700 L120 680 L100 650 L100 600 L100 500 L100 400 L100 300 L100 200 L100 150 L120 120 Z"
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
                <path d="M150 100 L250 100 L250 200 L150 200 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M150 200 L250 200 L250 250 L150 250 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Dach środkowy */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('roof') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('roof')}
                onMouseEnter={() => handlePartHover('roof')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-roof-top"
              >
                <path d="M150 250 L250 250 L250 550 L150 550 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Tylna szyba */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_windshield') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_windshield')}
                onMouseEnter={() => handlePartHover('rear_windshield')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-windshield-top"
              >
                <path d="M150 550 L250 550 L250 600 L150 600 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Bagażnik */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('trunk') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('trunk')}
                onMouseEnter={() => handlePartHover('trunk')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-trunk-top"
              >
                <path d="M150 600 L250 600 L250 700 L150 700 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M100 250 L150 250 L150 350 L100 350 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M100 350 L150 350 L150 450 L100 450 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M250 250 L300 250 L300 350 L250 350 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M250 350 L300 350 L300 450 L250 450 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Koła */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel-top"
              >
                <circle cx="80" cy="200" r="20" stroke="#333" strokeWidth="2"/>
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
                <circle cx="320" cy="200" r="20" stroke="#333" strokeWidth="2"/>
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
                <circle cx="80" cy="600" r="20" stroke="#333" strokeWidth="2"/>
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
                <circle cx="320" cy="600" r="20" stroke="#333" strokeWidth="2"/>
              </g>
            </svg>
          </div>

          {/* Widok z przodu (FRONT) */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">PRZÓD</h4>
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z przodu */}
              <path 
                d="M100 250 L100 150 L120 120 L150 100 L250 100 L280 120 L300 150 L300 250 L280 270 L250 280 L150 280 L120 270 Z"
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
                <path d="M150 100 L250 100 L250 150 L150 150 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M150 150 L250 150 L250 200 L150 200 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M120 200 L280 200 L280 250 L120 250 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewy przedni reflektor */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_headlight')}
                onMouseEnter={() => handlePartHover('front_left_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-headlight-front"
              >
                <ellipse cx="140" cy="175" rx="15" ry="20" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawy przedni reflektor */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_headlight') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_headlight')}
                onMouseEnter={() => handlePartHover('front_right_headlight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-headlight-front"
              >
                <ellipse cx="260" cy="175" rx="15" ry="20" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe koło przednie */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_left_wheel')}
                onMouseEnter={() => handlePartHover('front_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-left-wheel-front"
              >
                <circle cx="80" cy="220" r="25" stroke="#333" strokeWidth="2"/>
                <circle cx="80" cy="220" r="15" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawe koło przednie */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('front_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('front_right_wheel')}
                onMouseEnter={() => handlePartHover('front_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-front-right-wheel-front"
              >
                <circle cx="320" cy="220" r="25" stroke="#333" strokeWidth="2"/>
                <circle cx="320" cy="220" r="15" fill="none" stroke="#333" strokeWidth="1"/>
              </g>
            </svg>
          </div>

          {/* Widok z tyłu (REAR) */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">TYŁ</h4>
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-auto border border-gray-300 rounded-lg bg-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kontur samochodu z tyłu */}
              <path 
                d="M100 250 L100 150 L120 120 L150 100 L250 100 L280 120 L300 150 L300 250 L280 270 L250 280 L150 280 L120 270 Z"
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
                <path d="M150 100 L250 100 L250 150 L150 150 Z" stroke="#333" strokeWidth="1"/>
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
                <path d="M120 200 L280 200 L280 250 L120 250 Z" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe tylne światło */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_left_taillight')}
                onMouseEnter={() => handlePartHover('rear_left_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-taillight-rear"
              >
                <rect x="125" y="160" width="20" height="30" className="fill-red-500" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawe tylne światło */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_taillight') ? 'fill-blue-400' : 'fill-red-400 hover:fill-red-300'
                }`}
                onClick={() => handlePartClick('rear_right_taillight')}
                onMouseEnter={() => handlePartHover('rear_right_taillight')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-taillight-rear"
              >
                <rect x="255" y="160" width="20" height="30" className="fill-red-500" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Lewe koło tylne */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_left_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_left_wheel')}
                onMouseEnter={() => handlePartHover('rear_left_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-left-wheel-rear"
              >
                <circle cx="80" cy="220" r="25" stroke="#333" strokeWidth="2"/>
                <circle cx="80" cy="220" r="15" fill="none" stroke="#333" strokeWidth="1"/>
              </g>

              {/* Prawe koło tylne */}
              <g 
                className={`cursor-pointer transition-colors ${
                  isPartSelected('rear_right_wheel') ? 'fill-blue-400' : 'fill-white hover:fill-blue-200'
                }`}
                onClick={() => handlePartClick('rear_right_wheel')}
                onMouseEnter={() => handlePartHover('rear_right_wheel')}
                onMouseLeave={() => handlePartHover(null)}
                data-testid="car-part-rear-right-wheel-rear"
              >
                <circle cx="320" cy="220" r="25" stroke="#333" strokeWidth="2"/>
                <circle cx="320" cy="220" r="15" fill="none" stroke="#333" strokeWidth="1"/>
              </g>
            </svg>
          </div>

          {/* Koło zapasowe */}
          <div className="text-center lg:col-span-2">
            <h4 className="font-medium text-gray-700 mb-4">KOŁO ZAPASOWE</h4>
            <svg 
              viewBox="0 0 200 200" 
              className="w-32 h-32 mx-auto border border-gray-300 rounded-lg bg-white"
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
                <circle cx="100" cy="100" r="60" stroke="#333" strokeWidth="3"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2"/>
                <circle cx="100" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2"/>
                {/* Śruby koła */}
                <circle cx="100" cy="70" r="3" fill="#333"/>
                <circle cx="130" cy="100" r="3" fill="#333"/>
                <circle cx="100" cy="130" r="3" fill="#333"/>
                <circle cx="70" cy="100" r="3" fill="#333"/>
                <circle cx="115" cy="85" r="3" fill="#333"/>
                <circle cx="115" cy="115" r="3" fill="#333"/>
                <circle cx="85" cy="115" r="3" fill="#333"/>
                <circle cx="85" cy="85" r="3" fill="#333"/>
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