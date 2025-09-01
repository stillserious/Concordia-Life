import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Pełne mapowanie 68 części samochodu zgodnie z referencyjnym modelem
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
  'FRONT_NEAR_SIDE_FOG_LIGHT': 'Światło przeciwmgielne przednie lewe',
  'FRONT_OFF_SIDE_FOG_LIGHT': 'Światło przeciwmgielne przednie prawe',

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
  'NEAR_SIDE_DRIVER_HANDLE': 'Klamka kierowcy lewa',
  'NEAR_SIDE_PASSENGER_HANDLE': 'Klamka pasażera lewa',

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
  'OFF_SIDE_DRIVER_HANDLE': 'Klamka kierowcy prawa',
  'OFF_SIDE_PASSENGER_HANDLE': 'Klamka pasażera prawa',

  // Additional specific parts
  'BODY_TRIM': 'Listwa nadwozia',
  'BUMPERS': 'Zderzaki',
  'SPARE': 'Koło zapasowe',
  'ROOF': 'Dach',
  'TRUNK': 'Bagażnik',

  // Additional body parts
  'A_PILLAR_NEAR_SIDE': 'Słupek A lewy',
  'A_PILLAR_OFF_SIDE': 'Słupek A prawy',
  'B_PILLAR_NEAR_SIDE': 'Słupek B lewy',
  'B_PILLAR_OFF_SIDE': 'Słupek B prawy',
  'C_PILLAR_NEAR_SIDE': 'Słupek C lewy',
  'C_PILLAR_OFF_SIDE': 'Słupek C prawy',
  'SILL_NEAR_SIDE': 'Próg lewy',
  'SILL_OFF_SIDE': 'Próg prawy',
  'QUARTER_PANEL_NEAR_SIDE': 'Panel ćwierć lewy',
  'QUARTER_PANEL_OFF_SIDE': 'Panel ćwierć prawy',
  'FENDER_NEAR_SIDE': 'Błotnik lewy',
  'FENDER_OFF_SIDE': 'Błotnik prawy',
  'RUNNING_BOARD_NEAR_SIDE': 'Stopień lewy',
  'RUNNING_BOARD_OFF_SIDE': 'Stopień prawy',
  'SPLASH_GUARD_NEAR_SIDE': 'Osłona przeciwbłotna lewa',
  'SPLASH_GUARD_OFF_SIDE': 'Osłona przeciwbłotna prawa',

  // Interior and additional parts  
  'DASHBOARD': 'Tablica rozdzielcza',
  'STEERING_WHEEL': 'Kierownica',
  'SEATS_FRONT': 'Fotele przednie',
  'SEATS_REAR': 'Fotele tylne',
  'CENTER_CONSOLE': 'Konsola środkowa',
  'GLOVE_BOX': 'Schowek',
  'SUNROOF': 'Szyberdach',
  'RADIO_ANTENNA': 'Antena radiowa',
  'LICENSE_PLATE_LIGHT': 'Światło tablicy rejestracyjnej',
  'THIRD_BRAKE_LIGHT': 'Trzecie światło stop',
  'SIDE_MARKER_LIGHT_NEAR': 'Kierunkowskaz boczny lewy',
  'SIDE_MARKER_LIGHT_OFF': 'Kierunkowskaz boczny prawy',
  'TURN_SIGNAL_FRONT_NEAR': 'Kierunkowskaz przedni lewy',
  'TURN_SIGNAL_FRONT_OFF': 'Kierunkowskaz przedni prawy',
  'TURN_SIGNAL_REAR_NEAR': 'Kierunkowskaz tylny lewy',
  'TURN_SIGNAL_REAR_OFF': 'Kierunkowskaz tylny prawy'
} as const;

type CarPartName = keyof typeof CAR_PARTS;
type CarView = 'front' | 'left' | 'right' | 'rear';

interface EnvatoCarDiagramProps {
  selectedParts: Set<string>;
  onPartSelect: (partName: string) => void;
  className?: string;
}

export default function EnvatoCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: EnvatoCarDiagramProps) {
  const [currentView, setCurrentView] = useState<CarView>('front');
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Auto-reset hover state when view changes
  useEffect(() => {
    setHoveredPart(null);
  }, [currentView]);

  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  const handlePartHover = (partName: CarPartName | null) => {
    setHoveredPart(partName);
  };

  const isPartSelected = (partName: CarPartName) => selectedParts.has(partName);
  const isPartHovered = (partName: CarPartName) => hoveredPart === partName;

  const getPartClass = (partName: CarPartName) => {
    let classes = "car-part cursor-pointer transition-all duration-200 stroke-2";
    if (isPartSelected(partName)) {
      classes += " fill-red-500 stroke-red-700";
    } else if (isPartHovered(partName)) {
      classes += " fill-yellow-300 stroke-yellow-500";
    } else {
      classes += " fill-blue-100 stroke-blue-400 hover:fill-blue-200";
    }
    return classes;
  };

  const renderFrontView = () => (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* Main front structure */}
      <defs>
        <radialGradient id="frontGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#f0f8ff" />
          <stop offset="100%" stopColor="#e6f3ff" />
        </radialGradient>
      </defs>

      {/* Front Roof Panel */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="250" y="80" width="300" height="60" rx="20" 
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

      {/* Front Windscreen */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="270" y="140" width="260" height="40" rx="15" 
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

      {/* Front Bonnet */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="280" y="180" width="240" height="80" rx="15" 
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

      {/* Front Grill */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="350" y="260" width="100" height="40" rx="8" 
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

      {/* Front Headlamps */}
      <Tooltip>
        <TooltipTrigger asChild>
          <ellipse 
            cx="300" cy="240" rx="30" ry="20" 
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
            cx="500" cy="240" rx="30" ry="20" 
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

      {/* Front Fog Lights */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="320" cy="290" r="12" 
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
            cx="480" cy="290" r="12" 
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

      {/* Front Bumper */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="250" y="300" width="300" height="50" rx="25" 
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

      {/* Front Number Plate */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="370" y="320" width="60" height="20" rx="3" 
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

      {/* Wing Mirrors */}
      <Tooltip>
        <TooltipTrigger asChild>
          <ellipse 
            cx="220" cy="180" rx="15" ry="10" 
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
            cx="580" cy="180" rx="15" ry="10" 
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
            cx="280" cy="400" r="40" 
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
            cx="520" cy="400" r="40" 
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

      {/* Front tyres */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="280" cy="400" r="32" 
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
            cx="520" cy="400" r="32" 
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

      {/* Turn signals */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="250" cy="220" r="8" 
            className={getPartClass('TURN_SIGNAL_FRONT_NEAR')}
            onClick={() => handlePartClick('TURN_SIGNAL_FRONT_NEAR')}
            onMouseEnter={() => handlePartHover('TURN_SIGNAL_FRONT_NEAR')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-turn-signal-front-near"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['TURN_SIGNAL_FRONT_NEAR']}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="550" cy="220" r="8" 
            className={getPartClass('TURN_SIGNAL_FRONT_OFF')}
            onClick={() => handlePartClick('TURN_SIGNAL_FRONT_OFF')}
            onMouseEnter={() => handlePartHover('TURN_SIGNAL_FRONT_OFF')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-turn-signal-front-off"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['TURN_SIGNAL_FRONT_OFF']}</p>
        </TooltipContent>
      </Tooltip>

      {/* A-Pillars */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="265" y="140" width="15" height="70" rx="7" 
            className={getPartClass('A_PILLAR_NEAR_SIDE')}
            onClick={() => handlePartClick('A_PILLAR_NEAR_SIDE')}
            onMouseEnter={() => handlePartHover('A_PILLAR_NEAR_SIDE')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-a-pillar-near-side"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['A_PILLAR_NEAR_SIDE']}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="520" y="140" width="15" height="70" rx="7" 
            className={getPartClass('A_PILLAR_OFF_SIDE')}
            onClick={() => handlePartClick('A_PILLAR_OFF_SIDE')}
            onMouseEnter={() => handlePartHover('A_PILLAR_OFF_SIDE')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-a-pillar-off-side"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['A_PILLAR_OFF_SIDE']}</p>
        </TooltipContent>
      </Tooltip>
    </svg>
  );

  const renderLeftView = () => (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      {/* Left side view */}
      {/* Main body */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="150" y="120" width="500" height="120" rx="20" 
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

      {/* Roof */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="200" y="60" width="400" height="70" rx="25" 
            className={getPartClass('ROOF')}
            onClick={() => handlePartClick('ROOF')}
            onMouseEnter={() => handlePartHover('ROOF')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-roof"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['ROOF']}</p>
        </TooltipContent>
      </Tooltip>

      {/* Left Driver Door */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="200" y="140" width="120" height="80" rx="10" 
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

      {/* Left Passenger Door */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="340" y="140" width="120" height="80" rx="10" 
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

      {/* Left windows */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="210" y="120" width="100" height="25" rx="5" 
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
            x="350" y="120" width="100" height="25" rx="5" 
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

      {/* Left side panels */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="480" y="140" width="120" height="80" rx="10" 
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

      {/* Left wheels */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="250" cy="290" r="35" 
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
            cx="550" cy="290" r="35" 
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

      {/* Body trim */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="150" y="240" width="500" height="10" rx="5" 
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

      {/* Door handles */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="300" y="170" width="12" height="8" rx="4" 
            className={getPartClass('NEAR_SIDE_DRIVER_HANDLE')}
            onClick={() => handlePartClick('NEAR_SIDE_DRIVER_HANDLE')}
            onMouseEnter={() => handlePartHover('NEAR_SIDE_DRIVER_HANDLE')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-near-side-driver-handle"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['NEAR_SIDE_DRIVER_HANDLE']}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="440" y="170" width="12" height="8" rx="4" 
            className={getPartClass('NEAR_SIDE_PASSENGER_HANDLE')}
            onClick={() => handlePartClick('NEAR_SIDE_PASSENGER_HANDLE')}
            onMouseEnter={() => handlePartHover('NEAR_SIDE_PASSENGER_HANDLE')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-near-side-passenger-handle"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['NEAR_SIDE_PASSENGER_HANDLE']}</p>
        </TooltipContent>
      </Tooltip>
    </svg>
  );

  const renderRightView = () => (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      {/* Right side view - mirror of left */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="150" y="120" width="500" height="120" rx="20" 
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

      {/* Right Driver Door */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="200" y="140" width="120" height="80" rx="10" 
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

      {/* Right Passenger Door */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="340" y="140" width="120" height="80" rx="10" 
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

      {/* Right windows */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="210" y="120" width="100" height="25" rx="5" 
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
            x="350" y="120" width="100" height="25" rx="5" 
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

      {/* Right wheels */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="250" cy="290" r="35" 
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

      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="550" cy="290" r="35" 
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
    </svg>
  );

  const renderRearView = () => (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* Rear view */}
      {/* Rear Panel */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="250" y="180" width="300" height="120" rx="20" 
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

      {/* Rear Bumper */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="250" y="300" width="300" height="50" rx="25" 
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

      {/* Rear Lights */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="270" y="220" width="40" height="60" rx="15" 
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
          <rect 
            x="490" y="220" width="40" height="60" rx="15" 
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

      {/* Rear Number Plate */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="370" y="320" width="60" height="20" rx="3" 
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

      {/* Trunk */}
      <Tooltip>
        <TooltipTrigger asChild>
          <rect 
            x="320" y="120" width="160" height="60" rx="15" 
            className={getPartClass('TRUNK')}
            onClick={() => handlePartClick('TRUNK')}
            onMouseEnter={() => handlePartHover('TRUNK')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-trunk"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['TRUNK']}</p>
        </TooltipContent>
      </Tooltip>

      {/* Rear wheels */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="280" cy="400" r="40" 
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
            cx="520" cy="400" r="40" 
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

      {/* Exhaust pipes */}
      <Tooltip>
        <TooltipTrigger asChild>
          <ellipse 
            cx="300" cy="340" rx="12" ry="8" 
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
            cx="500" cy="340" rx="12" ry="8" 
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

      {/* Spare tire */}
      <Tooltip>
        <TooltipTrigger asChild>
          <circle 
            cx="400" cy="500" r="30" 
            className={getPartClass('SPARE')}
            onClick={() => handlePartClick('SPARE')}
            onMouseEnter={() => handlePartHover('SPARE')}
            onMouseLeave={() => handlePartHover(null)}
            data-testid="car-part-spare"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{CAR_PARTS['SPARE']}</p>
        </TooltipContent>
      </Tooltip>
    </svg>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'front':
        return renderFrontView();
      case 'left':
        return renderLeftView();
      case 'right':
        return renderRightView();
      case 'rear':
        return renderRearView();
      default:
        return renderFrontView();
    }
  };

  return (
    <TooltipProvider>
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Profesjonalny diagram pojazdu - wybierz uszkodzone części
          </h3>
          
          {/* View selection buttons */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={currentView === 'front' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('front')}
              data-testid="view-front"
            >
              PRZÓD
            </Button>
            <Button
              variant={currentView === 'left' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('left')}
              data-testid="view-left"
            >
              LEWA STRONA
            </Button>
            <Button
              variant={currentView === 'right' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('right')}
              data-testid="view-right"
            >
              PRAWA STRONA
            </Button>
            <Button
              variant={currentView === 'rear' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('rear')}
              data-testid="view-rear"
            >
              TYŁ
            </Button>
          </div>
          
          <style>
            {`
              .car-part {
                filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.1));
                transition: all 0.2s ease;
              }
              .car-part:hover {
                filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
                transform: scale(1.05);
                transform-origin: center;
              }
            `}
          </style>
          
          {/* Car diagram */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
            {renderCurrentView()}
          </div>
          
          {/* Current view info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-lg font-medium text-blue-900">
                Widok: {currentView === 'front' ? 'Przód' : currentView === 'left' ? 'Lewa strona' : currentView === 'right' ? 'Prawa strona' : 'Tył'}
              </div>
              <div className="text-sm text-blue-700 mt-1">
                {hoveredPart 
                  ? `Część: ${CAR_PARTS[hoveredPart as CarPartName] || hoveredPart}` 
                  : selectedParts.size > 0 
                    ? `Zaznaczonych części: ${selectedParts.size}` 
                    : 'Najedź myszką na części aby zobaczyć nazwy, kliknij aby oznaczyć uszkodzenia'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Lista zaznaczonych części */}
        {selectedParts.size > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Zaznaczone uszkodzenia ({selectedParts.size} części)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {Array.from(selectedParts).map((partName) => (
                <div 
                  key={partName}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="font-medium text-red-800 text-sm">
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