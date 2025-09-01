import { useState } from "react";
import InteractiveCarSVG from "./InteractiveCarSVG";

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'hood-left': 'Maska (widok z lewej)',
  'hood-right': 'Maska (widok z prawej)',
  'hood-front': 'Maska (widok z przodu)',
  'front-door-left': 'Drzwi przednie lewe',
  'front-door-right': 'Drzwi przednie prawe',
  'rear-door-left': 'Drzwi tylne lewe',
  'rear-door-right': 'Drzwi tylne prawe',
  'roof-left': 'Dach (widok z lewej)',
  'roof-right': 'Dach (widok z prawej)',
  'trunk-left': 'Bagażnik (widok z lewej)',
  'trunk-right': 'Bagażnik (widok z prawej)',
  'trunk-rear': 'Bagażnik (widok z tyłu)',
  'body-left': 'Nadwozie (widok z lewej)',
  'body-right': 'Nadwozie (widok z prawej)',
  'body-front': 'Nadwozie (widok z przodu)',
  'body-rear': 'Nadwozie (widok z tyłu)',
  'front-bumper': 'Zderzak przedni',
  'rear-bumper': 'Zderzak tylny'
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
          <InteractiveCarSVG 
            selectedParts={selectedParts}
            onPartSelect={handlePartClick}
          />
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