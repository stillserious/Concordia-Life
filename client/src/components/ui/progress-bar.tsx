import { useLocation } from "wouter";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  stepRoutes?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels, stepRoutes }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const [, setLocation] = useLocation();

  return (
    <div className="w-full bg-white border-b border-gray-50">
      <div className="w-full bg-gray-50 h-1">
        <div
          className="bg-blue-300 h-1 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-3">
        {/* Mobile: Visual progress with circles */}
        <div className="md:hidden py-4">
          <div className="flex items-center justify-between px-4">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center flex-1">
                {/* Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${
                    index < currentStep
                      ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                      : index === currentStep - 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-white cursor-pointer hover:bg-gray-400"
                  } ${stepRoutes && index !== currentStep - 1 ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                      setLocation(stepRoutes[index]);
                    }
                  }}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : index === currentStep - 1 ? (
                    index + 1
                  ) : index >= currentStep ? (
                    index + 1
                  ) : null}
                </div>
                
                {/* Connecting line */}
                {index < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 ${
                    index < currentStep - 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Current step name below on mobile */}
          <div className="text-center mt-3">
            <span className="text-sm font-medium text-gray-700">
              {stepLabels?.[currentStep - 1]}
            </span>
          </div>
        </div>

        {/* Desktop: Detailed steps */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {stepLabels?.map((label, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 text-xs whitespace-nowrap ${
                  index < currentStep
                    ? "text-blue-600 cursor-pointer hover:text-blue-800"
                    : index === currentStep - 1
                    ? "text-blue-700 font-medium"
                    : "text-gray-400 cursor-pointer hover:text-gray-600"
                } ${stepRoutes && index !== currentStep - 1 ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                    setLocation(stepRoutes[index]);
                  }
                }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  index < currentStep
                    ? "bg-blue-600"
                    : index === currentStep - 1
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}></div>
                <span>{label}</span>
                {index < stepLabels.length - 1 && (
                  <div className="w-8 h-px bg-gray-200 ml-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}