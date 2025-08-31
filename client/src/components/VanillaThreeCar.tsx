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
    
    // Wyczyść poprzednią instancję żeby załadować nowy model
    if (globalThreeInstance && globalThreeInstance.parentNode) {
      console.log('Usuwam starą instancję modelu 3D...');
      try {
        globalThreeInstance.parentNode.removeChild(globalThreeInstance);
      } catch (e) {
        console.warn('Błąd usuwania:', e);
      }
      globalThreeInstance = null;
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
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      globalThreeInstance = renderer.domElement;

      container.appendChild(renderer.domElement);

      // Lepsze oświetlenie
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      // Główne światło
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(8, 12, 6);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      scene.add(mainLight);

      // Światło wypełniające
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
      fillLight.position.set(-5, 8, -3);
      scene.add(fillLight);

      // Światło odblaskowe
      const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
      backLight.position.set(0, 5, 8);
      scene.add(backLight);

      // Materiały samochodowe
      const carBodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4A90E2,
        shininess: 100,
        specular: 0x222222
      });
      const glassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x87CEEB, 
        transparent: true, 
        opacity: 0.6,
        shininess: 300,
        specular: 0xFFFFFF
      });
      const bumperMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2C3E50,
        shininess: 80
      });
      const wheelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1A1A1A,
        shininess: 10
      });

      // Car parts z realistycznymi kształtami
      const carParts = new Map<CarPartName, THREE.Mesh>();

      // Main body (główne nadwozie) - realistyczne proporcje sedana
      const bodyGeometry = new THREE.BoxGeometry(4.2, 1.0, 8, 4, 4, 4);
      const body = new THREE.Mesh(bodyGeometry, carBodyMaterial.clone());
      body.position.set(0, 0.3, 0);
      body.userData = { partName: 'body' };
      scene.add(body);
      carParts.set('body', body);
      
      // Kabina (greenhouse) - charakterystyczny kształt
      const cabinGeometry = new THREE.BoxGeometry(3.8, 1.2, 4.5, 3, 3, 3);
      const cabin = new THREE.Mesh(cabinGeometry, carBodyMaterial.clone());
      cabin.position.set(0, 1.1, 0.2);
      scene.add(cabin);

      // Hood (maska) - bardziej realistyczna
      const hoodGeometry = new THREE.BoxGeometry(3.8, 0.8, 2.4, 3, 2, 3);
      const hood = new THREE.Mesh(hoodGeometry, carBodyMaterial.clone());
      hood.position.set(0, 0.6, -2.8);
      hood.rotation.x = -0.08; // Lekkie nachylenie
      hood.userData = { partName: 'hood' };
      scene.add(hood);
      carParts.set('hood', hood);

      // Roof (dach) - płynna linia
      const roofGeometry = new THREE.BoxGeometry(3.6, 0.15, 4.2, 3, 1, 3);
      const roof = new THREE.Mesh(roofGeometry, carBodyMaterial.clone());
      roof.position.set(0, 1.7, 0.2);
      roof.userData = { partName: 'roof' };
      scene.add(roof);
      carParts.set('roof', roof);

      // Trunk (bagażnik) - bardziej realistyczny
      const trunkGeometry = new THREE.BoxGeometry(3.8, 0.7, 2.0, 3, 2, 3);
      const trunk = new THREE.Mesh(trunkGeometry, carBodyMaterial.clone());
      trunk.position.set(0, 0.6, 3.2);
      trunk.rotation.x = 0.05; // Lekkie nachylenie
      trunk.userData = { partName: 'trunk' };
      scene.add(trunk);
      carParts.set('trunk', trunk);

      // Doors (drzwi) - realistyczne pozycje
      const doorGeometry = new THREE.BoxGeometry(0.1, 1.4, 1.9, 1, 3, 3);
      
      const frontDoorLeft = new THREE.Mesh(doorGeometry, carBodyMaterial.clone());
      frontDoorLeft.position.set(-2.15, 0.7, -0.8);
      frontDoorLeft.userData = { partName: 'front-door-left' };
      scene.add(frontDoorLeft);
      carParts.set('front-door-left', frontDoorLeft);

      const frontDoorRight = new THREE.Mesh(doorGeometry, carBodyMaterial.clone());
      frontDoorRight.position.set(2.15, 0.7, -0.8);
      frontDoorRight.userData = { partName: 'front-door-right' };
      scene.add(frontDoorRight);
      carParts.set('front-door-right', frontDoorRight);

      const rearDoorLeft = new THREE.Mesh(doorGeometry, carBodyMaterial.clone());
      rearDoorLeft.position.set(-2.15, 0.7, 1.3);
      rearDoorLeft.userData = { partName: 'rear-door-left' };
      scene.add(rearDoorLeft);
      carParts.set('rear-door-left', rearDoorLeft);

      const rearDoorRight = new THREE.Mesh(doorGeometry, carBodyMaterial.clone());
      rearDoorRight.position.set(2.15, 0.7, 1.3);
      rearDoorRight.userData = { partName: 'rear-door-right' };
      scene.add(rearDoorRight);
      carParts.set('rear-door-right', rearDoorRight);

      // Bumpers (zderzaki) - zintegrowane z nadwoziem
      const frontBumperGeometry = new THREE.BoxGeometry(4.4, 0.5, 0.4, 4, 2, 1);
      const frontBumper = new THREE.Mesh(frontBumperGeometry, bumperMaterial.clone());
      frontBumper.position.set(0, 0, -4.2);
      frontBumper.userData = { partName: 'front-bumper' };
      scene.add(frontBumper);
      carParts.set('front-bumper', frontBumper);

      const rearBumperGeometry = new THREE.BoxGeometry(4.4, 0.5, 0.4, 4, 2, 1);
      const rearBumper = new THREE.Mesh(rearBumperGeometry, bumperMaterial.clone());
      rearBumper.position.set(0, 0, 4.2);
      rearBumper.userData = { partName: 'rear-bumper' };
      scene.add(rearBumper);
      carParts.set('rear-bumper', rearBumper);

      // Windshields (szyby) - realistyczne nachylenia jak w sedanie
      const frontWindshieldGeometry = new THREE.BoxGeometry(3.6, 1.1, 0.05, 3, 3, 1);
      const rearWindowGeometry = new THREE.BoxGeometry(3.4, 0.9, 0.05, 3, 3, 1);
      
      // Przednia szyba - mocno pochylona
      const windshield = new THREE.Mesh(frontWindshieldGeometry, glassMaterial.clone());
      windshield.position.set(0, 1.4, -1.5);
      windshield.rotation.x = 0.45; // Charakterystyczne nachylenie sedana
      windshield.userData = { partName: 'windshield' };
      scene.add(windshield);
      carParts.set('windshield', windshield);

      // Tylna szyba - średnie nachylenie
      const rearWindow = new THREE.Mesh(rearWindowGeometry, glassMaterial.clone());
      rearWindow.position.set(0, 1.4, 2.4);
      rearWindow.rotation.x = 0.25; // Typowe dla sedana
      rearWindow.userData = { partName: 'rear-window' };
      scene.add(rearWindow);
      carParts.set('rear-window', rearWindow);
      
      // Boczne szyby
      const sideWindowGeometry = new THREE.BoxGeometry(0.05, 0.8, 1.7, 1, 2, 2);
      
      const leftFrontWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial.clone());
      leftFrontWindow.position.set(-2.05, 1.4, -0.8);
      scene.add(leftFrontWindow);
      
      const rightFrontWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial.clone());
      rightFrontWindow.position.set(2.05, 1.4, -0.8);
      scene.add(rightFrontWindow);
      
      const leftRearWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial.clone());
      leftRearWindow.position.set(-2.05, 1.4, 1.3);
      scene.add(leftRearWindow);
      
      const rightRearWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial.clone());
      rightRearWindow.position.set(2.05, 1.4, 1.3);
      scene.add(rightRearWindow);

      // Koła (wheels) - bardziej realistyczne
      const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 20);
      const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.26, 16);
      const rimMaterial = new THREE.MeshPhongMaterial({ color: 0x777777, shininess: 200 });
      
      const wheelPositions = [
        { pos: [-1.8, -0.3, -2.5], name: 'wheel-front-left' },
        { pos: [1.8, -0.3, -2.5], name: 'wheel-front-right' },
        { pos: [-1.8, -0.3, 2.5], name: 'wheel-rear-left' },
        { pos: [1.8, -0.3, 2.5], name: 'wheel-rear-right' }
      ];

      wheelPositions.forEach(({ pos: [x, y, z], name }) => {
        // Opona
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(x, y, z);
        wheel.rotation.z = Math.PI / 2; // Obrót wokół osi Z zamiast X
        scene.add(wheel);
        
        // Felga
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.position.set(x, y, z);
        rim.rotation.z = Math.PI / 2; // Obrót wokół osi Z zamiast X
        scene.add(rim);
      });

      // Detale samochodu
      
      // Reflektory przednie - większe i bardziej realistyczne
      const headlightGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.15, 16);
      const headlightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFF0, 
        shininess: 300,
        emissive: 0x333300,
        transparent: true,
        opacity: 0.9
      });
      
      const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      leftHeadlight.position.set(-1.2, 0.4, -4.1);
      leftHeadlight.rotation.x = Math.PI / 2;
      scene.add(leftHeadlight);
      
      const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      rightHeadlight.position.set(1.2, 0.4, -4.1);
      rightHeadlight.rotation.x = Math.PI / 2;
      scene.add(rightHeadlight);

      // Światła tylne - charakterystyczne prostokąty
      const taillightGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.1, 2, 2, 1);
      const taillightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000, 
        shininess: 200,
        emissive: 0x440000,
        transparent: true,
        opacity: 0.9
      });
      
      const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
      leftTaillight.position.set(-1.4, 0.5, 4.1);
      scene.add(leftTaillight);
      
      const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
      rightTaillight.position.set(1.4, 0.5, 4.1);
      scene.add(rightTaillight);

      // Lusterka boczne - większe i lepiej umiejscowione
      const mirrorGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.3, 2, 2, 2);
      const mirrorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1e40af,
        shininess: 100
      });
      
      const leftMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
      leftMirror.position.set(-2.25, 1.0, -0.5);
      scene.add(leftMirror);
      
      const rightMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
      rightMirror.position.set(2.25, 1.0, -0.5);
      scene.add(rightMirror);

      // Klamki drzwi
      const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
      const handleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x888888,
        shininess: 200
      });
      
      [
        [-2.2, 0.6, -0.8], // lewe przednie
        [2.2, 0.6, -0.8],  // prawe przednie  
        [-2.2, 0.6, 1.3],  // lewe tylne
        [2.2, 0.6, 1.3]    // prawe tylne
      ].forEach(([x, y, z]) => {
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(x, y, z);
        handle.rotation.z = Math.PI / 2;
        scene.add(handle);
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
        (mesh.material as THREE.MeshPhongMaterial).color.setHex(isSelected ? 0xFF4444 : 0x4A90E2);
        mesh.scale.setScalar(isSelected ? 1.1 : 1);
        (mesh.material as THREE.MeshPhongMaterial).emissive.setHex(isSelected ? 0x440000 : 0x000000);
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