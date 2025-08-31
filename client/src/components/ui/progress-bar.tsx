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
      
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-1 sm:gap-4">
            {stepLabels?.map((label, index) => (
              <div
                key={index}
                className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm min-h-[44px] sm:min-h-auto px-1 sm:px-0 py-1 sm:py-0 ${
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
                <div className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                  index < currentStep
                    ? "bg-blue-600"
                    : index === currentStep - 1
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}></div>
                <span className="whitespace-nowrap hidden sm:inline">{label}</span>
                <span className="sm:hidden text-center min-w-[12px]">{index + 1}</span>
                {index < stepLabels.length - 1 && (
                  <div className="hidden sm:block w-4 lg:w-8 h-px bg-gray-200 ml-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Show current step name below */}
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs font-medium text-blue-700">
            {stepLabels?.[currentStep - 1]}
          </span>
        </div>
      </div>
    </div>
  );
}