import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mapowanie 68 części samochodu z angielskich nazw na polskie
const CAR_PARTS = {
  // Front parts
  'FRONT_BUMPER': 'Zderzak przedni',
  'FRONT_NUMBER_PLATE': 'Tablica rejestracyjna przednia',
  'FRONT_NEAR_SIDE_HEADLAMP': 'Reflektor przedni lewy',
  'FRONT_GRILL': 'Grill przedni',
  'FRONT_OFF_SIDE_HEADLAMP': 'Reflektor przedni prawy',
  'FRONT_PANEL': 'Panel przedni',
  'FRONT_BONNET': 'Maska',
  'FRONT_WINDSCREEN': 'Szyba przednia',
  'FRONT_ROOF_PANEL': 'Panel dachu przedni',
  'FRONT_DRIVER_WINDOW': 'Okno kierowcy przednie',
  'FRONT_DRIVER_SIDE_WINDOW': 'Okno boczne kierowcy przednie',
  'FRONT_PASSENGER_WINDOW': 'Okno pasażera przednie',
  'FRONT_PASSENGER_SIDE_WINDOW': 'Okno boczne pasażera przednie',
  'FRONT_NEAR_SIDE_PASSENGER_WINDOW': 'Okno pasażera lewe przednie',
  'FRONT_OFF_SIDE_PASSENGER_WINDOW': 'Okno pasażera prawe przednie',
  'FRONT_REAR_PANEL': 'Panel tylny przedni',
  'FRONT_REAR_WINDOW': 'Okno tylne przednie',
  'FRONT_DRIVER_PANEL': 'Panel kierowcy przedni',
  'FRONT_PASSENGER_PANEL': 'Panel pasażera przedni',
  'FRONT_DRIVER_BODY_PANEL': 'Panel nadwozia kierowcy przedni',
  'FRONT_PASSENGER_BODY_PANEL': 'Panel nadwozia pasażera przedni',

  // Rear parts
  'REAR_BUMPER': 'Zderzak tylny',
  'REAR_PANEL': 'Panel tylny',
  'REAR_NUMBER_PLATE': 'Tablica rejestracyjna tylna',
  'REAR_OFF_SIDE_LIGHT': 'Światło tylne prawe',
  'REAR_NEAR_SIDE_LIGHT': 'Światło tylne lewe',
  'REAR_NEAR_SIDE_EXHAUST': 'Wydech lewy',
  'REAR_OFF_SIDE_EXHAUST': 'Wydech prawy',

  // Near side (left side)
  'NEAR_SIDE_REAR_PANEL': 'Panel tylny lewy',
  'NEAR_SIDE_FRONT_PANEL': 'Panel przedni lewy',
  'NEAR_SIDE_DRIVER_DOOR': 'Drzwi kierowcy lewe',
  'NEAR_SIDE_DRIVER_WINDOW': 'Okno kierowcy lewe',
  'NEAR_SIDE_PASSENGER_DOOR': 'Drzwi pasażera lewe',
  'NEAR_SIDE_SIDE_WINDOW': 'Okno boczne lewe',
  'NEAR_SIDE_FRONT_BUMPER': 'Zderzak przedni lewy',
  'NEAR_SIDE_REAR_BUMPER': 'Zderzak tylny lewy',
  'NEAR_SIDE_REAR_WINDOW': 'Okno tylne lewe',
  'NEAR_SIDE_PASSENGER_WINDOW': 'Okno pasażera lewe',
  'NEAR_SIDE_FRONT_HEADLAMP': 'Reflektor przedni lewy',
  'NEAR_SIDE_REAR_HEADLAMP': 'Światło tylne lewe',
  'NEAR_SIDE_FUEL_CAP': 'Wlew paliwa lewy',
  'NEAR_SIDE_WING_MIRROR': 'Lusterko lewe',
  'NEAR_SIDE_FRONT_TYPE': 'Opona przednia lewa',
  'NEAR_SIDE_FRONT_WHEEL': 'Koło przednie lewe',
  'NEAR_SIDE_REAR_TYPE': 'Opona tylna lewa',
  'NEAR_SIDE_REAR_WHEEL': 'Koło tylne lewe',
  'NEAR_SIDE_BODY_TRIM': 'Listwa nadwozia lewa',
  'NEAR_SIDE_UNDER_TRIM': 'Listwa dolna lewa',

  // Off side (right side)
  'OFF_SIDE_REAR_PANEL': 'Panel tylny prawy',
  'OFF_SIDE_FRONT_PANEL': 'Panel przedni prawy',
  'OFF_SIDE_DRIVER_DOOR': 'Drzwi kierowcy prawe',
  'OFF_SIDE_DRIVER_WINDOW': 'Okno kierowcy prawe',
  'OFF_SIDE_PASSENGER_DOOR': 'Drzwi pasażera prawe',
  'OFF_SIDE_SIDE_WINDOW': 'Okno boczne prawe',
  'OFF_SIDE_FRONT_BUMPER': 'Zderzak przedni prawy',
  'OFF_SIDE_REAR_BUMPER': 'Zderzak tylny prawy',
  'OFF_SIDE_REAR_WINDOW': 'Okno tylne prawe',
  'OFF_SIDE_PASSENGER_WINDOW': 'Okno pasażera prawe',
  'OFF_SIDE_FRONT_HEADLAMP': 'Reflektor przedni prawy',
  'OFF_SIDE_REAR_HEADLAMP': 'Światło tylne prawe',
  'OFF_SIDE_FUEL_CAP': 'Wlew paliwa prawy',
  'OFF_SIDE_WING_MIRROR': 'Lusterko prawe',
  'OFF_SIDE_FRONT_TYRE': 'Opona przednia prawa',
  'OFF_SIDE_FRONT_WHEEL': 'Koło przednie prawe',
  'OFF_SIDE_REAR_TYRE': 'Opona tylna prawa',
  'OFF_SIDE_REAR_WHEEL': 'Koło tylne prawe',
  'OFF_SIDE_BODY_TRIM': 'Listwa nadwozia prawa',
  'OFF_SIDE_UNDER_TRIM': 'Listwa dolna prawa',

  // Additional parts
  'BODY_TRIM': 'Listwa nadwozia',
  'BUMPERS': 'Zderzaki',
  '2_OFF_SIDE_WING_MIRROR': 'Lusterko prawe dodatkowe',

  // Door handles
  'NEAR_SIDE_DRIVER_HANDLE': 'Klamka kierowcy lewa',
  'OFF_SIDE_DRIVER_HANDLE': 'Klamka kierowcy prawa',
  'NEAR_SIDE_PASSENGER_HANDLE': 'Klamka pasażera lewa',
  'OFF_SIDE_PASSENGER_HANDLE': 'Klamka pasażera prawa',

  // Front fog lights
  'FRONT_NEAR_SIDE_FOG_LIGHT': 'Światło przeciwmgielne przednie lewe',
  'FRONT_OFF_SIDE_FOG_LIGHT': 'Światło przeciwmgielne przednie prawe'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface ProfessionalCarDiagramProps {
  selectedParts: Set<string>;
  onPartSelect: (partName: string) => void;
  className?: string;
}

export default function ProfessionalCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: ProfessionalCarDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  const handlePartHover = (partName: CarPartName | null) => {
    setHoveredPart(partName);
  };

  const isPartSelected = (partName: CarPartName) => selectedParts.has(partName);
  const isPartHovered = (partName: CarPartName) => hoveredPart === partName;

  const getPartClass = (partName: CarPartName) => {
    let classes = "car-part cursor-pointer transition-all duration-200";
    if (isPartSelected(partName)) {
      classes += " fill-red-500 stroke-red-600";
    } else if (isPartHovered(partName)) {
      classes += " fill-yellow-400 stroke-yellow-500";
    } else {
      classes += " fill-blue-400 stroke-blue-600";
    }
    return classes;
  };

  return (
    <TooltipProvider>
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Profesjonalny diagram samochodu - zaznacz uszkodzone części
          </h3>
          
          <style>
            {`
              .car-part {
                stroke-width: 2;
                filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.1));
              }
              .car-part:hover {
                filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                transform: scale(1.02);
                transform-origin: center;
              }
            `}
          </style>
          
          <svg viewBox="0 0 800 400" className="w-full h-auto max-h-[500px]">
            {/* Main car body */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="200" y="150" width="400" height="120" rx="20" 
                  className={getPartClass('FRONT_PANEL')}
                  onClick={() => handlePartClick('FRONT_PANEL')}
                  onMouseEnter={() => handlePartHover('FRONT_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front bumper */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="140" y="170" width="70" height="80" rx="15" 
                  className={getPartClass('FRONT_BUMPER')}
                  onClick={() => handlePartClick('FRONT_BUMPER')}
                  onMouseEnter={() => handlePartHover('FRONT_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front bonnet/hood */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="220" y="100" width="360" height="60" rx="20" 
                  className={getPartClass('FRONT_BONNET')}
                  onClick={() => handlePartClick('FRONT_BONNET')}
                  onMouseEnter={() => handlePartHover('FRONT_BONNET')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-bonnet"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_BONNET']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front windscreen */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="240" y="130" width="320" height="30" rx="10" 
                  className={getPartClass('FRONT_WINDSCREEN')}
                  onClick={() => handlePartClick('FRONT_WINDSCREEN')}
                  onMouseEnter={() => handlePartHover('FRONT_WINDSCREEN')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-windscreen"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_WINDSCREEN']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front roof panel */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="260" y="60" width="280" height="50" rx="15" 
                  className={getPartClass('FRONT_ROOF_PANEL')}
                  onClick={() => handlePartClick('FRONT_ROOF_PANEL')}
                  onMouseEnter={() => handlePartHover('FRONT_ROOF_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-roof-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_ROOF_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Left side doors */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="220" y="160" width="80" height="90" rx="8" 
                  className={getPartClass('NEAR_SIDE_DRIVER_DOOR')}
                  onClick={() => handlePartClick('NEAR_SIDE_DRIVER_DOOR')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_DRIVER_DOOR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-driver-door"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_DRIVER_DOOR']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="310" y="160" width="80" height="90" rx="8" 
                  className={getPartClass('NEAR_SIDE_PASSENGER_DOOR')}
                  onClick={() => handlePartClick('NEAR_SIDE_PASSENGER_DOOR')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_PASSENGER_DOOR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-passenger-door"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_PASSENGER_DOOR']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Right side doors */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="410" y="160" width="80" height="90" rx="8" 
                  className={getPartClass('OFF_SIDE_DRIVER_DOOR')}
                  onClick={() => handlePartClick('OFF_SIDE_DRIVER_DOOR')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_DRIVER_DOOR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-driver-door"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_DRIVER_DOOR']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="500" y="160" width="80" height="90" rx="8" 
                  className={getPartClass('OFF_SIDE_PASSENGER_DOOR')}
                  onClick={() => handlePartClick('OFF_SIDE_PASSENGER_DOOR')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_PASSENGER_DOOR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-passenger-door"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_PASSENGER_DOOR']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front headlamps */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="160" cy="140" rx="25" ry="15" 
                  className={getPartClass('FRONT_NEAR_SIDE_HEADLAMP')}
                  onClick={() => handlePartClick('FRONT_NEAR_SIDE_HEADLAMP')}
                  onMouseEnter={() => handlePartHover('FRONT_NEAR_SIDE_HEADLAMP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-near-side-headlamp"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_NEAR_SIDE_HEADLAMP']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="640" cy="140" rx="25" ry="15" 
                  className={getPartClass('FRONT_OFF_SIDE_HEADLAMP')}
                  onClick={() => handlePartClick('FRONT_OFF_SIDE_HEADLAMP')}
                  onMouseEnter={() => handlePartHover('FRONT_OFF_SIDE_HEADLAMP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-off-side-headlamp"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_OFF_SIDE_HEADLAMP']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front grill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="350" y="120" width="100" height="40" rx="8" 
                  className={getPartClass('FRONT_GRILL')}
                  onClick={() => handlePartClick('FRONT_GRILL')}
                  onMouseEnter={() => handlePartHover('FRONT_GRILL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-grill"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_GRILL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front number plate */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="370" y="160" width="60" height="20" rx="3" 
                  className={getPartClass('FRONT_NUMBER_PLATE')}
                  onClick={() => handlePartClick('FRONT_NUMBER_PLATE')}
                  onMouseEnter={() => handlePartHover('FRONT_NUMBER_PLATE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-number-plate"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_NUMBER_PLATE']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear bumper */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="590" y="170" width="70" height="80" rx="15" 
                  className={getPartClass('REAR_BUMPER')}
                  onClick={() => handlePartClick('REAR_BUMPER')}
                  onMouseEnter={() => handlePartHover('REAR_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear panel */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="580" y="100" width="40" height="120" rx="15" 
                  className={getPartClass('REAR_PANEL')}
                  onClick={() => handlePartClick('REAR_PANEL')}
                  onMouseEnter={() => handlePartHover('REAR_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear lights */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="620" cy="130" rx="15" ry="20" 
                  className={getPartClass('REAR_NEAR_SIDE_LIGHT')}
                  onClick={() => handlePartClick('REAR_NEAR_SIDE_LIGHT')}
                  onMouseEnter={() => handlePartHover('REAR_NEAR_SIDE_LIGHT')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-near-side-light"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_NEAR_SIDE_LIGHT']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="620" cy="240" rx="15" ry="20" 
                  className={getPartClass('REAR_OFF_SIDE_LIGHT')}
                  onClick={() => handlePartClick('REAR_OFF_SIDE_LIGHT')}
                  onMouseEnter={() => handlePartHover('REAR_OFF_SIDE_LIGHT')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-off-side-light"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_OFF_SIDE_LIGHT']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear number plate */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="570" y="200" width="60" height="20" rx="3" 
                  className={getPartClass('REAR_NUMBER_PLATE')}
                  onClick={() => handlePartClick('REAR_NUMBER_PLATE')}
                  onMouseEnter={() => handlePartHover('REAR_NUMBER_PLATE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-number-plate"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_NUMBER_PLATE']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Windows */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="230" y="140" width="60" height="25" rx="5" 
                  className={getPartClass('NEAR_SIDE_DRIVER_WINDOW')}
                  onClick={() => handlePartClick('NEAR_SIDE_DRIVER_WINDOW')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_DRIVER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-driver-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_DRIVER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="510" y="140" width="60" height="25" rx="5" 
                  className={getPartClass('OFF_SIDE_DRIVER_WINDOW')}
                  onClick={() => handlePartClick('OFF_SIDE_DRIVER_WINDOW')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_DRIVER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-driver-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_DRIVER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="320" y="140" width="60" height="25" rx="5" 
                  className={getPartClass('NEAR_SIDE_PASSENGER_WINDOW')}
                  onClick={() => handlePartClick('NEAR_SIDE_PASSENGER_WINDOW')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_PASSENGER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-passenger-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_PASSENGER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="420" y="140" width="60" height="25" rx="5" 
                  className={getPartClass('OFF_SIDE_PASSENGER_WINDOW')}
                  onClick={() => handlePartClick('OFF_SIDE_PASSENGER_WINDOW')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_PASSENGER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-passenger-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_PASSENGER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Wing mirrors */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="200" cy="150" rx="12" ry="8" 
                  className={getPartClass('NEAR_SIDE_WING_MIRROR')}
                  onClick={() => handlePartClick('NEAR_SIDE_WING_MIRROR')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_WING_MIRROR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-wing-mirror"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_WING_MIRROR']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="600" cy="150" rx="12" ry="8" 
                  className={getPartClass('OFF_SIDE_WING_MIRROR')}
                  onClick={() => handlePartClick('OFF_SIDE_WING_MIRROR')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_WING_MIRROR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-wing-mirror"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_WING_MIRROR']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front wheels */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="250" cy="280" r="35" 
                  className={getPartClass('NEAR_SIDE_FRONT_WHEEL')}
                  onClick={() => handlePartClick('NEAR_SIDE_FRONT_WHEEL')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_FRONT_WHEEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-front-wheel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_FRONT_WHEEL']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="550" cy="280" r="35" 
                  className={getPartClass('OFF_SIDE_FRONT_WHEEL')}
                  onClick={() => handlePartClick('OFF_SIDE_FRONT_WHEEL')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_FRONT_WHEEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-front-wheel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_FRONT_WHEEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear wheels */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="450" cy="280" r="35" 
                  className={getPartClass('NEAR_SIDE_REAR_WHEEL')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_WHEEL')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_WHEEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-wheel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_WHEEL']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="350" cy="280" r="35" 
                  className={getPartClass('OFF_SIDE_REAR_WHEEL')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_WHEEL')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_WHEEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-wheel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_WHEEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Tyres */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="250" cy="280" r="30" 
                  fill="transparent"
                  strokeWidth="6"
                  className={getPartClass('NEAR_SIDE_FRONT_TYPE')}
                  onClick={() => handlePartClick('NEAR_SIDE_FRONT_TYPE')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_FRONT_TYPE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-front-type"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_FRONT_TYPE']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="550" cy="280" r="30" 
                  fill="transparent"
                  strokeWidth="6"
                  className={getPartClass('OFF_SIDE_FRONT_TYRE')}
                  onClick={() => handlePartClick('OFF_SIDE_FRONT_TYRE')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_FRONT_TYRE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-front-tyre"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_FRONT_TYRE']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="450" cy="280" r="30" 
                  fill="transparent"
                  strokeWidth="6"
                  className={getPartClass('NEAR_SIDE_REAR_TYPE')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_TYPE')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_TYPE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-type"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_TYPE']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="350" cy="280" r="30" 
                  fill="transparent"
                  strokeWidth="6"
                  className={getPartClass('OFF_SIDE_REAR_TYRE')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_TYRE')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_TYRE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-tyre"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_TYRE']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Side panels */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="200" y="250" width="100" height="15" rx="5" 
                  className={getPartClass('NEAR_SIDE_FRONT_PANEL')}
                  onClick={() => handlePartClick('NEAR_SIDE_FRONT_PANEL')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_FRONT_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-front-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_FRONT_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="500" y="250" width="100" height="15" rx="5" 
                  className={getPartClass('OFF_SIDE_FRONT_PANEL')}
                  onClick={() => handlePartClick('OFF_SIDE_FRONT_PANEL')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_FRONT_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-front-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_FRONT_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="400" y="250" width="100" height="15" rx="5" 
                  className={getPartClass('NEAR_SIDE_REAR_PANEL')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_PANEL')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="300" y="250" width="100" height="15" rx="5" 
                  className={getPartClass('OFF_SIDE_REAR_PANEL')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_PANEL')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Body trims */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="200" y="265" width="200" height="8" rx="4" 
                  className={getPartClass('NEAR_SIDE_BODY_TRIM')}
                  onClick={() => handlePartClick('NEAR_SIDE_BODY_TRIM')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_BODY_TRIM')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-body-trim"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_BODY_TRIM']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="400" y="265" width="200" height="8" rx="4" 
                  className={getPartClass('OFF_SIDE_BODY_TRIM')}
                  onClick={() => handlePartClick('OFF_SIDE_BODY_TRIM')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_BODY_TRIM')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-body-trim"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_BODY_TRIM']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Fuel caps */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="200" cy="200" r="8" 
                  className={getPartClass('NEAR_SIDE_FUEL_CAP')}
                  onClick={() => handlePartClick('NEAR_SIDE_FUEL_CAP')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_FUEL_CAP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-fuel-cap"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_FUEL_CAP']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="600" cy="200" r="8" 
                  className={getPartClass('OFF_SIDE_FUEL_CAP')}
                  onClick={() => handlePartClick('OFF_SIDE_FUEL_CAP')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_FUEL_CAP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-fuel-cap"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_FUEL_CAP']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Additional detailed parts - door handles */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="285" y="180" width="10" height="6" rx="3" 
                  className={getPartClass('NEAR_SIDE_DRIVER_HANDLE')}
                  onClick={() => handlePartClick('NEAR_SIDE_DRIVER_HANDLE')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_DRIVER_HANDLE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-driver-handle"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Klamka kierowcy lewa</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="505" y="180" width="10" height="6" rx="3" 
                  className={getPartClass('OFF_SIDE_DRIVER_HANDLE')}
                  onClick={() => handlePartClick('OFF_SIDE_DRIVER_HANDLE')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_DRIVER_HANDLE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-driver-handle"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Klamka kierowcy prawa</p>
              </TooltipContent>
            </Tooltip>

            {/* Side windows - additional */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="230" y="165" width="60" height="20" rx="5" 
                  className={getPartClass('NEAR_SIDE_SIDE_WINDOW')}
                  onClick={() => handlePartClick('NEAR_SIDE_SIDE_WINDOW')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_SIDE_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-side-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_SIDE_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="510" y="165" width="60" height="20" rx="5" 
                  className={getPartClass('OFF_SIDE_SIDE_WINDOW')}
                  onClick={() => handlePartClick('OFF_SIDE_SIDE_WINDOW')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_SIDE_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-side-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_SIDE_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear window */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="420" y="70" width="140" height="30" rx="10" 
                  className={getPartClass('NEAR_SIDE_REAR_WINDOW')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_WINDOW')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="240" y="70" width="140" height="30" rx="10" 
                  className={getPartClass('OFF_SIDE_REAR_WINDOW')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_WINDOW')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Under trims */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="200" y="275" width="200" height="6" rx="3" 
                  className={getPartClass('NEAR_SIDE_UNDER_TRIM')}
                  onClick={() => handlePartClick('NEAR_SIDE_UNDER_TRIM')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_UNDER_TRIM')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-under-trim"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_UNDER_TRIM']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="400" y="275" width="200" height="6" rx="3" 
                  className={getPartClass('OFF_SIDE_UNDER_TRIM')}
                  onClick={() => handlePartClick('OFF_SIDE_UNDER_TRIM')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_UNDER_TRIM')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-under-trim"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_UNDER_TRIM']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front and rear bumper parts */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="140" y="170" width="70" height="40" rx="10" 
                  className={getPartClass('NEAR_SIDE_FRONT_BUMPER')}
                  onClick={() => handlePartClick('NEAR_SIDE_FRONT_BUMPER')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_FRONT_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-front-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_FRONT_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="590" y="170" width="70" height="40" rx="10" 
                  className={getPartClass('OFF_SIDE_FRONT_BUMPER')}
                  onClick={() => handlePartClick('OFF_SIDE_FRONT_BUMPER')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_FRONT_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-front-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_FRONT_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="140" y="210" width="70" height="40" rx="10" 
                  className={getPartClass('NEAR_SIDE_REAR_BUMPER')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_BUMPER')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="590" y="210" width="70" height="40" rx="10" 
                  className={getPartClass('OFF_SIDE_REAR_BUMPER')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_BUMPER')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_BUMPER')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-bumper"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_BUMPER']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Exhaust pipes */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="180" cy="290" rx="8" ry="6" 
                  className={getPartClass('REAR_NEAR_SIDE_EXHAUST')}
                  onClick={() => handlePartClick('REAR_NEAR_SIDE_EXHAUST')}
                  onMouseEnter={() => handlePartHover('REAR_NEAR_SIDE_EXHAUST')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-near-side-exhaust"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_NEAR_SIDE_EXHAUST']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="620" cy="290" rx="8" ry="6" 
                  className={getPartClass('REAR_OFF_SIDE_EXHAUST')}
                  onClick={() => handlePartClick('REAR_OFF_SIDE_EXHAUST')}
                  onMouseEnter={() => handlePartHover('REAR_OFF_SIDE_EXHAUST')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-rear-off-side-exhaust"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['REAR_OFF_SIDE_EXHAUST']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Additional front windows */}
            <Tooltip>
              <TooltipTrigger asChild>
                <polygon 
                  points="290,135 340,135 330,155 300,155" 
                  className={getPartClass('FRONT_DRIVER_WINDOW')}
                  onClick={() => handlePartClick('FRONT_DRIVER_WINDOW')}
                  onMouseEnter={() => handlePartHover('FRONT_DRIVER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-driver-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_DRIVER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <polygon 
                  points="460,135 510,135 500,155 470,155" 
                  className={getPartClass('FRONT_PASSENGER_WINDOW')}
                  onClick={() => handlePartClick('FRONT_PASSENGER_WINDOW')}
                  onMouseEnter={() => handlePartHover('FRONT_PASSENGER_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-passenger-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_PASSENGER_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Driver side windows */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="240" y="155" width="50" height="15" rx="3" 
                  className={getPartClass('FRONT_DRIVER_SIDE_WINDOW')}
                  onClick={() => handlePartClick('FRONT_DRIVER_SIDE_WINDOW')}
                  onMouseEnter={() => handlePartHover('FRONT_DRIVER_SIDE_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-driver-side-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_DRIVER_SIDE_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="510" y="155" width="50" height="15" rx="3" 
                  className={getPartClass('FRONT_PASSENGER_SIDE_WINDOW')}
                  onClick={() => handlePartClick('FRONT_PASSENGER_SIDE_WINDOW')}
                  onMouseEnter={() => handlePartHover('FRONT_PASSENGER_SIDE_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-passenger-side-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_PASSENGER_SIDE_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Rear headlamps */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="620" cy="160" rx="15" ry="10" 
                  className={getPartClass('NEAR_SIDE_REAR_HEADLAMP')}
                  onClick={() => handlePartClick('NEAR_SIDE_REAR_HEADLAMP')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_REAR_HEADLAMP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-rear-headlamp"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['NEAR_SIDE_REAR_HEADLAMP']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="620" cy="220" rx="15" ry="10" 
                  className={getPartClass('OFF_SIDE_REAR_HEADLAMP')}
                  onClick={() => handlePartClick('OFF_SIDE_REAR_HEADLAMP')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_REAR_HEADLAMP')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-rear-headlamp"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['OFF_SIDE_REAR_HEADLAMP']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Passenger handles */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="375" y="180" width="10" height="6" rx="3" 
                  className={getPartClass('NEAR_SIDE_PASSENGER_HANDLE')}
                  onClick={() => handlePartClick('NEAR_SIDE_PASSENGER_HANDLE')}
                  onMouseEnter={() => handlePartHover('NEAR_SIDE_PASSENGER_HANDLE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-near-side-passenger-handle"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Klamka pasażera lewa</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="415" y="180" width="10" height="6" rx="3" 
                  className={getPartClass('OFF_SIDE_PASSENGER_HANDLE')}
                  onClick={() => handlePartClick('OFF_SIDE_PASSENGER_HANDLE')}
                  onMouseEnter={() => handlePartHover('OFF_SIDE_PASSENGER_HANDLE')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-off-side-passenger-handle"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Klamka pasażera prawa</p>
              </TooltipContent>
            </Tooltip>

            {/* Additional body parts */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="300" y="100" width="200" height="20" rx="8" 
                  className={getPartClass('BODY_TRIM')}
                  onClick={() => handlePartClick('BODY_TRIM')}
                  onMouseEnter={() => handlePartHover('BODY_TRIM')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-body-trim"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['BODY_TRIM']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front rear panel */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="400" y="120" width="180" height="20" rx="8" 
                  className={getPartClass('FRONT_REAR_PANEL')}
                  onClick={() => handlePartClick('FRONT_REAR_PANEL')}
                  onMouseEnter={() => handlePartHover('FRONT_REAR_PANEL')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-rear-panel"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_REAR_PANEL']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front rear window */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="410" y="105" width="160" height="20" rx="8" 
                  className={getPartClass('FRONT_REAR_WINDOW')}
                  onClick={() => handlePartClick('FRONT_REAR_WINDOW')}
                  onMouseEnter={() => handlePartHover('FRONT_REAR_WINDOW')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-rear-window"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_REAR_WINDOW']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Additional bumper elements */}
            <Tooltip>
              <TooltipTrigger asChild>
                <rect 
                  x="100" y="180" width="200" height="60" rx="20" 
                  className={getPartClass('BUMPERS')}
                  onClick={() => handlePartClick('BUMPERS')}
                  onMouseEnter={() => handlePartHover('BUMPERS')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-bumpers"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['BUMPERS']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Additional wing mirror */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ellipse 
                  cx="600" cy="135" rx="10" ry="6" 
                  className={getPartClass('2_OFF_SIDE_WING_MIRROR')}
                  onClick={() => handlePartClick('2_OFF_SIDE_WING_MIRROR')}
                  onMouseEnter={() => handlePartHover('2_OFF_SIDE_WING_MIRROR')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-2-off-side-wing-mirror"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['2_OFF_SIDE_WING_MIRROR']}</p>
              </TooltipContent>
            </Tooltip>

            {/* Front fog lights */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="170" cy="200" r="8" 
                  className={getPartClass('FRONT_NEAR_SIDE_FOG_LIGHT')}
                  onClick={() => handlePartClick('FRONT_NEAR_SIDE_FOG_LIGHT')}
                  onMouseEnter={() => handlePartHover('FRONT_NEAR_SIDE_FOG_LIGHT')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-near-side-fog-light"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_NEAR_SIDE_FOG_LIGHT']}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle 
                  cx="630" cy="200" r="8" 
                  className={getPartClass('FRONT_OFF_SIDE_FOG_LIGHT')}
                  onClick={() => handlePartClick('FRONT_OFF_SIDE_FOG_LIGHT')}
                  onMouseEnter={() => handlePartHover('FRONT_OFF_SIDE_FOG_LIGHT')}
                  onMouseLeave={() => handlePartHover(null)}
                  data-testid="car-part-front-off-side-fog-light"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{CAR_PARTS['FRONT_OFF_SIDE_FOG_LIGHT']}</p>
              </TooltipContent>
            </Tooltip>
          </svg>
          
          {/* Info panel showing current selection */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-medium text-blue-900">
              {hoveredPart 
                ? `Najedź na: ${CAR_PARTS[hoveredPart as CarPartName]}` 
                : selectedParts.size > 0 
                  ? `Zaznaczonych części: ${selectedParts.size}` 
                  : 'Kliknij części samochodu aby oznaczyć uszkodzenia'
              }
            </div>
          </div>
        </div>

        {/* Lista zaznaczonych części */}
        {selectedParts.size > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Zaznaczone uszkodzenia ({selectedParts.size})
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Array.from(selectedParts).map((partName) => (
                <div 
                  key={partName}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="font-medium text-red-800">
                      {CAR_PARTS[partName as CarPartName] || partName}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePartClick(partName as CarPartName)}
                    className="text-red-600 hover:text-red-800 font-bold text-lg px-2"
                    data-testid={`remove-part-${partName}`}
                    title="Usuń zaznaczenie"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export { CAR_PARTS };
export type { CarPartName };