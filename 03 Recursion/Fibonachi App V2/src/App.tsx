import React, { useState } from 'react';
import { Brain, BookOpen, Activity } from 'lucide-react';
import { FibonacciTree } from './components/FibonacciTree';
import { CodePanel } from './components/CodePanel';
import { ComplexityGraph } from './components/ComplexityGraph';

function App() {
  const [activeTab, setActiveTab] = useState('visualization');
  const [currentStep, setCurrentStep] = useState(0);
  const [stack, setStack] = useState<string[]>([]);
  const [heap, setHeap] = useState<Record<string, any>>({});
  const [phase, setPhase] = useState<'creation' | 'execution'>('creation');
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);

  const handleStepUpdate = (stepData: {
    currentStep: number;
    stack: string[];
    heap: Record<string, any>;
    phase: 'creation' | 'execution';
    type: 'call' | 'return';
  }) => {
    setCurrentStep(stepData.currentStep);
    setStack(stepData.stack);
    setHeap(stepData.heap);
    setPhase(stepData.phase);

    // Update highlighted lines based on the current step
    if (stepData.type === 'call') {
      if (stepData.phase === 'creation') {
        setHighlightedLines([0, 1]); // Function declaration and base case check
      } else {
        setHighlightedLines([2, 3]); // Base case return
      }
    } else {
      setHighlightedLines([5, 6]); // Recursive case
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Recursion Learning Lab
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('visualization')}
              className={`${
                activeTab === 'visualization'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Activity className="mr-2 h-5 w-5" />
              Visualization
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`${
                activeTab === 'learning'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Learning Guide
            </button>
          </nav>
        </div>

        {/* Content Panels */}
        {activeTab === 'visualization' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-lg font-semibold p-6 border-b">Fibonacci Tree Visualization</h2>
              <div className="h-[calc(100vh-300px)]">
                <FibonacciTree onStepUpdate={handleStepUpdate} />
              </div>
            </div>
            <div className="space-y-8">
              <CodePanel 
                currentStep={currentStep}
                highlightedLines={highlightedLines}
                stack={stack}
                heap={heap}
                phase={phase}
              />
              <ComplexityGraph />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Understanding Recursion</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Recursion is a powerful programming concept where a function calls itself
                to solve a problem by breaking it down into smaller, similar subproblems.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-2">Key Concepts</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Base cases prevent infinite recursion</li>
                <li>Each recursive call works on a smaller problem</li>
                <li>Solutions are combined to solve the original problem</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;