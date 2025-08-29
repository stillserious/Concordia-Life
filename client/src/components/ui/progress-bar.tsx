interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white border-t border-gray-50 sticky bottom-0 z-50">
      <div className="w-full bg-gray-50 h-1">
        <div
          className="bg-blue-300 h-1 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {stepLabels?.map((label, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 text-xs ${
                  index < currentStep
                    ? "text-blue-600"
                    : index === currentStep - 1
                    ? "text-blue-700 font-medium"
                    : "text-gray-400"
                }`}
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