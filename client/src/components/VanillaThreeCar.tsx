import { useState } from "react";
import toyotaPriusSvg from "../assets/toyota-prius-full.svg";

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'front-door-left': 'Drzwi przednie lewe',
  'front-door-right': 'Drzwi przednie prawe',
  'rear-door-left': 'Drzwi tylne lewe',
  'rear-door-right': 'Drzwi tylne prawe',
  'hood': 'Maska',
  'trunk': 'Bagażnik',
  'front-bumper': 'Zderzak przedni',
  'rear-bumper': 'Zderzak tylny',
  'roof': 'Dach',
  'front-fender-left': 'Błotnik przedni lewy',
  'front-fender-right': 'Błotnik przedni prawy',
  'rear-fender-left': 'Błotnik tylny lewy',
  'rear-fender-right': 'Błotnik tylny prawy'
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
            {/* Oryginalny profesjonalny SVG Toyota Prius */}
            <img 
              src={toyotaPriusSvg} 
              alt="Toyota Prius - profesjonalny model" 
              className="w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
            
            {/* Precyzyjne nakładki na części samochodu */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* Drzwi przednie lewe - dokładna pozycja */}
              {selectedParts.has('front-door-left') && (
                <div 
                  className="absolute"
                  style={{
                    left: '14%',
                    top: '42%',
                    width: '12%',
                    height: '25%',
                    backgroundColor: '#dc2626',
                    opacity: 0.6,
                    borderRadius: '3px',
                    border: '2px solid #dc2626'
                  }}
                />
              )}
              
              {/* Drzwi tylne lewe */}
              {selectedParts.has('rear-door-left') && (
                <div 
                  className="absolute"
                  style={{
                    left: '28%',
                    top: '42%',
                    width: '12%',
                    height: '25%',
                    backgroundColor: '#dc2626',
                    opacity: 0.6,
                    borderRadius: '3px',
                    border: '2px solid #dc2626'
                  }}
                />
              )}
              
              {/* Maska */}
              {selectedParts.has('hood') && (
                <div 
                  className="absolute"
                  style={{
                    left: '6%',
                    top: '45%',
                    width: '10%',
                    height: '20%',
                    backgroundColor: '#dc2626',
                    opacity: 0.6,
                    borderRadius: '3px',
                    border: '2px solid #dc2626'
                  }}
                />
              )}
              
              {/* Bagażnik */}
              {selectedParts.has('trunk') && (
                <div 
                  className="absolute"
                  style={{
                    left: '70%',
                    top: '45%',
                    width: '10%',
                    height: '20%',
                    backgroundColor: '#dc2626',
                    opacity: 0.6,
                    borderRadius: '3px',
                    border: '2px solid #dc2626'
                  }}
                />
              )}
              
              {/* Klikalne obszary - niewidoczne przyciski */}
              <div 
                className="absolute cursor-pointer pointer-events-auto hover:bg-blue-200 hover:bg-opacity-30 transition-all"
                style={{
                  left: '14%',
                  top: '42%',
                  width: '12%',
                  height: '25%',
                  border: selectedParts.has('front-door-left') ? '3px solid #dc2626' : '2px dashed rgba(59, 130, 246, 0.4)',
                  borderRadius: '3px'
                }}
                onClick={() => handlePartClick('front-door-left')}
                data-testid="car-part-front-door-left"
                title="Drzwi przednie lewe"
              />
              
              <div 
                className="absolute cursor-pointer pointer-events-auto hover:bg-blue-200 hover:bg-opacity-30 transition-all"
                style={{
                  left: '28%',
                  top: '42%',
                  width: '12%',
                  height: '25%',
                  border: selectedParts.has('rear-door-left') ? '3px solid #dc2626' : '2px dashed rgba(59, 130, 246, 0.4)',
                  borderRadius: '3px'
                }}
                onClick={() => handlePartClick('rear-door-left')}
                data-testid="car-part-rear-door-left"
                title="Drzwi tylne lewe"
              />
              
              <div 
                className="absolute cursor-pointer pointer-events-auto hover:bg-blue-200 hover:bg-opacity-30 transition-all"
                style={{
                  left: '6%',
                  top: '45%',
                  width: '10%',
                  height: '20%',
                  border: selectedParts.has('hood') ? '3px solid #dc2626' : '2px dashed rgba(59, 130, 246, 0.4)',
                  borderRadius: '3px'
                }}
                onClick={() => handlePartClick('hood')}
                data-testid="car-part-hood"
                title="Maska"
              />
              
              <div 
                className="absolute cursor-pointer pointer-events-auto hover:bg-blue-200 hover:bg-opacity-30 transition-all"
                style={{
                  left: '70%',
                  top: '45%',
                  width: '10%',
                  height: '20%',
                  border: selectedParts.has('trunk') ? '3px solid #dc2626' : '2px dashed rgba(59, 130, 246, 0.4)',
                  borderRadius: '3px'
                }}
                onClick={() => handlePartClick('trunk')}
                data-testid="car-part-trunk"
                title="Bagażnik"
              />
              
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