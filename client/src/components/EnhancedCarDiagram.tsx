import { useState, useEffect } from "react";

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
  'front-fender-left': 'Błotnik przedni lewy',
  'front-fender-right': 'Błotnik przedni prawy',
  'rear-fender-left': 'Błotnik tylny lewy',
  'rear-fender-right': 'Błotnik tylny prawy',
  'headlight-left': 'Reflektor przedni lewy',
  'headlight-right': 'Reflektor przedni prawy',
  'taillight-left': 'Lampa tylna lewa',
  'taillight-right': 'Lampa tylna prawa',
  'windshield': 'Szyba przednia',
  'rear-window': 'Szyba tylna',
  'side-mirror-left': 'Lusterko lewe',
  'side-mirror-right': 'Lusterko prawe',
  'wheel-front-left': 'Koło przednie lewe',
  'wheel-front-right': 'Koło przednie prawe',
  'wheel-rear-left': 'Koło tylne lewe',
  'wheel-rear-right': 'Koło tylne prawe'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface CarPartProps {
  id: CarPartName;
  path?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  r?: number;
  points?: string;
  selected: boolean;
  onSelect: (partName: CarPartName) => void;
  baseColor?: string;
  type?: 'rect' | 'circle' | 'polygon' | 'path';
}

function CarPart({ 
  id, 
  path, 
  x, 
  y, 
  width, 
  height, 
  cx, 
  cy, 
  r, 
  points,
  selected, 
  onSelect, 
  baseColor = "#E5E7EB",
  type = "rect"
}: CarPartProps) {
  const [hovered, setHovered] = useState(false);

  const getColor = () => {
    if (selected) return "#EF4444"; // Czerwony dla uszkodzeń
    if (hovered) return "#FCD34D"; // Żółty na hover
    return baseColor;
  };

  const commonProps = {
    fill: getColor(),
    stroke: "#374151",
    strokeWidth: hovered ? 3 : 1,
    className: `
      cursor-pointer transition-all duration-300 ease-in-out
      ${hovered ? 'drop-shadow-lg filter brightness-110' : ''}
      ${selected ? 'animate-pulse' : ''}
    `,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(id);
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    'data-testid': `car-part-${id}`
  };

  if (type === 'circle') {
    return <circle cx={cx} cy={cy} r={r} {...commonProps} />;
  }
  
  if (type === 'polygon') {
    return <polygon points={points} {...commonProps} />;
  }
  
  if (type === 'path') {
    return <path d={path} {...commonProps} />;
  }

  return <rect x={x} y={y} width={width} height={height} {...commonProps} />;
}

interface EnhancedCarDiagramProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function EnhancedCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: EnhancedCarDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<CarPartName | null>(null);

  return (
    <div className={`relative w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden border shadow-lg ${className}`}>
      {/* Tooltip */}
      {hoveredPart && (
        <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-200">
          {CAR_PARTS[hoveredPart]}
        </div>
      )}

      {/* Instrukcje */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 max-w-xs shadow-sm">
        <p className="font-semibold mb-1">💡 Instrukcje:</p>
        <p>• Kliknij na części by oznaczyć uszkodzenie</p>
        <p>• Części uszkodzone są czerwone</p>
        <p>• Najedź myszką na część by zobaczyć nazwę</p>
      </div>

      {/* SVG Diagram */}
      <svg 
        viewBox="0 0 1000 600" 
        className="w-full h-auto"
        style={{ minHeight: '400px' }}
        onMouseMove={(e) => {
          const target = e.target as SVGElement;
          if (target.dataset.testid?.startsWith('car-part-')) {
            const partId = target.dataset.testid.replace('car-part-', '') as CarPartName;
            setHoveredPart(partId);
          } else {
            setHoveredPart(null);
          }
        }}
        onMouseLeave={() => setHoveredPart(null)}
      >
        {/* Cień samochodu */}
        <ellipse 
          cx="500" 
          cy="580" 
          rx="400" 
          ry="15" 
          fill="rgba(0,0,0,0.2)" 
          className="transition-all duration-300"
        />

        {/* Główne nadwozie */}
        <path
          d="M 200 300 L 800 300 L 780 200 L 220 200 Z"
          fill="#F3F4F6"
          stroke="#374151"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Dach */}
        <CarPart
          id="roof"
          x={250}
          y={200}
          width={500}
          height={50}
          selected={selectedParts.has('roof')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
        />

        {/* Pokrywa przednia (maska) */}
        <CarPart
          id="hood"
          path="M 150 300 L 200 300 L 220 200 L 170 200 Q 150 220 150 250 Z"
          selected={selectedParts.has('hood')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
          type="path"
        />

        {/* Zderzak przedni */}
        <CarPart
          id="front-bumper"
          x={100}
          y={280}
          width={60}
          height={40}
          selected={selectedParts.has('front-bumper')}
          onSelect={onPartSelect}
          baseColor="#374151"
        />

        {/* Zderzak tylny */}
        <CarPart
          id="rear-bumper"
          x={840}
          y={280}
          width={60}
          height={40}
          selected={selectedParts.has('rear-bumper')}
          onSelect={onPartSelect}
          baseColor="#374151"
        />

        {/* Drzwi przednie lewe */}
        <CarPart
          id="front-door-left"
          x={200}
          y={250}
          width={100}
          height={120}
          selected={selectedParts.has('front-door-left')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
        />

        {/* Drzwi tylne lewe */}
        <CarPart
          id="rear-door-left"
          x={300}
          y={250}
          width={100}
          height={120}
          selected={selectedParts.has('rear-door-left')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
        />

        {/* Drzwi przednie prawe */}
        <CarPart
          id="front-door-right"
          x={600}
          y={250}
          width={100}
          height={120}
          selected={selectedParts.has('front-door-right')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
        />

        {/* Drzwi tylne prawe */}
        <CarPart
          id="rear-door-right"
          x={700}
          y={250}
          width={100}
          height={120}
          selected={selectedParts.has('rear-door-right')}
          onSelect={onPartSelect}
          baseColor="#E5E7EB"
        />

        {/* Błotniki */}
        <CarPart
          id="front-fender-left"
          x={170}
          y={370}
          width={50}
          height={30}
          selected={selectedParts.has('front-fender-left')}
          onSelect={onPartSelect}
          baseColor="#D1D5DB"
        />

        <CarPart
          id="rear-fender-left"
          x={380}
          y={370}
          width={50}
          height={30}
          selected={selectedParts.has('rear-fender-left')}
          onSelect={onPartSelect}
          baseColor="#D1D5DB"
        />

        <CarPart
          id="front-fender-right"
          x={570}
          y={370}
          width={50}
          height={30}
          selected={selectedParts.has('front-fender-right')}
          onSelect={onPartSelect}
          baseColor="#D1D5DB"
        />

        <CarPart
          id="rear-fender-right"
          x={780}
          y={370}
          width={50}
          height={30}
          selected={selectedParts.has('rear-fender-right')}
          onSelect={onPartSelect}
          baseColor="#D1D5DB"
        />

        {/* Reflektory */}
        <CarPart
          id="headlight-left"
          cx={130}
          cy={260}
          r={20}
          selected={selectedParts.has('headlight-left')}
          onSelect={onPartSelect}
          baseColor="#F8FAFC"
          type="circle"
        />

        <CarPart
          id="headlight-right"
          cx={870}
          cy={260}
          r={20}
          selected={selectedParts.has('headlight-right')}
          onSelect={onPartSelect}
          baseColor="#F8FAFC"
          type="circle"
        />

        {/* Lampy tylne */}
        <CarPart
          id="taillight-left"
          cx={130}
          cy={320}
          r={15}
          selected={selectedParts.has('taillight-left')}
          onSelect={onPartSelect}
          baseColor="#FCA5A5"
          type="circle"
        />

        <CarPart
          id="taillight-right"
          cx={870}
          cy={320}
          r={15}
          selected={selectedParts.has('taillight-right')}
          onSelect={onPartSelect}
          baseColor="#FCA5A5"
          type="circle"
        />

        {/* Szyby */}
        <CarPart
          id="windshield"
          points="220,200 250,200 240,180 210,180"
          selected={selectedParts.has('windshield')}
          onSelect={onPartSelect}
          baseColor="#BFDBFE"
          type="polygon"
        />

        <CarPart
          id="rear-window"
          points="750,200 780,200 770,180 760,180"
          selected={selectedParts.has('rear-window')}
          onSelect={onPartSelect}
          baseColor="#BFDBFE"
          type="polygon"
        />

        {/* Lusterka */}
        <CarPart
          id="side-mirror-left"
          x={180}
          y={220}
          width={15}
          height={8}
          selected={selectedParts.has('side-mirror-left')}
          onSelect={onPartSelect}
          baseColor="#6B7280"
        />

        <CarPart
          id="side-mirror-right"
          x={805}
          y={220}
          width={15}
          height={8}
          selected={selectedParts.has('side-mirror-right')}
          onSelect={onPartSelect}
          baseColor="#6B7280"
        />

        {/* Koła */}
        <CarPart
          id="wheel-front-left"
          cx={195}
          cy={450}
          r={40}
          selected={selectedParts.has('wheel-front-left')}
          onSelect={onPartSelect}
          baseColor="#374151"
          type="circle"
        />

        <CarPart
          id="wheel-rear-left"
          cx={405}
          cy={450}
          r={40}
          selected={selectedParts.has('wheel-rear-left')}
          onSelect={onPartSelect}
          baseColor="#374151"
          type="circle"
        />

        <CarPart
          id="wheel-front-right"
          cx={595}
          cy={450}
          r={40}
          selected={selectedParts.has('wheel-front-right')}
          onSelect={onPartSelect}
          baseColor="#374151"
          type="circle"
        />

        <CarPart
          id="wheel-rear-right"
          cx={805}
          cy={450}
          r={40}
          selected={selectedParts.has('wheel-rear-right')}
          onSelect={onPartSelect}
          baseColor="#374151"
          type="circle"
        />

        {/* Ozdobny błysk dla lepszego efektu */}
        <defs>
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"rgba(255,255,255,0.3)", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"rgba(255,255,255,0)", stopOpacity:1}} />
          </linearGradient>
        </defs>
        <rect x="200" y="200" width="600" height="200" fill="url(#shine)" pointerEvents="none" />
      </svg>
    </div>
  );
}

export { CAR_PARTS };
export type { CarPartName };