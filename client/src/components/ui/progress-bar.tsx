interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-48">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600">
          Krok {currentStep} z {totalSteps}
        </span>
        <span className="text-xs text-gray-400">
          {Math.round(progressPercentage)}% ukończone
        </span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-blue-400 h-1.5 rounded-full transition-all duration-300 ease-in-out"
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