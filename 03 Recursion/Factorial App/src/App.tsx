import React, { useState, useEffect } from 'react';
import { FactorialVisualizer, KnowledgePyramid } from './components/FactorialVisualizer';
import { RecursiveBreakdown } from './components/InteractiveFactorial';
import { BookOpen, Code, History, Zap } from 'lucide-react';

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function App() {
  const [number, setNumber] = useState<number>(5);
  const [frames, setFrames] = useState<Array<{ n: number; result?: number }>>([]);
  const [isUnwinding, setIsUnwinding] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [result, setResult] = useState<number>(120);

  useEffect(() => {
    // Reset animation state
    setFrames([]);
    setIsUnwinding(false);
    
    // Build frames for visualization
    const newFrames = [];
    for (let i = number; i >= 1; i--) {
      newFrames.push({ n: i });
    }
    setFrames(newFrames);
    
    // Start unwinding animation after a short delay
    setTimeout(() => {
      setIsUnwinding(true);
      const updatedFrames = newFrames.map((frame, index) => ({
        ...frame,
        result: factorial(frame.n)
      }));
      setFrames(updatedFrames);
      setResult(factorial(number));
    }, 1500);
  }, [number]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setNumber(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 ${
                activeTab === 'learn' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 ${
                activeTab === 'practice' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Practice</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 ${
                activeTab === 'history' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                      Enter a number (0-10)
                    </label>
                    <input
                      type="number"
                      id="number"
                      min="0"
                      max="10"
                      value={number}
                      onChange={handleNumberChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium">Factorial Animation</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Watch how {number}! is calculated step by step
                      </p>
                      <p className="mt-2 text-xl font-bold text-indigo-600">
                        Result: {result}
                      </p>
                    </div>

                    <RecursiveBreakdown number={number} />
                    
                    <div className="border-t pt-6">
                      <div className="text-center mb-4">
                        <h4 className="text-sm font-medium text-gray-500">
                          {isUnwinding ? 'Calculating results...' : 'Building call stack...'}
                        </h4>
                      </div>
                      <FactorialVisualizer
                        frames={frames}
                        isUnwinding={isUnwinding}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <KnowledgePyramid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;