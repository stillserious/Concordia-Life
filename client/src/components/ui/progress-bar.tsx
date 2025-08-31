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
    <div className="w-full bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 shadow-sm">
      {/* Enhanced Progress Bar */}
      <div className="w-full bg-gradient-to-r from-slate-100 to-slate-200 h-2 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 transition-all duration-700 ease-out relative"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-4">
        {/* Mobile: Enhanced Visual progress */}
        <div className="md:hidden py-4">
          <div className="flex items-center justify-center max-w-sm mx-auto">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center">
                {/* Enhanced Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 relative transition-all duration-300 transform ${
                    index < currentStep - 1
                      ? "bg-gradient-to-br from-green-400 to-green-600 text-white cursor-pointer hover:scale-110 hover:shadow-lg shadow-green-200"
                      : index === currentStep - 1
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                      : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500 cursor-pointer hover:scale-105 hover:from-slate-300 hover:to-slate-400"
                  } ${stepRoutes && index !== currentStep - 1 ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                      setLocation(stepRoutes[index]);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }
                  }}
                >
                  {/* Glow ring for active step */}
                  {index === currentStep - 1 && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse -z-10 scale-125"></div>
                  )}
                  
                  {index < currentStep - 1 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Enhanced Connecting line */}
                {index < stepLabels.length - 1 && (
                  <div className={`w-8 h-1 mx-3 rounded-full transition-all duration-500 ${
                    index < currentStep - 1 
                      ? "bg-gradient-to-r from-green-400 to-green-600 shadow-sm" 
                      : "bg-gradient-to-r from-slate-200 to-slate-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Enhanced Current step label */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stepLabels?.[currentStep - 1]}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: Enhanced Detailed steps */}
        <div className="hidden md:flex items-center justify-between py-2">
          <div className="flex items-center w-full relative">
            {stepLabels?.map((label, index) => (
              <div
                key={index}
                className={`flex flex-col items-center flex-1 relative transition-all duration-300 ${
                  stepRoutes && index !== currentStep - 1 ? "cursor-pointer group" : ""
                }`}
                onClick={() => {
                  if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                    setLocation(stepRoutes[index]);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }
                }}
              >
                {/* Step Circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm relative transition-all duration-300 z-10 ${
                  index < currentStep - 1
                    ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md group-hover:scale-110 group-hover:shadow-lg"
                    : index === currentStep - 1
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                    : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500 group-hover:scale-105 group-hover:from-slate-300 group-hover:to-slate-400"
                }`}>
                  {/* Active step glow */}
                  {index === currentStep - 1 && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse -z-10 scale-150 opacity-50"></div>
                  )}
                  
                  {index < currentStep - 1 ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Step Label */}
                <div className={`mt-3 text-center transition-all duration-300 ${
                  index < currentStep
                    ? "text-green-700 font-semibold group-hover:text-green-800"
                    : index === currentStep - 1
                    ? "text-blue-700 font-bold"
                    : "text-slate-500 group-hover:text-slate-700"
                }`}>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/80 border border-slate-200 shadow-sm">
                    {label}
                  </span>
                </div>
                
                {/* Connecting Line */}
                {index < stepLabels.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 -z-10">
                    <div className={`h-full transition-all duration-500 ${
                      index < currentStep - 1 
                        ? "bg-gradient-to-r from-green-400 to-green-600" 
                        : "bg-gradient-to-r from-slate-200 to-slate-300"
                    }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}