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
  'rear-window': 'Szyba tylna'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

// Globalna zmienna do ochrony przed wielokrotnymi instancjami
let globalThreeInstance: HTMLCanvasElement | null = null;

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
  const carPartsRef = useRef<Map<CarPartName, THREE.Mesh>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Sprawdź czy już istnieje instancja
    if (globalThreeInstance && globalThreeInstance.parentNode) {
      console.log('Model 3D już istnieje - używam istniejący');
      setIsLoading(false);
      return;
    }

    console.log('Tworzę nowy model 3D...');

    try {
      const width = container.clientWidth || 800;
      const height = 400;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f9ff);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(5, 3, 5);
      camera.lookAt(0, 0, 0);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      globalThreeInstance = renderer.domElement;

      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);

      // Car parts
      const carParts = new Map<CarPartName, THREE.Mesh>();

      // Hood
      const hood = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 1.5),
        new THREE.MeshLambertMaterial({ color: 0x4A90E2 })
      );
      hood.position.set(0, 0.5, -2.5);
      hood.userData = { partName: 'hood' };
      scene.add(hood);
      carParts.set('hood', hood);

      // Roof
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.1, 3),
        new THREE.MeshLambertMaterial({ color: 0x4A90E2 })
      );
      roof.position.set(0, 1.2, 0);
      roof.userData = { partName: 'roof' };
      scene.add(roof);
      carParts.set('roof', roof);

      // Doors
      const doorGeometry = new THREE.BoxGeometry(0.1, 1, 1.5);
      
      ['front-door-left', 'front-door-right', 'rear-door-left', 'rear-door-right'].forEach((partName, index) => {
        const door = new THREE.Mesh(doorGeometry, new THREE.MeshLambertMaterial({ color: 0x4A90E2 }));
        const isLeft = partName.includes('left');
        const isFront = partName.includes('front');
        door.position.set(isLeft ? -1.3 : 1.3, 0.5, isFront ? -0.5 : 1);
        door.userData = { partName };
        scene.add(door);
        carParts.set(partName as CarPartName, door);
      });

      // Bumpers
      const frontBumper = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.3, 0.2),
        new THREE.MeshLambertMaterial({ color: 0x4A90E2 })
      );
      frontBumper.position.set(0, 0, -3.5);
      frontBumper.userData = { partName: 'front-bumper' };
      scene.add(frontBumper);
      carParts.set('front-bumper', frontBumper);

      const rearBumper = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.3, 0.2),
        new THREE.MeshLambertMaterial({ color: 0x4A90E2 })
      );
      rearBumper.position.set(0, 0, 3.5);
      rearBumper.userData = { partName: 'rear-bumper' };
      scene.add(rearBumper);
      carParts.set('rear-bumper', rearBumper);

      // Windshields
      const windshield = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.8, 0.05),
        new THREE.MeshLambertMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.7 })
      );
      windshield.position.set(0, 0.8, -1.8);
      windshield.userData = { partName: 'windshield' };
      scene.add(windshield);
      carParts.set('windshield', windshield);

      const rearWindow = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.8, 0.05),
        new THREE.MeshLambertMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.7 })
      );
      rearWindow.position.set(0, 0.8, 1.8);
      rearWindow.userData = { partName: 'rear-window' };
      scene.add(rearWindow);
      carParts.set('rear-window', rearWindow);

      // Trunk
      const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 1),
        new THREE.MeshLambertMaterial({ color: 0x4A90E2 })
      );
      trunk.position.set(0, 0.5, 2.8);
      trunk.userData = { partName: 'trunk' };
      scene.add(trunk);
      carParts.set('trunk', trunk);

      // Main body (nieinteraktywne)
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.2, 5),
        new THREE.MeshLambertMaterial({ color: 0xE3F2FD, transparent: true, opacity: 0.3 })
      );
      scene.add(body);

      // Wheels (nieinteraktywne)
      const wheelPositions = [[-1.5, -0.5, -2], [1.5, -0.5, -2], [-1.5, -0.5, 2], [1.5, -0.5, 2]];
      wheelPositions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16),
          new THREE.MeshLambertMaterial({ color: 0x333333 })
        );
        wheel.position.set(x, y, z);
        wheel.rotation.x = Math.PI / 2;
        scene.add(wheel);
      });

      carPartsRef.current = carParts;

      // Mouse interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseClick = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
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

      // Rotation controls
      let isDragging = false;
      let previousMouse = { x: 0, y: 0 };

      const onMouseDown = (event: MouseEvent) => {
        isDragging = true;
        previousMouse = { x: event.clientX, y: event.clientY };
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        
        const deltaX = event.clientX - previousMouse.x;
        const deltaY = event.clientY - previousMouse.y;

        scene.rotation.y += deltaX * 0.01;
        scene.rotation.x = Math.max(-0.5, Math.min(0.5, scene.rotation.x + deltaY * 0.01));

        previousMouse = { x: event.clientX, y: event.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener('click', onMouseClick);
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseup', onMouseUp);

      // Animation loop
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      setIsLoading(false);
      console.log('Model 3D gotowy!');

      return () => {
        console.log('Cleanup...');
        cancelAnimationFrame(animationId);
        container.removeEventListener('click', onMouseClick);
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseup', onMouseUp);
        
        if (globalThreeInstance && container.contains(globalThreeInstance)) {
          container.removeChild(globalThreeInstance);
        }
        globalThreeInstance = null;
        renderer.dispose();
      };

    } catch (err) {
      console.error('3D error:', err);
      setError('Błąd ładowania 3D');
      setIsLoading(false);
    }
  }, []); 

  // Update colors
  useEffect(() => {
    carPartsRef.current.forEach((mesh, partName) => {
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
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full h-96 bg-gradient-to-b from-sky-100 to-white rounded-lg border shadow-sm"
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
          <p className="font-semibold mb-1">🚗 Model 3D:</p>
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