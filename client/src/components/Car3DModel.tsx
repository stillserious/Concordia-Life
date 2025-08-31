import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

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
  'side-mirror-right': 'Lusterko prawe'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface CarPartProps {
  partName: CarPartName;
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  selected: boolean;
  onSelect: (partName: CarPartName) => void;
}

function CarPart({ partName, position, size, color = "#4A90E2", selected, onSelect }: CarPartProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const displayColor = selected ? "#FF4444" : hovered ? "#FFD700" : color;
  const scale = selected ? 1.1 : hovered ? 1.05 : 1;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
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
      data-testid={`car-part-${partName}`}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={displayColor}
        emissive={selected ? "#330000" : hovered ? "#333300" : "#000000"}
        emissiveIntensity={selected ? 0.3 : hovered ? 0.1 : 0}
        transparent
        opacity={0.9}
      />
      
      {/* Tooltip na hover */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black text-white px-2 py-1 rounded text-sm pointer-events-none whitespace-nowrap">
            {CAR_PARTS[partName]}
          </div>
        </Html>
      )}
    </mesh>
  );
}

interface Car3DViewerProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
}

function Car3DViewer({ selectedParts, onPartSelect }: Car3DViewerProps) {
  const { camera } = useThree();
  
  // Konfiguracja kamery
  useMemo(() => {
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group>
      {/* Oświetlenie */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1}
        castShadow
      />
      <directionalLight 
        position={[-10, 5, -10]} 
        intensity={0.5}
      />

      {/* Główne nadwozie samochodu */}
      <CarPart
        partName="roof"
        position={[0, 2.5, 0]}
        size={[3.5, 0.1, 6]}
        color="#4A90E2"
        selected={selectedParts.has('roof')}
        onSelect={onPartSelect}
      />

      {/* Pokrywa przednia (maska) */}
      <CarPart
        partName="hood"
        position={[0, 2, -2.8]}
        size={[3.2, 0.1, 1.2]}
        color="#4A90E2"
        selected={selectedParts.has('hood')}
        onSelect={onPartSelect}
      />

      {/* Zderzaki */}
      <CarPart
        partName="front-bumper"
        position={[0, 1.2, -3.7]}
        size={[3.8, 0.6, 0.3]}
        color="#333333"
        selected={selectedParts.has('front-bumper')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="rear-bumper"
        position={[0, 1.2, 3.7]}
        size={[3.8, 0.6, 0.3]}
        color="#333333"
        selected={selectedParts.has('rear-bumper')}
        onSelect={onPartSelect}
      />

      {/* Drzwi przednie */}
      <CarPart
        partName="front-door-left"
        position={[-2.1, 1.8, -0.8]}
        size={[0.1, 1.2, 1.5]}
        color="#4A90E2"
        selected={selectedParts.has('front-door-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="front-door-right"
        position={[2.1, 1.8, -0.8]}
        size={[0.1, 1.2, 1.5]}
        color="#4A90E2"
        selected={selectedParts.has('front-door-right')}
        onSelect={onPartSelect}
      />

      {/* Drzwi tylne */}
      <CarPart
        partName="rear-door-left"
        position={[-2.1, 1.8, 0.8]}
        size={[0.1, 1.2, 1.5]}
        color="#4A90E2"
        selected={selectedParts.has('rear-door-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="rear-door-right"
        position={[2.1, 1.8, 0.8]}
        size={[0.1, 1.2, 1.5]}
        color="#4A90E2"
        selected={selectedParts.has('rear-door-right')}
        onSelect={onPartSelect}
      />

      {/* Błotniki */}
      <CarPart
        partName="front-fender-left"
        position={[-1.9, 1.5, -2.2]}
        size={[0.3, 0.8, 1.0]}
        color="#4A90E2"
        selected={selectedParts.has('front-fender-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="front-fender-right"
        position={[1.9, 1.5, -2.2]}
        size={[0.3, 0.8, 1.0]}
        color="#4A90E2"
        selected={selectedParts.has('front-fender-right')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="rear-fender-left"
        position={[-1.9, 1.5, 2.2]}
        size={[0.3, 0.8, 1.0]}
        color="#4A90E2"
        selected={selectedParts.has('rear-fender-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="rear-fender-right"
        position={[1.9, 1.5, 2.2]}
        size={[0.3, 0.8, 1.0]}
        color="#4A90E2"
        selected={selectedParts.has('rear-fender-right')}
        onSelect={onPartSelect}
      />

      {/* Reflektory */}
      <CarPart
        partName="headlight-left"
        position={[-1.2, 1.8, -3.5]}
        size={[0.6, 0.4, 0.2]}
        color="#FFFFFF"
        selected={selectedParts.has('headlight-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="headlight-right"
        position={[1.2, 1.8, -3.5]}
        size={[0.6, 0.4, 0.2]}
        color="#FFFFFF"
        selected={selectedParts.has('headlight-right')}
        onSelect={onPartSelect}
      />

      {/* Lampy tylne */}
      <CarPart
        partName="taillight-left"
        position={[-1.2, 1.8, 3.5]}
        size={[0.4, 0.3, 0.2]}
        color="#FF0000"
        selected={selectedParts.has('taillight-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="taillight-right"
        position={[1.2, 1.8, 3.5]}
        size={[0.4, 0.3, 0.2]}
        color="#FF0000"
        selected={selectedParts.has('taillight-right')}
        onSelect={onPartSelect}
      />

      {/* Szyby */}
      <CarPart
        partName="windshield"
        position={[0, 2.3, -1.8]}
        size={[3.0, 1.0, 0.05]}
        color="#87CEEB"
        selected={selectedParts.has('windshield')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="rear-window"
        position={[0, 2.3, 1.8]}
        size={[3.0, 0.8, 0.05]}
        color="#87CEEB"
        selected={selectedParts.has('rear-window')}
        onSelect={onPartSelect}
      />

      {/* Lusterka */}
      <CarPart
        partName="side-mirror-left"
        position={[-2.4, 2.2, -1.2]}
        size={[0.2, 0.1, 0.3]}
        color="#333333"
        selected={selectedParts.has('side-mirror-left')}
        onSelect={onPartSelect}
      />

      <CarPart
        partName="side-mirror-right"
        position={[2.4, 2.2, -1.2]}
        size={[0.2, 0.1, 0.3]}
        color="#333333"
        selected={selectedParts.has('side-mirror-right')}
        onSelect={onPartSelect}
      />

      {/* Koła (nieinteraktywne) */}
      <group>
        {/* Koło przednie lewe */}
        <mesh position={[-1.6, 0.8, -2.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Koło przednie prawe */}
        <mesh position={[1.6, 0.8, -2.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Koło tylne lewe */}
        <mesh position={[-1.6, 0.8, 2.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Koło tylne prawe */}
        <mesh position={[1.6, 0.8, 2.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Podłoże */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

interface Car3DModelProps {
  selectedParts: Set<CarPartName>;
  onPartSelect: (partName: CarPartName) => void;
  className?: string;
}

export default function Car3DModel({ selectedParts, onPartSelect, className = "" }: Car3DModelProps) {
  return (
    <div className={`relative w-full h-96 bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        shadows
        style={{ background: 'linear-gradient(to bottom, #e0f7fa, #f0f9ff)' }}
      >
        <Car3DViewer selectedParts={selectedParts} onPartSelect={onPartSelect} />
        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={6}
          maxDistance={15}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Instrukcje */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 max-w-xs">
        <p className="font-semibold mb-1">Instrukcje:</p>
        <p>• Kliknij na część by oznaczyć uszkodzenie</p>
        <p>• Przeciągnij by obrócić model</p>
        <p>• Użyj kółka myszy by przybliżyć</p>
      </div>
    </div>
  );
}

export { CAR_PARTS };
export type { CarPartName };