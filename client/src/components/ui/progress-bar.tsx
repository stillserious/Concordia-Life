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

  const currentStepName = stepLabels?.[currentStep - 1] || '';
  const nextStepName = stepLabels?.[currentStep] || '';

  return (
    <div className="w-full bg-white border-b border-gray-50">
      <div className="w-full bg-gray-50 h-1">
        <div
          className="bg-blue-300 h-1 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="space-y-2">
          {/* Krok X z Y */}
          <div className="text-sm font-medium text-blue-700">
            Krok {currentStep} z {totalSteps}
          </div>
          
          {/* Nazwa aktualnego kroku */}
          <div className="text-base font-semibold text-gray-900">
            {currentStepName}
          </div>
          
          {/* Informacja o następnym kroku */}
          {nextStepName && (
            <div className="text-sm text-gray-600">
              Następny krok: {nextStepName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}