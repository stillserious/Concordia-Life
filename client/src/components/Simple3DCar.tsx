import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'hood': 'Pokrywa przednia',
  'front-bumper': 'Zderzak przedni',
  'front-door-left': 'Drzwi przednie lewe',
  'front-door-right': 'Drzwi przednie prawe',
  'rear-door-left': 'Drzwi tylne lewe',
  'rear-door-right': 'Drzwi tylne prawe',
  'roof': 'Dach',
  'rear-bumper': 'Zderzak tylny',
  'windshield': 'Szyba przednia',
  'rear-window': 'Szyba tylna'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface CarPartProps {
  partName: CarPartName;
  position: [number, number, number];
  args: [number, number, number];
  selected: boolean;
  onSelect: (partName: CarPartName) => void;
  color?: string;
}

function CarPart({ partName, position, args, selected, onSelect, color = "#4A90E2" }: CarPartProps) {
  const [hovered, setHovered] = useState(false);
  
  const displayColor = selected ? "#FF4444" : hovered ? "#FFD700" : color;

  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(partName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      scale={selected ? 1.1 : hovered ? 1.05 : 1}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={displayColor}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Car3DScene({ selectedParts, onPartSelect }: { 
  selectedParts: Set<CarPartName>; 
  onPartSelect: (partName: CarPartName) => void; 
}) {
  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />

      {/* Główne nadwozie */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 8]} />
        <meshStandardMaterial color="#E5E7EB" transparent opacity={0.3} />
      </mesh>

      {/* Części samochodu */}
      
      {/* Dach */}
      <CarPart
        partName="roof"
        position={[0, 1.2, 0]}
        args={[3.8, 0.1, 6]}
        selected={selectedParts.has('roof')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      {/* Pokrywa przednia */}
      <CarPart
        partName="hood"
        position={[0, 0.5, -3.5]}
        args={[3.5, 0.1, 1]}
        selected={selectedParts.has('hood')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      {/* Zderzaki */}
      <CarPart
        partName="front-bumper"
        position={[0, -0.2, -4.5]}
        args={[4, 0.6, 0.3]}
        selected={selectedParts.has('front-bumper')}
        onSelect={onPartSelect}
        color="#333333"
      />

      <CarPart
        partName="rear-bumper"
        position={[0, -0.2, 4.5]}
        args={[4, 0.6, 0.3]}
        selected={selectedParts.has('rear-bumper')}
        onSelect={onPartSelect}
        color="#333333"
      />

      {/* Drzwi */}
      <CarPart
        partName="front-door-left"
        position={[-2.2, 0.3, -1]}
        args={[0.1, 1.2, 2]}
        selected={selectedParts.has('front-door-left')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      <CarPart
        partName="front-door-right"
        position={[2.2, 0.3, -1]}
        args={[0.1, 1.2, 2]}
        selected={selectedParts.has('front-door-right')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      <CarPart
        partName="rear-door-left"
        position={[-2.2, 0.3, 1]}
        args={[0.1, 1.2, 2]}
        selected={selectedParts.has('rear-door-left')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      <CarPart
        partName="rear-door-right"
        position={[2.2, 0.3, 1]}
        args={[0.1, 1.2, 2]}
        selected={selectedParts.has('rear-door-right')}
        onSelect={onPartSelect}
        color="#4A90E2"
      />

      {/* Szyby */}
      <CarPart
        partName="windshield"
        position={[0, 0.8, -2.5]}
        args={[3.2, 1, 0.05]}
        selected={selectedParts.has('windshield')}
        onSelect={onPartSelect}
        color="#87CEEB"
      />

      <CarPart
        partName="rear-window"
        position={[0, 0.8, 2.5]}
        args={[3.2, 0.8, 0.05]}
        selected={selectedParts.has('rear-window')}
        onSelect={onPartSelect}
        color="#87CEEB"
      />

      {/* Koła (nieinteraktywne) */}
      <mesh position={[-1.8, -0.8, -2.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[1.8, -0.8, -2.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[-1.8, -0.8, 2.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[1.8, -0.8, 2.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Podłoże */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
      </mesh>
    </>
  );
}

interface Simple3DCarProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function Simple3DCar({ selectedParts, onPartSelect, className = "" }: Simple3DCarProps) {
  return (
    <div className={`relative w-full h-96 bg-gradient-to-b from-sky-100 to-white rounded-lg overflow-hidden border shadow-sm ${className}`}>
      <Canvas
        camera={{ position: [6, 4, 6], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)' }}
      >
        <Car3DScene selectedParts={selectedParts} onPartSelect={onPartSelect} />
        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={8}
          maxDistance={20}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Instrukcje */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 max-w-xs shadow-sm">
        <p className="font-semibold mb-1">🚗 Model 3D:</p>
        <p>• Kliknij na części by oznaczyć uszkodzenie</p>
        <p>• Przeciągnij by obrócić model</p>
        <p>• Kółko myszy = przybliż/oddal</p>
      </div>
    </div>
  );
}

export { CAR_PARTS };
export type { CarPartName };