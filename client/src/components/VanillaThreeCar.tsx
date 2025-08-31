import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

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
  'wheel-front-left': 'Koło przednie lewe',
  'wheel-front-right': 'Koło przednie prawe',
  'wheel-rear-left': 'Koło tylne lewe',
  'wheel-rear-right': 'Koło tylne prawe'
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
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carPartsRef = useRef<Map<CarPartName, THREE.Mesh>>(new Map());
  const animationIdRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;

    const initThreeJS = () => {
      try {
        const container = containerRef.current!;
        const width = container.clientWidth;
        const height = container.clientHeight || 400;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f9ff);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(5, 3, 5);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;

        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Materials
        const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x4A90E2 });
        const glassMaterial = new THREE.MeshLambertMaterial({ 
          color: 0x87CEEB, 
          transparent: true, 
          opacity: 0.7 
        });

        // Car parts as simple geometric shapes
        const carParts = new Map<CarPartName, THREE.Mesh>();

        // Hood (maska)
        const hoodGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
        const hood = new THREE.Mesh(hoodGeometry, defaultMaterial.clone());
        hood.position.set(0, 0.5, -2.5);
        hood.userData = { partName: 'hood' };
        scene.add(hood);
        carParts.set('hood', hood);

        // Roof (dach)
        const roofGeometry = new THREE.BoxGeometry(2.5, 0.1, 3);
        const roof = new THREE.Mesh(roofGeometry, defaultMaterial.clone());
        roof.position.set(0, 1.2, 0);
        roof.userData = { partName: 'roof' };
        scene.add(roof);
        carParts.set('roof', roof);

        // Doors (drzwi)
        const doorGeometry = new THREE.BoxGeometry(0.1, 1, 1.5);
        
        const frontDoorLeft = new THREE.Mesh(doorGeometry, defaultMaterial.clone());
        frontDoorLeft.position.set(-1.3, 0.5, -0.5);
        frontDoorLeft.userData = { partName: 'front-door-left' };
        scene.add(frontDoorLeft);
        carParts.set('front-door-left', frontDoorLeft);

        const frontDoorRight = new THREE.Mesh(doorGeometry, defaultMaterial.clone());
        frontDoorRight.position.set(1.3, 0.5, -0.5);
        frontDoorRight.userData = { partName: 'front-door-right' };
        scene.add(frontDoorRight);
        carParts.set('front-door-right', frontDoorRight);

        const rearDoorLeft = new THREE.Mesh(doorGeometry, defaultMaterial.clone());
        rearDoorLeft.position.set(-1.3, 0.5, 1);
        rearDoorLeft.userData = { partName: 'rear-door-left' };
        scene.add(rearDoorLeft);
        carParts.set('rear-door-left', rearDoorLeft);

        const rearDoorRight = new THREE.Mesh(doorGeometry, defaultMaterial.clone());
        rearDoorRight.position.set(1.3, 0.5, 1);
        rearDoorRight.userData = { partName: 'rear-door-right' };
        scene.add(rearDoorRight);
        carParts.set('rear-door-right', rearDoorRight);

        // Bumpers (zderzaki)
        const bumperGeometry = new THREE.BoxGeometry(3, 0.3, 0.2);
        
        const frontBumper = new THREE.Mesh(bumperGeometry, defaultMaterial.clone());
        frontBumper.position.set(0, 0, -3.5);
        frontBumper.userData = { partName: 'front-bumper' };
        scene.add(frontBumper);
        carParts.set('front-bumper', frontBumper);

        const rearBumper = new THREE.Mesh(bumperGeometry, defaultMaterial.clone());
        rearBumper.position.set(0, 0, 3.5);
        rearBumper.userData = { partName: 'rear-bumper' };
        scene.add(rearBumper);
        carParts.set('rear-bumper', rearBumper);

        // Windshields (szyby)
        const windshieldGeometry = new THREE.BoxGeometry(2.2, 0.8, 0.05);
        
        const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial.clone());
        windshield.position.set(0, 0.8, -1.8);
        windshield.userData = { partName: 'windshield' };
        scene.add(windshield);
        carParts.set('windshield', windshield);

        const rearWindow = new THREE.Mesh(windshieldGeometry, glassMaterial.clone());
        rearWindow.position.set(0, 0.8, 1.8);
        rearWindow.userData = { partName: 'rear-window' };
        scene.add(rearWindow);
        carParts.set('rear-window', rearWindow);

        // Trunk (bagażnik)
        const trunkGeometry = new THREE.BoxGeometry(2, 0.1, 1);
        const trunk = new THREE.Mesh(trunkGeometry, defaultMaterial.clone());
        trunk.position.set(0, 0.5, 2.8);
        trunk.userData = { partName: 'trunk' };
        scene.add(trunk);
        carParts.set('trunk', trunk);

        // Main body (nadwozie) - nieinteraktywne
        const bodyGeometry = new THREE.BoxGeometry(2.5, 1.2, 5);
        const body = new THREE.Mesh(bodyGeometry, new THREE.MeshLambertMaterial({ 
          color: 0xE3F2FD, 
          transparent: true, 
          opacity: 0.3 
        }));
        body.position.set(0, 0, 0);
        scene.add(body);

        // Wheels (koła) - nieinteraktywne
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        const wheelPositions = [
          [-1.5, -0.5, -2], // front-left
          [1.5, -0.5, -2],  // front-right
          [-1.5, -0.5, 2],  // rear-left
          [1.5, -0.5, 2]    // rear-right
        ];

        wheelPositions.forEach(([x, y, z]) => {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.position.set(x, y, z);
          wheel.rotation.x = Math.PI / 2;
          scene.add(wheel);
        });

        carPartsRef.current = carParts;

        // Raycaster for clicking
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
          if (!cameraRef.current || !containerRef.current) return;
          
          const rect = container.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, cameraRef.current);
          
          const clickableObjects = Array.from(carParts.values());
          const intersects = raycaster.intersectObjects(clickableObjects);

          if (intersects.length > 0) {
            const clickedObject = intersects[0].object as THREE.Mesh;
            const partName = clickedObject.userData.partName;
            if (partName) {
              onPartSelect(partName);
            }
          }
        };

        container.addEventListener('click', onMouseClick);

        // Simple rotation controls
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const onMouseDown = (event: MouseEvent) => {
          isDragging = true;
          previousMousePosition.x = event.clientX;
          previousMousePosition.y = event.clientY;
        };

        const onMouseMove = (event: MouseEvent) => {
          if (!isDragging || !sceneRef.current) return;

          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
          };

          sceneRef.current.rotation.y += deltaMove.x * 0.01;
          sceneRef.current.rotation.x += deltaMove.y * 0.01;

          previousMousePosition.x = event.clientX;
          previousMousePosition.y = event.clientY;
        };

        const onMouseUp = () => {
          isDragging = false;
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);

        // Animation loop
        const animate = () => {
          if (!mounted || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
          
          animationIdRef.current = requestAnimationFrame(animate);
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        animate();
        setIsLoading(false);

        // Cleanup
        return () => {
          mounted = false;
          
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          
          container.removeEventListener('click', onMouseClick);
          container.removeEventListener('mousedown', onMouseDown);
          container.removeEventListener('mousemove', onMouseMove);
          container.removeEventListener('mouseup', onMouseUp);
          
          if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
            container.removeChild(rendererRef.current.domElement);
          }
          
          if (rendererRef.current) {
            rendererRef.current.dispose();
          }
        };

      } catch (err) {
        console.error('3D initialization error:', err);
        setError('Nie można załadować modelu 3D');
        setIsLoading(false);
      }
    };

    initThreeJS();

    return () => {
      mounted = false;
    };
  }, [onPartSelect]);

  // Update colors when selectedParts changes
  useEffect(() => {
    const carParts = carPartsRef.current;
    if (!carParts) return;

    carParts.forEach((mesh, partName) => {
      const isSelected = selectedParts.has(partName);
      if (mesh.material) {
        (mesh.material as THREE.MeshLambertMaterial).color.setHex(isSelected ? 0xFF4444 : 0x4A90E2);
        mesh.scale.setScalar(isSelected ? 1.1 : 1);
      }
    });
  }, [selectedParts]);

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-8 text-center ${className}`}>
        <p className="text-red-600 font-medium">❌ {error}</p>
        <p className="text-red-500 text-sm mt-2">Przełączamy na diagram 2D...</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full h-96 bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm relative"
        style={{ minHeight: '400px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Ładuję model 3D...</p>
            </div>
          </div>
        )}
        
        {/* Instrukcje 3D */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 max-w-xs shadow-sm z-10">
          <p className="font-semibold mb-1">🚗 Model 3D (Vanilla Three.js):</p>
          <p>• Kliknij na części by oznaczyć uszkodzenie</p>
          <p>• Przeciągnij by obrócić model</p>
          <p>• Czerwone = uszkodzone części</p>
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