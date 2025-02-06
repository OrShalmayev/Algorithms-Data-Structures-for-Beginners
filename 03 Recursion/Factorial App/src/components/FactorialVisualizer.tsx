import React from 'react';
import { ArrowDown, ArrowUp, Brain, Code2, History, Lightbulb, ChevronRight, ArrowDownRight, ArrowRight } from 'lucide-react';

interface StackFrame {
  n: number;
  result?: number;
}

export const FactorialVisualizer: React.FC<{
  frames: StackFrame[];
  isUnwinding: boolean;
}> = ({ frames, isUnwinding }) => {
  return (
    <div className="space-y-8">
      {/* Call Stack Visualization */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Call Stack Visualization</h3>
        <div className="space-y-3">
          {frames.map((frame, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-500
                ${isUnwinding ? 'translate-x-0' : 'translate-x-4'}
                ${index === frames.length - 1 ? 'bg-yellow-50' : 'bg-white'}
              `}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="flex items-start space-x-4">
                {/* Stack Frame */}
                <div className={`
                  flex-1 p-4 rounded-lg border-2
                  ${isUnwinding && frame.result ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}
                `}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold">factorial({frame.n})</span>
                      {frame.result && (
                        <ArrowRight className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {frame.result && (
                      <span className="font-mono font-bold text-green-600">{frame.result}</span>
                    )}
                  </div>
                  
                  {/* Step Explanation */}
                  <div className="text-sm">
                    {!isUnwinding ? (
                      <div className="text-blue-700">
                        Pushing factorial({frame.n}) onto the stack
                      </div>
                    ) : (
                      <div className="text-green-700">
                        {frame.n <= 1 
                          ? 'Base case: Returns 1'
                          : `${frame.n} × factorial(${frame.n - 1}) = ${frame.result}`
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* Stack Pointer */}
                <div className="w-24 flex flex-col items-center justify-center text-xs text-gray-500">
                  <div className="font-mono">Stack Frame {frames.length - index}</div>
                  <ArrowDownRight className="w-4 h-4 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory State */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Memory State</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Stack Size:</span>
            <span className="font-mono">{frames.length} frames</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Current Operation:</span>
            <span className="font-mono">
              {isUnwinding ? 'Unwinding & Calculating Results' : 'Building Call Stack'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Stack Direction:</span>
            {isUnwinding ? (
              <div className="flex items-center text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>Unwinding</span>
              </div>
            ) : (
              <div className="flex items-center text-blue-600">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>Growing</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Description */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Step</h3>
        <div className="prose prose-sm">
          {!isUnwinding ? (
            <>
              <p className="text-blue-700">
                Building the call stack by breaking down the factorial calculation into smaller sub-problems.
                Each call to factorial(n) is pushed onto the stack until we reach the base case.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Each function call is suspended until its sub-problem is solved</li>
                <li>The stack grows until we reach factorial(1)</li>
                <li>Memory usage is proportional to the input number</li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-green-700">
                Unwinding the stack by calculating results from the base case up.
                Each frame multiplies its number with the result from the frame below.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Base case (factorial(1)) returns 1</li>
                <li>Each frame multiplies its number with the previous result</li>
                <li>Final result is calculated when we reach the top of the stack</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const KnowledgePyramid: React.FC = () => {
  const levels = [
    {
      title: "Advanced: Tail Recursion",
      icon: <Brain className="w-5 h-5" />,
      content: "Optimizing factorial with tail recursion"
    },
    {
      title: "Why Recursion?",
      icon: <Lightbulb className="w-5 h-5" />,
      content: "Compare recursive vs iterative approaches"
    },
    {
      title: "Recursive Pattern",
      icon: <Code2 className="w-5 h-5" />,
      content: "How n! breaks down into (n-1)!"
    },
    {
      title: "Factorial Basics",
      icon: <History className="w-5 h-5" />,
      content: "Definition and examples"
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      {levels.map((level, index) => (
        <div
          key={index}
          className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow
            ${index === 0 ? 'w-48' : index === 1 ? 'w-56' : index === 2 ? 'w-64' : 'w-72'}`}
        >
          <div className="flex items-center space-x-2">
            {level.icon}
            <h3 className="font-semibold">{level.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">{level.content}</p>
        </div>
      ))}
    </div>
  );
};