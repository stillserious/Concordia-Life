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
        <div className="md:hidden">
          {/* Progress circles */}
          <div className="flex items-center justify-between mb-3 px-4">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="relative flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                    index < currentStep
                      ? "bg-blue-600"
                      : index === currentStep - 1
                      ? "bg-blue-600"
                      : "bg-blue-300"
                  }`}>
                    {index + 1}
                  </div>
                  {/* Triangle pointer for current step */}
                  {index === currentStep - 1 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-600"></div>
                    </div>
                  )}
                </div>
                {/* Connecting line */}
                {index < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep - 1 ? "bg-blue-600" : "bg-blue-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Current step label */}
          <div className="text-center px-4">
            <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
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