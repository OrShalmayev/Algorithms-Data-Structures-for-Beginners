import React from 'react';
import { SplitSquareHorizontal as SplitHorizontal, GitMerge } from 'lucide-react';

interface Step {
  type: 'split' | 'merge';
  description: string;
  leftArray?: number[];
  rightArray?: number[];
  result?: number[];
  timestamp: number;
}

interface StepHistoryProps {
  steps: Step[];
}

export const StepHistory: React.FC<StepHistoryProps> = ({ steps }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Step History</h2>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.timestamp}
            className="border-l-2 border-indigo-500 pl-4 py-2"
          >
            <div className="flex items-center gap-2 mb-2">
              {step.type === 'split' ? (
                <SplitHorizontal className="text-indigo-500" size={18} />
              ) : (
                <GitMerge className="text-green-500" size={18} />
              )}
              <span className="text-sm font-medium text-gray-600">
                Step {index + 1}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-2">{step.description}</p>
            
            {step.leftArray && step.rightArray && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-xs text-gray-500 mb-1">Left Array</div>
                  <div className="text-sm">[{step.leftArray.join(', ')}]</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-xs text-gray-500 mb-1">Right Array</div>
                  <div className="text-sm">[{step.rightArray.join(', ')}]</div>
                </div>
              </div>
            )}
            
            {step.result && (
              <div className="bg-green-50 p-2 rounded">
                <div className="text-xs text-green-600 mb-1">Result</div>
                <div className="text-sm">[{step.result.join(', ')}]</div>
              </div>
            )}
          </div>
        ))}
        
        {steps.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No steps recorded yet. Start sorting to see the process.
          </div>
        )}
      </div>
    </div>
  );
}