import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Dokładne mapowanie wszystkich 68 części z oryginalnego modelu Envato
const CAR_PARTS = {
  // Wheel arches - łuki nadkoli
  'FRONT_LEFT_SIDE_WHEEL_ARCH': 'Łuk nadkola przedni lewy',
  'FRONT_RIGHT_SIDE_WHEEL_ARCH': 'Łuk nadkola przedni prawy', 
  'REAR_LEFT_SIDE_WHEEL_ARCH': 'Łuk nadkola tylny lewy',
  'REAR_RIGHT_SIDE_WHEEL_ARCH': 'Łuk nadkola tylny prawy',

  // Markers and exhaust
  'LEFT_SIDE_REAR_MARKERS': 'Markery tylne lewe',
  'RIGHT_SIDE_REAR_MARKERS': 'Markery tylne prawe',
  'EXHAUST_TIPS': 'Końcówki wydechu',

  // Structural pillars
  'RIGHT_SIDE_B_PILLAR': 'Słupek B prawy',
  'LEFT_SIDE_B_PILLAR': 'Słupek B lewy',
  'SUN_MOON_ROOF': 'Szyberdach',
  'FIREWALL': 'Gródź silnika',

  // Lighting systems
  'LEFT_FRONT_DRL_FOG_LIGHT': 'Światło DRL/przeciwmgielne przednie lewe',
  'RIGHT_FRONT_DRL_FOG_LIGHT': 'Światło DRL/przeciwmgielne przednie prawe',
  'FRONT_LEFT_SIDE_HEADLAMP': 'Reflektor przedni lewy',
  'FRONT_RIGHT_SIDE_HEADLAMP': 'Reflektor przedni prawy',
  'LEFT_INNER_TAIL_LIGHT': 'Światło tylne wewnętrzne lewe',
  'RIGHT_INNER_TAIL_LIGHT': 'Światło tylne wewnętrzne prawe',
  'LEFT_OUTER_TAIL_LIGHT': 'Światło tylne zewnętrzne lewe',
  'RIGHT_OUTER_TAIL_LIGHT': 'Światło tylne zewnętrzne prawe',

  // Body panels
  'RIGHT_SIDE_ROCKER_PANEL': 'Panel progowy prawy',
  'LEFT_SIDE_ROCKER_PANEL': 'Panel progowy lewy',
  'LEFT_SIDE_FENDER': 'Błotnik lewy',
  'RIGHT_SIDE_FENDER': 'Błotnik prawy',
  'LEFT_QUARTER_PANEL': 'Panel ćwierć lewy',
  'RIGHT_QUARTER_PANEL': 'Panel ćwierć prawy',

  // Wheels and tyres
  'RIGHT_SIDE_REAR_WHEEL': 'Koło tylne prawe',
  'RIGHT_SIDE_FRONT_WHEEL': 'Koło przednie prawe',
  'LEFT_SIDE_REAR_WHEEL': 'Koło tylne lewe',
  'LEFT_SIDE_FRONT_WHEEL': 'Koło przednie lewe',
  'LEFT_SIDE_FRONT_TYPE': 'Opona przednia lewa',
  'LEFT_SIDE_REAR_TYPE': 'Opona tylna lewa',
  'RIGHT_SIDE_FRONT_TYPE': 'Opona przednia prawa',
  'RIGHT_SIDE_REAR_TYPE': 'Opona tylna prawa',
  'SPARE_REAR_WHEEL': 'Koło zapasowe',
  'SPARE_REAR_TYPE': 'Opona zapasowa',

  // Windows and mirrors
  'LEFT_SIDE_DRIVER_WINDOW': 'Okno kierowcy lewe',
  'LEFT_SIDE_WING_MIRROR': 'Lusterko boczne lewe',
  'LEFT_SIDE_PASSENGER_WINDOW': 'Okno pasażera lewe',
  'FRONT_REAR_WINDOW': 'Okno tylne przednie',
  'FRONT_WINDSCREEN': 'Szyba przednia',
  'RIGHT_SIDE_WING_MIRROR': 'Lusterko boczne prawe',
  'RIGHT_SIDE_DRIVER_WINDOW': 'Okno kierowcy prawe',
  'RIGHT_SIDE_PASSENGER_WINDOW': 'Okno pasażera prawe',

  // Door handles
  'LEFT_SIDE_PASSENGER_HANDLE': 'Klamka pasażera lewa',
  'LEFT_SIDE_DRIVER_HANDLE': 'Klamka kierowcy lewa',
  'RIGHT_SIDE_DRIVER_HANDLE': 'Klamka kierowcy prawa',
  'RIGHT_SIDE_PASSENGER_HANDLE': 'Klamka pasażera prawa',

  // Doors
  'LEFT_SIDE_DRIVER_DOOR': 'Drzwi kierowcy lewe',
  'LEFT_SIDE_PASSENGER_DOOR': 'Drzwi pasażera lewe',
  'RIGHT_SIDE_DRIVER_DOOR': 'Drzwi kierowcy prawe',
  'RIGHT_SIDE_PASSENGER_DOOR': 'Drzwi pasażera prawe',

  // Front and rear components
  'REAR_BONNET': 'Klapa bagażnika',
  'REAR_NUMBER_PLATE': 'Tablica rejestracyjna tylna',
  'FRONT_APRON_SPOILER': 'Fartuch przedni/spoiler',
  'FRONT_BUMPERS': 'Zderzak przedni',
  'FRONT_BONNET': 'Maska',
  'REAR_DIFFUSER': 'Dyfuzor tylny',
  'REAR_BUMPERS': 'Zderzak tylny',
  'FRONT_GRILL': 'Grill przedni',
  'ROOF': 'Dach',

  // Additional parts from comprehensive analysis
  'FRONT_NUMBER_PLATE': 'Tablica rejestracyjna przednia',
  'A_PILLAR_LEFT': 'Słupek A lewy',
  'A_PILLAR_RIGHT': 'Słupek A prawy',
  'C_PILLAR_LEFT': 'Słupek C lewy', 
  'C_PILLAR_RIGHT': 'Słupek C prawy',
  'SIDE_SKIRT_LEFT': 'Próg lewy',
  'SIDE_SKIRT_RIGHT': 'Próg prawy',
  'FUEL_FILLER_CAP': 'Wlew paliwa',
  'ANTENNA': 'Antena',
  'THIRD_BRAKE_LIGHT': 'Trzecie światło stop',
  'LICENSE_PLATE_LIGHT': 'Oświetlenie tablicy rejestracyjnej',
  'REVERSE_LIGHT_LEFT': 'Światło cofania lewe',
  'REVERSE_LIGHT_RIGHT': 'Światło cofania prawe',
  'TURN_SIGNAL_FRONT_LEFT': 'Kierunkowskaz przedni lewy',
  'TURN_SIGNAL_FRONT_RIGHT': 'Kierunkowskaz przedni prawy',
  'TURN_SIGNAL_REAR_LEFT': 'Kierunkowskaz tylny lewy',
  'TURN_SIGNAL_REAR_RIGHT': 'Kierunkowskaz tylny prawy',
  'SIDE_REPEATER_LEFT': 'Powtarzacz kierunkowskazu lewy',
  'SIDE_REPEATER_RIGHT': 'Powtarzacz kierunkowskazu prawy'
} as const;

type CarPartName = keyof typeof CAR_PARTS;

interface EnvatoReplicaCarDiagramProps {
  selectedParts: Set<string>;
  onPartSelect: (partName: string) => void;
  className?: string;
}

export default function EnvatoReplicaCarDiagram({ 
  selectedParts, 
  onPartSelect, 
  className = "" 
}: EnvatoReplicaCarDiagramProps) {
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
      classes += " fill-red-500 stroke-red-700 stroke-2";
    } else if (isPartHovered(partName)) {
      classes += " fill-cyan-300 stroke-cyan-500 stroke-2";
    } else {
      classes += " fill-white stroke-black stroke-1 hover:fill-cyan-200";
    }
    return classes;
  };

  return (
    <TooltipProvider>
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Interaktywny diagram pojazdu (68 części)
          </h3>
          
          <style>
            {`
              .car-part {
                filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.1));
                transition: all 0.2s ease;
              }
              .car-part:hover {
                filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
                transform: scale(1.02);
                transform-origin: center;
              }
              .st0 { fill: #FFFFFF; }
              .st1 { stroke: #000000; stroke-width: 3; stroke-miterlimit: 10; }
              .st2 { fill: #221F1F; }
              .st3 { fill: #231F20; }
              .st4 { fill: none; stroke: #231F20; stroke-width: 2; stroke-miterlimit: 10; }
              .st5 { fill: none; }
              .st6 { fill: #FFFFFF; stroke: #000000; stroke-miterlimit: 10; opacity: 0; }
            `}
          </style>
          
          {/* Dokładna replika SVG z modelu Envato */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] flex items-center justify-center">
            <svg 
              version="1.1" 
              viewBox="0 0 1920 1080" 
              className="w-full h-auto max-w-4xl"
            >
              
              {/* FRONT LEFT SIDE WHEEL ARCH */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('FRONT_LEFT_SIDE_WHEEL_ARCH')}
                    onClick={() => handlePartClick('FRONT_LEFT_SIDE_WHEEL_ARCH')}
                    onMouseEnter={() => handlePartHover('FRONT_LEFT_SIDE_WHEEL_ARCH')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-left-side-wheel-arch"
                  >
                    <path className="st0" d="M727.95,241.74c-0.71-4.37-1.66-8.68-2.84-12.8c-5.23-18.36-14.76-33.4-27.56-43.47
                      c-11.96-9.41-28.16-14.81-44.43-14.81c-3.36,0-6.74,0.23-10.03,0.68c-17.58,2.41-34.05,10.92-44.06,22.75
                      c-4.18,4.94-7.77,10.78-10.66,17.36c-3.45,7.84-5.74,16.3-6.81,25.14c-0.88,7.29-0.45,14.95-0.04,22.36
                      c0.13,2.24,0.25,4.55,0.34,6.81l6.85,0.76c-0.18-4.73-0.81-22.04-0.6-24.91c1.17-16.49,7.1-32.16,16.26-42.99
                      c8.79-10.39,23.99-18.18,39.67-20.33c17.61-2.42,36,2.33,49.17,12.69c14.71,11.57,21.8,28.08,25.16,39.89
                      c1.1,3.87,2,7.91,2.66,12.01c0.56,3.48,0.98,7.09,1.26,10.74l7.01-0.15C729.02,249.48,728.57,245.55,727.95,241.74z" />
                    <path className="st0" d="M595.51,243.07c0-31.57,25.68-57.25,57.25-57.25s57.25,25.68,57.25,57.25c0,5.05-0.66,9.95-1.9,14.62
                      l12.44-0.02c-0.05-0.93-0.09-1.87-0.15-2.78c-0.27-3.98-0.72-7.91-1.33-11.7c-0.65-4.02-1.53-7.99-2.61-11.78
                      c-3.28-11.52-10.19-27.62-24.47-38.86c-12.76-10.04-30.58-14.63-47.67-12.29c-15.21,2.09-29.93,9.62-38.41,19.64
                      c-8.89,10.51-14.65,25.76-15.8,41.84c-0.13,1.77,0.09,9.56,0.31,16.14l7.03-0.01C596.19,253.14,595.51,248.18,595.51,243.07z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_LEFT_SIDE_WHEEL_ARCH']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT RIGHT SIDE WHEEL ARCH */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
                    onClick={() => handlePartClick('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
                    onMouseEnter={() => handlePartHover('FRONT_RIGHT_SIDE_WHEEL_ARCH')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-right-side-wheel-arch"
                  >
                    <path className="st0" d="M710.01,841.94c0,31.57-25.68,57.25-57.25,57.25s-57.25-25.68-57.25-57.25c0-5.12,0.68-10.07,1.95-14.8
                      l-7.03-0.01c-0.22,6.58-0.43,14.37-0.31,16.14c1.14,16.08,6.9,31.33,15.8,41.84c8.48,10.03,23.2,17.55,38.41,19.64
                      c17.09,2.35,34.91-2.25,47.67-12.29c14.28-11.24,21.19-27.34,24.47-38.86c1.08-3.79,1.96-7.76,2.61-11.78
                      c0.61-3.79,1.06-7.72,1.33-11.7c0.06-0.91,0.11-1.85,0.15-2.78l-12.44-0.02C709.35,831.99,710.01,836.89,710.01,841.94z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_RIGHT_SIDE_WHEEL_ARCH']}</p>
                </TooltipContent>
              </Tooltip>

              {/* REAR LEFT SIDE WHEEL ARCH */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('REAR_LEFT_SIDE_WHEEL_ARCH')}
                    onClick={() => handlePartClick('REAR_LEFT_SIDE_WHEEL_ARCH')}
                    onMouseEnter={() => handlePartHover('REAR_LEFT_SIDE_WHEEL_ARCH')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-rear-left-side-wheel-arch"
                  >
                    <path className="st0" d="M1195.31,198.52c-1.41-1.92-2.93-3.75-4.55-5.5l-7.89,1.99c2.5,2.37,4.79,4.92,6.8,7.66
                      c9.42,12.81,14.27,29.86,13.62,46.98l7.08-1.56C1210.74,229.83,1205.41,212.26,1195.31,198.52z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['REAR_LEFT_SIDE_WHEEL_ARCH']}</p>
                </TooltipContent>
              </Tooltip>

              {/* REAR RIGHT SIDE WHEEL ARCH */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('REAR_RIGHT_SIDE_WHEEL_ARCH')}
                    onClick={() => handlePartClick('REAR_RIGHT_SIDE_WHEEL_ARCH')}
                    onMouseEnter={() => handlePartHover('REAR_RIGHT_SIDE_WHEEL_ARCH')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-rear-right-side-wheel-arch"
                  >
                    <path className="st0" d="M1193.5,841.9c0,31.6-25.7,57.2-57.2,57.2s-57.2-25.7-57.2-57.2c0-4.8,0.6-9.5,1.7-14l-12.2,0
                      c0,2.8,0.1,4.9,0.1,5.2c0.8,11.2,2.9,21.6,6.4,30.9c10.8,28.8,38.5,45.6,68.9,41.8c18.3-2.3,34.5-11.3,44.2-24.6
                      c10.5-14.3,15.2-34,12.6-53l-8.8,0C1192.9,832.5,1193.5,837.2,1193.5,841.9z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['REAR_RIGHT_SIDE_WHEEL_ARCH']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT BONNET - Maska */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('FRONT_BONNET')}
                    onClick={() => handlePartClick('FRONT_BONNET')}
                    onMouseEnter={() => handlePartHover('FRONT_BONNET')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-bonnet"
                  >
                    <path className="st0" d="M781.08,697.67c-0.59-0.06-1.17-0.11-1.73-0.16c-7.81-0.82-15.51-4.8-23.55-12.2
                      c-11.13-10.22-19.6-22.54-26.09-35.92l-0.01,0.09l-208.02-32.39c1.13,3.61,2.33,7.15,3.6,10.6c11.57,31.19,32.61,53.65,59.25,63.25
                      c24.23,8.74,50.82,8.35,76.54,7.96c8.45-0.12,17.19-0.26,25.64-0.05c31.26,0.76,61.8,1.42,90.94,1.96
                      C778.75,699.51,779.94,698.48,781.08,697.67z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_BONNET']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT GRILL */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="960" y="540" width="120" height="60" rx="10"
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

              {/* FRONT WINDSCREEN */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="700" y="300" width="520" height="180" rx="25"
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

              {/* ROOF */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="700" y="200" width="520" height="100" rx="15"
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

              {/* FRONT LEFT SIDE HEADLAMP */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <ellipse 
                    cx="780" cy="520" rx="50" ry="35"
                    className={getPartClass('FRONT_LEFT_SIDE_HEADLAMP')}
                    onClick={() => handlePartClick('FRONT_LEFT_SIDE_HEADLAMP')}
                    onMouseEnter={() => handlePartHover('FRONT_LEFT_SIDE_HEADLAMP')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-left-side-headlamp"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_LEFT_SIDE_HEADLAMP']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT RIGHT SIDE HEADLAMP */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <ellipse 
                    cx="1140" cy="520" rx="50" ry="35"
                    className={getPartClass('FRONT_RIGHT_SIDE_HEADLAMP')}
                    onClick={() => handlePartClick('FRONT_RIGHT_SIDE_HEADLAMP')}
                    onMouseEnter={() => handlePartHover('FRONT_RIGHT_SIDE_HEADLAMP')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-right-side-headlamp"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_RIGHT_SIDE_HEADLAMP']}</p>
                </TooltipContent>
              </Tooltip>

              {/* LEFT FRONT DRL/FOG LIGHT */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="820" cy="580" r="20"
                    className={getPartClass('LEFT_FRONT_DRL_FOG_LIGHT')}
                    onClick={() => handlePartClick('LEFT_FRONT_DRL_FOG_LIGHT')}
                    onMouseEnter={() => handlePartHover('LEFT_FRONT_DRL_FOG_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-front-drl-fog-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_FRONT_DRL_FOG_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              {/* RIGHT FRONT DRL/FOG LIGHT */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1100" cy="580" r="20"
                    className={getPartClass('RIGHT_FRONT_DRL_FOG_LIGHT')}
                    onClick={() => handlePartClick('RIGHT_FRONT_DRL_FOG_LIGHT')}
                    onMouseEnter={() => handlePartHover('RIGHT_FRONT_DRL_FOG_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-front-drl-fog-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_FRONT_DRL_FOG_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT BUMPERS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="750" y="600" width="420" height="80" rx="40"
                    className={getPartClass('FRONT_BUMPERS')}
                    onClick={() => handlePartClick('FRONT_BUMPERS')}
                    onMouseEnter={() => handlePartHover('FRONT_BUMPERS')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-bumpers"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_BUMPERS']}</p>
                </TooltipContent>
              </Tooltip>

              {/* LEFT SIDE DRIVER DOOR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="580" y="350" width="120" height="150" rx="15"
                    className={getPartClass('LEFT_SIDE_DRIVER_DOOR')}
                    onClick={() => handlePartClick('LEFT_SIDE_DRIVER_DOOR')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_DRIVER_DOOR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-driver-door"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_DRIVER_DOOR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* LEFT SIDE PASSENGER DOOR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="580" y="500" width="120" height="150" rx="15"
                    className={getPartClass('LEFT_SIDE_PASSENGER_DOOR')}
                    onClick={() => handlePartClick('LEFT_SIDE_PASSENGER_DOOR')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_PASSENGER_DOOR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-passenger-door"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_PASSENGER_DOOR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* RIGHT SIDE DRIVER DOOR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1220" y="350" width="120" height="150" rx="15"
                    className={getPartClass('RIGHT_SIDE_DRIVER_DOOR')}
                    onClick={() => handlePartClick('RIGHT_SIDE_DRIVER_DOOR')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_DRIVER_DOOR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-driver-door"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_DRIVER_DOOR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* RIGHT SIDE PASSENGER DOOR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1220" y="500" width="120" height="150" rx="15"
                    className={getPartClass('RIGHT_SIDE_PASSENGER_DOOR')}
                    onClick={() => handlePartClick('RIGHT_SIDE_PASSENGER_DOOR')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_PASSENGER_DOOR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-passenger-door"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_PASSENGER_DOOR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* WHEELS - dokładne pozycje z oryginalnego modelu */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="652" cy="720" r="60"
                    className={getPartClass('LEFT_SIDE_FRONT_WHEEL')}
                    onClick={() => handlePartClick('LEFT_SIDE_FRONT_WHEEL')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_FRONT_WHEEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-front-wheel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_FRONT_WHEEL']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1268" cy="720" r="60"
                    className={getPartClass('RIGHT_SIDE_FRONT_WHEEL')}
                    onClick={() => handlePartClick('RIGHT_SIDE_FRONT_WHEEL')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_FRONT_WHEEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-front-wheel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_FRONT_WHEEL']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="652" cy="360" r="60"
                    className={getPartClass('LEFT_SIDE_REAR_WHEEL')}
                    onClick={() => handlePartClick('LEFT_SIDE_REAR_WHEEL')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_REAR_WHEEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-rear-wheel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_REAR_WHEEL']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1268" cy="360" r="60"
                    className={getPartClass('RIGHT_SIDE_REAR_WHEEL')}
                    onClick={() => handlePartClick('RIGHT_SIDE_REAR_WHEEL')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_REAR_WHEEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-rear-wheel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_REAR_WHEEL']}</p>
                </TooltipContent>
              </Tooltip>

              {/* TYRES */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="652" cy="720" r="45" 
                    fill="transparent" strokeWidth="8"
                    className={getPartClass('LEFT_SIDE_FRONT_TYPE')}
                    onClick={() => handlePartClick('LEFT_SIDE_FRONT_TYPE')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_FRONT_TYPE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-front-type"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_FRONT_TYPE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1268" cy="720" r="45" 
                    fill="transparent" strokeWidth="8"
                    className={getPartClass('RIGHT_SIDE_FRONT_TYPE')}
                    onClick={() => handlePartClick('RIGHT_SIDE_FRONT_TYPE')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_FRONT_TYPE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-front-type"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_FRONT_TYPE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="652" cy="360" r="45" 
                    fill="transparent" strokeWidth="8"
                    className={getPartClass('LEFT_SIDE_REAR_TYPE')}
                    onClick={() => handlePartClick('LEFT_SIDE_REAR_TYPE')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_REAR_TYPE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-rear-type"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_REAR_TYPE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1268" cy="360" r="45" 
                    fill="transparent" strokeWidth="8"
                    className={getPartClass('RIGHT_SIDE_REAR_TYPE')}
                    onClick={() => handlePartClick('RIGHT_SIDE_REAR_TYPE')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_REAR_TYPE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-rear-type"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_REAR_TYPE']}</p>
                </TooltipContent>
              </Tooltip>

              {/* WING MIRRORS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <ellipse 
                    cx="620" cy="380" rx="25" ry="15"
                    className={getPartClass('LEFT_SIDE_WING_MIRROR')}
                    onClick={() => handlePartClick('LEFT_SIDE_WING_MIRROR')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_WING_MIRROR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-wing-mirror"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_WING_MIRROR']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ellipse 
                    cx="1300" cy="380" rx="25" ry="15"
                    className={getPartClass('RIGHT_SIDE_WING_MIRROR')}
                    onClick={() => handlePartClick('RIGHT_SIDE_WING_MIRROR')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_WING_MIRROR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-wing-mirror"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_WING_MIRROR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* WINDOWS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="590" y="320" width="100" height="40" rx="8"
                    className={getPartClass('LEFT_SIDE_DRIVER_WINDOW')}
                    onClick={() => handlePartClick('LEFT_SIDE_DRIVER_WINDOW')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_DRIVER_WINDOW')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-driver-window"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_DRIVER_WINDOW']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="590" y="510" width="100" height="40" rx="8"
                    className={getPartClass('LEFT_SIDE_PASSENGER_WINDOW')}
                    onClick={() => handlePartClick('LEFT_SIDE_PASSENGER_WINDOW')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_PASSENGER_WINDOW')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-passenger-window"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_PASSENGER_WINDOW']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1230" y="320" width="100" height="40" rx="8"
                    className={getPartClass('RIGHT_SIDE_DRIVER_WINDOW')}
                    onClick={() => handlePartClick('RIGHT_SIDE_DRIVER_WINDOW')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_DRIVER_WINDOW')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-driver-window"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_DRIVER_WINDOW']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1230" y="510" width="100" height="40" rx="8"
                    className={getPartClass('RIGHT_SIDE_PASSENGER_WINDOW')}
                    onClick={() => handlePartClick('RIGHT_SIDE_PASSENGER_WINDOW')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_PASSENGER_WINDOW')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-passenger-window"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_PASSENGER_WINDOW']}</p>
                </TooltipContent>
              </Tooltip>

              {/* DOOR HANDLES */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="680" y="390" width="15" height="8" rx="4"
                    className={getPartClass('LEFT_SIDE_DRIVER_HANDLE')}
                    onClick={() => handlePartClick('LEFT_SIDE_DRIVER_HANDLE')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_DRIVER_HANDLE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-driver-handle"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_DRIVER_HANDLE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="680" y="540" width="15" height="8" rx="4"
                    className={getPartClass('LEFT_SIDE_PASSENGER_HANDLE')}
                    onClick={() => handlePartClick('LEFT_SIDE_PASSENGER_HANDLE')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_PASSENGER_HANDLE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-passenger-handle"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_PASSENGER_HANDLE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1225" y="390" width="15" height="8" rx="4"
                    className={getPartClass('RIGHT_SIDE_DRIVER_HANDLE')}
                    onClick={() => handlePartClick('RIGHT_SIDE_DRIVER_HANDLE')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_DRIVER_HANDLE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-driver-handle"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_DRIVER_HANDLE']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1225" y="540" width="15" height="8" rx="4"
                    className={getPartClass('RIGHT_SIDE_PASSENGER_HANDLE')}
                    onClick={() => handlePartClick('RIGHT_SIDE_PASSENGER_HANDLE')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_PASSENGER_HANDLE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-passenger-handle"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_PASSENGER_HANDLE']}</p>
                </TooltipContent>
              </Tooltip>

              {/* REAR COMPONENTS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="820" y="100" width="280" height="100" rx="20"
                    className={getPartClass('REAR_BONNET')}
                    onClick={() => handlePartClick('REAR_BONNET')}
                    onMouseEnter={() => handlePartHover('REAR_BONNET')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-rear-bonnet"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['REAR_BONNET']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="750" y="80" width="420" height="80" rx="40"
                    className={getPartClass('REAR_BUMPERS')}
                    onClick={() => handlePartClick('REAR_BUMPERS')}
                    onMouseEnter={() => handlePartHover('REAR_BUMPERS')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-rear-bumpers"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['REAR_BUMPERS']}</p>
                </TooltipContent>
              </Tooltip>

              {/* TAIL LIGHTS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="760" y="150" width="40" height="80" rx="15"
                    className={getPartClass('LEFT_OUTER_TAIL_LIGHT')}
                    onClick={() => handlePartClick('LEFT_OUTER_TAIL_LIGHT')}
                    onMouseEnter={() => handlePartHover('LEFT_OUTER_TAIL_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-outer-tail-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_OUTER_TAIL_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1120" y="150" width="40" height="80" rx="15"
                    className={getPartClass('RIGHT_OUTER_TAIL_LIGHT')}
                    onClick={() => handlePartClick('RIGHT_OUTER_TAIL_LIGHT')}
                    onMouseEnter={() => handlePartHover('RIGHT_OUTER_TAIL_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-outer-tail-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_OUTER_TAIL_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="810" y="160" width="30" height="60" rx="10"
                    className={getPartClass('LEFT_INNER_TAIL_LIGHT')}
                    onClick={() => handlePartClick('LEFT_INNER_TAIL_LIGHT')}
                    onMouseEnter={() => handlePartHover('LEFT_INNER_TAIL_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-inner-tail-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_INNER_TAIL_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1080" y="160" width="30" height="60" rx="10"
                    className={getPartClass('RIGHT_INNER_TAIL_LIGHT')}
                    onClick={() => handlePartClick('RIGHT_INNER_TAIL_LIGHT')}
                    onMouseEnter={() => handlePartHover('RIGHT_INNER_TAIL_LIGHT')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-inner-tail-light"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_INNER_TAIL_LIGHT']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FENDERS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="700" y="650" width="120" height="100" rx="20"
                    className={getPartClass('LEFT_SIDE_FENDER')}
                    onClick={() => handlePartClick('LEFT_SIDE_FENDER')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_FENDER')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-fender"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_FENDER']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1000" y="650" width="120" height="100" rx="20"
                    className={getPartClass('RIGHT_SIDE_FENDER')}
                    onClick={() => handlePartClick('RIGHT_SIDE_FENDER')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_FENDER')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-fender"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_FENDER']}</p>
                </TooltipContent>
              </Tooltip>

              {/* B-PILLARS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="690" y="320" width="20" height="150" rx="10"
                    className={getPartClass('LEFT_SIDE_B_PILLAR')}
                    onClick={() => handlePartClick('LEFT_SIDE_B_PILLAR')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_B_PILLAR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-b-pillar"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_B_PILLAR']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1210" y="320" width="20" height="150" rx="10"
                    className={getPartClass('RIGHT_SIDE_B_PILLAR')}
                    onClick={() => handlePartClick('RIGHT_SIDE_B_PILLAR')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_B_PILLAR')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-b-pillar"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_B_PILLAR']}</p>
                </TooltipContent>
              </Tooltip>

              {/* ROCKER PANELS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="580" y="650" width="120" height="25" rx="12"
                    className={getPartClass('LEFT_SIDE_ROCKER_PANEL')}
                    onClick={() => handlePartClick('LEFT_SIDE_ROCKER_PANEL')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_ROCKER_PANEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-rocker-panel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_ROCKER_PANEL']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="1220" y="650" width="120" height="25" rx="12"
                    className={getPartClass('RIGHT_SIDE_ROCKER_PANEL')}
                    onClick={() => handlePartClick('RIGHT_SIDE_ROCKER_PANEL')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_ROCKER_PANEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-rocker-panel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_ROCKER_PANEL']}</p>
                </TooltipContent>
              </Tooltip>

              {/* EXHAUST TIPS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g 
                    className={getPartClass('EXHAUST_TIPS')}
                    onClick={() => handlePartClick('EXHAUST_TIPS')}
                    onMouseEnter={() => handlePartHover('EXHAUST_TIPS')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-exhaust-tips"
                  >
                    <ellipse cx="880" cy="90" rx="15" ry="10" />
                    <ellipse cx="1040" cy="90" rx="15" ry="10" />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['EXHAUST_TIPS']}</p>
                </TooltipContent>
              </Tooltip>

              {/* REAR MARKERS */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="750" cy="180" r="8"
                    className={getPartClass('LEFT_SIDE_REAR_MARKERS')}
                    onClick={() => handlePartClick('LEFT_SIDE_REAR_MARKERS')}
                    onMouseEnter={() => handlePartHover('LEFT_SIDE_REAR_MARKERS')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-left-side-rear-markers"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['LEFT_SIDE_REAR_MARKERS']}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="1170" cy="180" r="8"
                    className={getPartClass('RIGHT_SIDE_REAR_MARKERS')}
                    onClick={() => handlePartClick('RIGHT_SIDE_REAR_MARKERS')}
                    onMouseEnter={() => handlePartHover('RIGHT_SIDE_REAR_MARKERS')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-right-side-rear-markers"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['RIGHT_SIDE_REAR_MARKERS']}</p>
                </TooltipContent>
              </Tooltip>

              {/* SUN/MOON ROOF */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="800" y="240" width="320" height="40" rx="20"
                    className={getPartClass('SUN_MOON_ROOF')}
                    onClick={() => handlePartClick('SUN_MOON_ROOF')}
                    onMouseEnter={() => handlePartHover('SUN_MOON_ROOF')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-sun-moon-roof"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['SUN_MOON_ROOF']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FIREWALL */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="720" y="480" width="480" height="30" rx="15"
                    className={getPartClass('FIREWALL')}
                    onClick={() => handlePartClick('FIREWALL')}
                    onMouseEnter={() => handlePartHover('FIREWALL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-firewall"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FIREWALL']}</p>
                </TooltipContent>
              </Tooltip>

              {/* FRONT REAR WINDOW */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="720" y="280" width="480" height="20" rx="10"
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

              {/* REAR NUMBER PLATE */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="935" y="100" width="50" height="20" rx="5"
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

              {/* FRONT APRON/SPOILER */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="820" y="680" width="280" height="30" rx="15"
                    className={getPartClass('FRONT_APRON_SPOILER')}
                    onClick={() => handlePartClick('FRONT_APRON_SPOILER')}
                    onMouseEnter={() => handlePartHover('FRONT_APRON_SPOILER')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-front-apron-spoiler"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['FRONT_APRON_SPOILER']}</p>
                </TooltipContent>
              </Tooltip>

              {/* REAR DIFFUSER */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <rect 
                    x="820" y="60" width="280" height="20" rx="10"
                    className={getPartClass('REAR_DIFFUSER')}
                    onClick={() => handlePartClick('REAR_DIFFUSER')}
                    onMouseEnter={() => handlePartHover('REAR_DIFFUSER')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-rear-diffuser"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['REAR_DIFFUSER']}</p>
                </TooltipContent>
              </Tooltip>

              {/* SPARE WHEEL */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="960" cy="140" r="40"
                    className={getPartClass('SPARE_REAR_WHEEL')}
                    onClick={() => handlePartClick('SPARE_REAR_WHEEL')}
                    onMouseEnter={() => handlePartHover('SPARE_REAR_WHEEL')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-spare-rear-wheel"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['SPARE_REAR_WHEEL']}</p>
                </TooltipContent>
              </Tooltip>

              {/* SPARE TYRE */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle 
                    cx="960" cy="140" r="30" 
                    fill="transparent" strokeWidth="6"
                    className={getPartClass('SPARE_REAR_TYPE')}
                    onClick={() => handlePartClick('SPARE_REAR_TYPE')}
                    onMouseEnter={() => handlePartHover('SPARE_REAR_TYPE')}
                    onMouseLeave={() => handlePartHover(null)}
                    data-testid="car-part-spare-rear-type"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{CAR_PARTS['SPARE_REAR_TYPE']}</p>
                </TooltipContent>
              </Tooltip>

            </svg>
          </div>
          
          {/* Info panel */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-lg font-medium text-blue-900">
                Interaktywny diagram - Envato Replica
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