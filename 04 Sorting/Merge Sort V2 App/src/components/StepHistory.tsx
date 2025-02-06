import React from 'react';
import { ArrowDownRight, ArrowUpLeft, Combine } from 'lucide-react';

interface Step {
  type: 'split' | 'merge' | 'compare';
  description: string;
  timestamp: number;
  values: number[];
}

interface StepHistoryProps {
  steps: Step[];
  currentStep: number;
}

export const StepHistory: React.FC<StepHistoryProps> = ({ steps, currentStep }) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'split':
        return <ArrowDownRight className="text-blue-500" />;
      case 'merge':
        return <Combine className="text-green-500" />;
      case 'compare':
        return <ArrowUpLeft className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step History</h2>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={index}
            data-active={index === currentStep}
            className={`p-4 rounded-lg transition-all duration-300 ${
              index === currentStep
                ? 'bg-blue-50 border border-blue-200 scale-105'
                : index < currentStep
                ? 'bg-gray-50 border border-gray-200 opacity-50'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {getStepIcon(step.type)}
              <span className="font-medium capitalize text-gray-700">{step.type}</span>
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {step.values.map((value, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};