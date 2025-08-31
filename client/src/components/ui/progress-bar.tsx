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
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Step label above circle */}
                <div className={`text-xs font-medium mb-2 text-center ${
                  index < currentStep
                    ? "text-blue-600"
                    : index === currentStep - 1
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}>
                  {label}
                </div>
                
                <div className="flex items-center w-full">
                  {/* Circle */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm border-2 ${
                      index < currentStep
                        ? "bg-white border-blue-600 text-blue-600"
                        : index === currentStep - 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Connecting line */}
                  {index < stepLabels.length - 1 && (
                    <div className={`flex-1 h-0.5 ml-2 ${
                      index < currentStep - 1 ? "bg-blue-600" : "bg-gray-300"
                    }`}></div>
                  )}
                </div>
              </div>
            ))}
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