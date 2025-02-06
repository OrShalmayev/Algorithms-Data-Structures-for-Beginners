import React from 'react';

interface CalculationPanelProps {
  leftArray?: number[];
  rightArray?: number[];
  comparedValues?: [number, number];
  operation?: string;
  result?: number;
}

export const CalculationPanel: React.FC<CalculationPanelProps> = ({
  leftArray,
  rightArray,
  comparedValues,
  operation,
  result
}) => {
  if (!leftArray && !rightArray) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="font-semibold text-gray-700">Left Array:</div>
          <div className="flex gap-2 flex-wrap">
            {leftArray?.map((value, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded ${
                  comparedValues?.[0] === value
                    ? 'bg-yellow-200 font-bold'
                    : 'bg-gray-200'
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold text-gray-700">Right Array:</div>
          <div className="flex gap-2 flex-wrap">
            {rightArray?.map((value, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded ${
                  comparedValues?.[1] === value
                    ? 'bg-yellow-200 font-bold'
                    : 'bg-gray-200'
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {comparedValues && (
        <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <span className={`px-2 py-1 rounded bg-yellow-200 font-bold`}>
              {comparedValues[0]}
            </span>
            <span className="font-bold text-gray-600">{operation}</span>
            <span className={`px-2 py-1 rounded bg-yellow-200 font-bold`}>
              {comparedValues[1]}
            </span>
            {result !== undefined && (
              <>
                <span className="font-bold text-gray-600">=</span>
                <span className="px-2 py-1 rounded bg-green-200 font-bold">
                  {result.toString()}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};