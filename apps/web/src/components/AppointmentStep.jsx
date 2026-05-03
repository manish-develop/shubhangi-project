import React from 'react';
import { Check } from 'lucide-react';

const AppointmentStep = ({ step, currentStep, title, children }) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className={`transition-all duration-300 ${isActive ? 'block' : 'hidden'}`}>
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 flex-shrink-0 ${
            isCompleted
              ? 'bg-primary text-primary-foreground'
              : isActive
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step}
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="pl-0 md:pl-14">{children}</div>
    </div>
  );
};

export default AppointmentStep;