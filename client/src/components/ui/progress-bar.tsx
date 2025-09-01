import { useLocation } from "wouter";
import { LinearProgress, Box } from '@mui/material';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  stepRoutes?: string[];
  isCompleted?: boolean;
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels, stepRoutes, isCompleted = false }: ProgressBarProps) {
  const progressPercentage = isCompleted ? 100 : (currentStep / totalSteps) * 100;
  const [, setLocation] = useLocation();

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 pt-2 pb-1">
        {/* Mobile: Simple progress with circles */}
        <div className="md:hidden py-2">
          <div className="flex items-center justify-center max-w-sm mx-auto">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center">
                {/* Simple Circle */}
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-xs flex-shrink-0 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : index < currentStep - 1
                      ? "bg-[hsl(207,90%,54%)] text-white cursor-pointer hover:bg-[hsl(210,79%,46%)]"
                      : index === currentStep - 1
                      ? "bg-[hsl(207,90%,54%)] text-white"
                      : "bg-blue-100 text-blue-400 cursor-pointer hover:bg-blue-200"
                  } ${stepRoutes && index !== currentStep - 1 ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                      setLocation(stepRoutes[index]);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }
                  }}
                >
                  {(isCompleted || index < currentStep - 1) ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Connecting line */}
                {index < stepLabels.length - 1 && (
                  <div className={`w-4 h-0.5 mx-1 transition-all duration-300 ${
                    isCompleted ? "bg-green-600" : index < currentStep - 1 ? "bg-[hsl(207,90%,54%)]" : "bg-blue-100"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Current step name */}
          <div className="text-center mt-3">
            <span className="text-sm font-medium text-gray-700">
              {stepLabels?.[currentStep - 1]}
            </span>
          </div>
        </div>

        {/* Desktop: Compact step indicators */}
        <div className="hidden md:flex flex-col py-2">
          {/* Circles only - no connecting lines */}
          <div className="flex justify-between items-start w-full mb-2">
            {/* Circles */}
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isCompleted
                      ? "bg-green-600"
                      : index < currentStep - 1
                      ? "bg-[hsl(207,90%,54%)]"
                      : index === currentStep - 1
                      ? "bg-[hsl(207,90%,54%)]"
                      : "bg-blue-100"
                  } ${stepRoutes && index !== currentStep - 1 ? "hover:scale-110" : ""}`}
                  onClick={() => {
                    if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                      setLocation(stepRoutes[index]);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }
                  }}
                ></div>
                
                {/* Label directly under each circle */}
                <div className="mt-2 text-xs text-center leading-tight">
                  <div 
                    className={`transition-all duration-300 cursor-pointer ${
                      isCompleted
                        ? "text-green-600 font-medium"
                        : index < currentStep - 1
                        ? "text-[hsl(207,90%,54%)] hover:text-[hsl(210,79%,46%)]"
                        : index === currentStep - 1
                        ? "text-[hsl(207,90%,54%)] font-medium"
                        : "text-blue-400 hover:text-blue-600"
                    }`}
                    onClick={() => {
                      if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                        setLocation(stepRoutes[index]);
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                      }
                    }}
                  >
                    {(() => {
                      // Split label into words and break into two lines if needed
                      const words = label.split(' ');
                      const shouldBreak = words.length > 1;
                      
                      return shouldBreak ? (
                        <>
                          <div>{words[0]}</div>
                          <div>{words.slice(1).join(' ')}</div>
                        </>
                      ) : (
                        <div>{label}</div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}