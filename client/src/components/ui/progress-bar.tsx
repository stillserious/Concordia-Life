import { useLocation } from "wouter";
import { LinearProgress, Box } from '@mui/material';

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
    <div className="w-full bg-white border-b border-gray-200">
      {/* Material UI Progress Bar */}
      <LinearProgress 
        variant="determinate" 
        value={progressPercentage}
        sx={{
          height: 4,
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'hsl(207, 90%, 54%)',
            transition: 'transform 0.7s ease-out'
          },
          '& .MuiLinearProgress-root': {
            backgroundColor: '#f1f5f9'
          }
        }}
      />
      
      <div className="max-w-4xl mx-auto px-6 pt-2 pb-1">
        {/* Mobile: Simple progress with circles */}
        <div className="md:hidden py-2">
          <div className="flex items-center justify-center max-w-sm mx-auto">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center">
                {/* Simple Circle */}
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 transition-all duration-300 ${
                    index < currentStep - 1
                      ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                      : index === currentStep - 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600 cursor-pointer hover:bg-gray-400"
                  } ${stepRoutes && index !== currentStep - 1 ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                      setLocation(stepRoutes[index]);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }
                  }}
                >
                  {index < currentStep - 1 ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Connecting line */}
                {index < stepLabels.length - 1 && (
                  <div className={`w-6 h-0.5 mx-1 transition-all duration-300 ${
                    index < currentStep - 1 ? "bg-blue-600" : "bg-gray-300"
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
          {/* Circles and lines row */}
          <div className="flex items-center w-full mb-2">
            {stepLabels?.map((label, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex justify-center">
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      index < currentStep - 1
                        ? "bg-blue-600"
                        : index === currentStep - 1
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    } ${stepRoutes && index !== currentStep - 1 ? "hover:scale-110" : ""}`}
                    onClick={() => {
                      if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                        setLocation(stepRoutes[index]);
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                      }
                    }}
                  ></div>
                </div>
                
                {/* Connecting line at same level as circles */}
                {index < stepLabels.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-all duration-300 ${
                    index < currentStep - 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Labels row */}
          <div className="flex w-full">
            {stepLabels?.map((label, index) => {
              // Split label into words and break into two lines if needed
              const words = label.split(' ');
              const shouldBreak = words.length > 1;
              
              return (
                <div key={index} className="flex-1 flex justify-center">
                  <div 
                    className={`text-xs text-center leading-tight transition-all duration-300 cursor-pointer ${
                      index < currentStep - 1
                        ? "text-blue-600 hover:text-blue-700"
                        : index === currentStep - 1
                        ? "text-blue-600 font-medium"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    onClick={() => {
                      if (stepRoutes && stepRoutes[index] && index !== currentStep - 1) {
                        setLocation(stepRoutes[index]);
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                      }
                    }}
                  >
                    {shouldBreak ? (
                      <>
                        <div>{words[0]}</div>
                        <div>{words.slice(1).join(' ')}</div>
                      </>
                    ) : (
                      <div>{label}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}