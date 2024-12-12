"use client";

import { useState } from 'react';
import BasicInfo from './components/Signup';
import { PreferencesStep } from './components/PreferencesStep';
import { FinalStep } from './components/FinalStep';

const SignupFlow = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return <BasicInfo onNext={() => setStep(2)} />;
      case 2:
        return <PreferencesStep onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3:
        return <FinalStep onBack={() => setStep(2)} />;
      default:
        return <BasicInfo onNext={() => setStep(2)} />;
    }
  };

  return (
    <div className="container mx-auto">
      {renderStep()}
    </div>
  );
};

export default SignupFlow;