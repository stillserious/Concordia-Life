import { useState } from "react";
import toyotaPriusSvg from "../assets/toyota-prius-full.svg";

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
  'body': 'Nadwozie'
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
  const handlePartClick = (partName: CarPartName) => {
    onPartSelect(partName);
  };

  return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full bg-gray-50 rounded-lg border shadow-sm p-8">
          <div className="relative">
            {/* Profesjonalny SVG Toyota Prius */}
            <img 
              src={toyotaPriusSvg} 
              alt="Toyota Prius Professional Model" 
              className="w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
            
            {/* Interaktywne obszary - rozpoczynam od nowa */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* LEWY GÓRNY ROG - WIDOK BOCZNY Z LEWEJ */}
              {/* Lewe przednie drzwi - dokładnie dopasowane do modelu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  left: '14%',
                  top: '22%',
                  width: '7%',
                  height: '10%',
                  backgroundColor: selectedParts.has('front-door-left') ? 'rgba(255, 107, 107, 0.4)' : 'transparent',
                  border: selectedParts.has('front-door-left') ? '2px solid #cc0000' : '2px solid transparent',
                  borderRadius: '4px'
                }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
              />
              
            </div>
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