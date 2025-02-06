import React from 'react';

interface CodePanelProps {
  currentStep: number;
  highlightedLines: number[];
  stack: string[];
  heap: Record<string, any>;
  phase: 'creation' | 'execution';
}

export const CodePanel: React.FC<CodePanelProps> = ({ 
  currentStep, 
  highlightedLines,
  stack,
  heap,
  phase
}) => {
  const code = `function fibonacci(n) {
  // Base case
  if (n <= 1) {
    return n;
  }
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Code Execution</h3>
          <div className="text-sm text-gray-400">Step {currentStep + 1}</div>
        </div>
        <pre className="font-mono text-sm">
          {code.split('\n').map((line, index) => (
            <div
              key={index}
              className={`px-2 ${
                highlightedLines.includes(index)
                  ? 'bg-blue-500 bg-opacity-20 border-l-2 border-blue-500'
                  : ''
              }`}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Call Stack */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Call Stack</h3>
          <div className="space-y-2">
            {stack.length === 0 ? (
              <div className="text-gray-500 italic">Stack is empty</div>
            ) : (
              [...stack].reverse().map((call, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-2 rounded border border-gray-700"
                >
                  {call}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Heap Memory */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Heap Memory</h3>
          <div className="space-y-2">
            {Object.entries(heap).length === 0 ? (
              <div className="text-gray-500 italic">Heap is empty</div>
            ) : (
              Object.entries(heap).map(([key, value], index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-2 rounded border border-gray-700 flex justify-between"
                >
                  <span>{key}:</span>
                  <span className="text-green-400">{value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Execution Phase */}
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Current Phase</h3>
        <div className="flex space-x-4">
          <div
            className={`px-4 py-2 rounded ${
              phase === 'creation'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Creation Phase
          </div>
          <div
            className={`px-4 py-2 rounded ${
              phase === 'execution'
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Execution Phase
          </div>
        </div>
      </div>
    </div>
  );
};