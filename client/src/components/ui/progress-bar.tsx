interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Krok {currentStep} z {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% ukończone
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {stepLabels && (
        <div className="flex justify-between mt-3">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`text-xs font-medium ${
                index < currentStep
                  ? "text-blue-600"
                  : index === currentStep - 1
                  ? "text-blue-800"
                  : "text-gray-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}