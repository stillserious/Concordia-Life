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
            
            {/* Znaczniki na częściach samochodu */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* Lewe przednie drzwi - okrągły znacznik na właściwym miejscu */}
              <div 
                className="absolute cursor-pointer pointer-events-auto flex items-center justify-center"
                style={{
                  left: '22%',
                  top: '32%',
                  width: '20px',
                  height: '20px',
                  backgroundColor: selectedParts.has('front-door-left') ? '#dc2626' : '#3b82f6',
                  border: '2px solid white',
                  borderRadius: '50%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
                title="Drzwi przednie lewe"
              >
                <span className="text-white text-xs font-bold">
                  {selectedParts.has('front-door-left') ? '✓' : '1'}
                </span>
              </div>
              
            </div>
          </div>
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