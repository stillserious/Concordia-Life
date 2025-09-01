import { useState, useEffect } from "react";
import professionalCarDiagram from "../assets/professional-car-diagram.svg";

// Profesjonalne nazwy części samochodu (68 części)
const CAR_PARTS = {
  'FRONT_BUMPER': 'Zderzak przedni',
  'FRONT_NUMBER_PLATE': 'Tablica rejestracyjna przednia',
  'FRONT_NEAR_SIDE_HEADLAMP': 'Reflektor przedni lewy',
  'FRONT_GRILL': 'Atrapa chłodnicy',
  'FRONT_OFF_SIDE_HEADLAMP': 'Reflektor przedni prawy',
  'FRONT_PANEL': 'Panel przedni',
  'REAR_BUMPER': 'Zderzak tylny',
  'REAR_PANEL': 'Panel tylny',
  'REAR_NUMBER_PLATE': 'Tablica rejestracyjna tylna',
  'REAR_OFF_SIDE_LIGHT': 'Światło tylne prawe',
  'REAR_NEAR_SIDE_LIGHT': 'Światło tylne lewe',
  'REAR_NEAR_SIDE_EXHAUST': 'Rura wydechowa lewa',
  'REAR_OFF_SIDE_EXHAUST': 'Rura wydechowa prawa',
  'NEAR_SIDE_REAR_PANEL': 'Panel tylny lewy',
  'NEAR_SIDE_FRONT_PANEL': 'Panel przedni lewy',
  'NEAR_SIDE_DRIVER_DOOR': 'Drzwi kierowcy lewe',
  'NEAR_SIDE_DRIVER_WINDOW': 'Szyba kierowcy lewa',
  'NEAR_SIDE_PASSENGER_DOOR': 'Drzwi pasażera lewe',
  'NEAR_SIDE_SIDE_WINDOW': 'Szyba boczna lewa',
  'NEAR_SIDE_FRONT_BUMPER': 'Zderzak przedni lewy',
  'NEAR_SIDE_REAR_BUMPER': 'Zderzak tylny lewy',
  'NEAR_SIDE_PASSENGER_WINDOW': 'Szyba pasażera lewa',
  'NEAR_SIDE_FRONT_HEADLAMP': 'Reflektor przedni lewy',
  'NEAR_SIDE_REAR_HEADLAMP': 'Reflektor tylny lewy',
  'NEAR_SIDE_FUEL_CAP': 'Wlew paliwa lewy',
  'NEAR_SIDE_WING_MIRROR': 'Lusterko boczne lewe',
  'NEAR_SIDE_FRONT_TYPE': 'Opona przednia lewa',
  'NEAR_SIDE_FRONT_WHEEL': 'Koło przednie lewe',
  'NEAR_SIDE_REAR_WHEEL': 'Koło tylne lewe',
  'NEAR_SIDE_BODY_TRIM': 'Listwka boczna lewa',
  'NEAR_SIDE_UNDER_TRIM': 'Listwka dolna lewa',
  'OFF_SIDE_REAR_PANEL': 'Panel tylny prawy',
  'OFF_SIDE_FRONT_PANEL': 'Panel przedni prawy',
  'OFF_SIDE_DRIVER_DOOR': 'Drzwi kierowcy prawe',
  'OFF_SIDE_DRIVER_WINDOW': 'Szyba kierowcy prawa',
  'OFF_SIDE_PASSENGER_DOOR': 'Drzwi pasażera prawe',
  'OFF_SIDE_SIDE_WINDOW': 'Szyba boczna prawa',
  'OFF_SIDE_FRONT_BUMPER': 'Zderzak przedni prawy',
  'OFF_SIDE_REAR_BUMPER': 'Zderzak tylny prawy',
  'OFF_SIDE_PASSENGER_WINDOW': 'Szyba pasażera prawa',
  'OFF_SIDE_FRONT_HEADLAMP': 'Reflektor przedni prawy',
  'OFF_SIDE_REAR_HEADLAMP': 'Reflektor tylny prawy',
  'OFF_SIDE_FUEL_CAP': 'Wlew paliwa prawy',
  'OFF_SIDE_WING_MIRROR': 'Lusterko boczne prawe',
  'OFF_SIDE_FRONT_TYRE': 'Opona przednia prawa',
  'OFF_SIDE_FRONT_WHEEL': 'Koło przednie prawe',
  'OFF_SIDE_REAR_WHEEL': 'Koło tylne prawe',
  'OFF_SIDE_BODY_TRIM': 'Listwka boczna prawa',
  'OFF_SIDE_UNDER_TRIM': 'Listwka dolna prawa',
  'FRONT_ROOF_PANEL': 'Panel dachu przedni',
  'FRONT_WINDSCREEN': 'Szyba przednia',
  'FRONT_BONNET': 'Maska',
  'FRONT_NEAR_SIDE_FOG_LIGHT': 'Przeciwmgielne lewe',
  'FRONT_OFF_SIDE_FOG_LIGHT': 'Przeciwmgielne prawe'
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
  const [svgContent, setSvgContent] = useState<string>('');
  const [tooltip, setTooltip] = useState<{visible: boolean, x: number, y: number, text: string}>({
    visible: false, x: 0, y: 0, text: ''
  });

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  useEffect(() => {
    // Załaduj SVG
    fetch(professionalCarDiagram)
      .then(response => response.text())
      .then(content => {
        setSvgContent(content);
      });
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    // Dodaj event listenery dla wszystkich części samochodu
    const carParts = document.querySelectorAll('.car-part');
    
    const handleClick = (event: Event) => {
      const target = event.target as SVGElement;
      const partId = target.id as CarPartName;
      if (partId && CAR_PARTS[partId]) {
        handlePartClick(partId);
      }
    };

    const handleMouseEnter = (event: Event) => {
      const target = event.target as SVGElement;
      const partId = target.id as CarPartName;
      if (partId && CAR_PARTS[partId]) {
        const rect = target.getBoundingClientRect();
        setTooltip({
          visible: true,
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
          text: CAR_PARTS[partId]
        });
      }
    };

    const handleMouseLeave = () => {
      setTooltip(prev => ({ ...prev, visible: false }));
    };

    carParts.forEach(part => {
      part.addEventListener('click', handleClick);
      part.addEventListener('mouseenter', handleMouseEnter);
      part.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      carParts.forEach(part => {
        part.removeEventListener('click', handleClick);
        part.removeEventListener('mouseenter', handleMouseEnter);
        part.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [svgContent, selectedParts]);

  useEffect(() => {
    // Aktualizuj klasy CSS dla zaznaczonych części
    const carParts = document.querySelectorAll('.car-part');
    carParts.forEach(part => {
      const partId = (part as SVGElement).id as CarPartName;
      if (selectedParts.has(partId)) {
        part.classList.add('selected');
      } else {
        part.classList.remove('selected');
      }
    });
  }, [selectedParts, svgContent]);

  return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
          <div 
            className="relative"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          
          {/* Tooltip */}
          {tooltip.visible && (
            <div 
              className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
              style={{
                left: tooltip.x - 60,
                top: tooltip.y - 40,
                transform: 'translateX(-50%)'
              }}
            >
              {tooltip.text}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>

        {/* Lista zaznaczonych części */}
        <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Zaznaczone uszkodzenia
          </h4>
          
          {selectedParts.size === 0 ? (
            <p className="text-gray-500 text-sm italic">
              Kliknij znaczniki na modelu samochodu, aby zaznaczyć uszkodzone części
            </p>
          ) : (
            <div className="space-y-2">
              {Array.from(selectedParts).map((partName, index) => (
                <div 
                  key={partName}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="font-medium text-red-800">
                      {CAR_PARTS[partName]}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePartClick(partName)}
                    className="text-red-600 hover:text-red-800 font-bold text-lg px-2"
                    data-testid={`remove-part-${partName}`}
                    title="Usuń zaznaczenie"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Łącznie zaznaczonych części: <strong className="text-red-600">{selectedParts.size}</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export { CAR_PARTS };
export type { CarPartName };