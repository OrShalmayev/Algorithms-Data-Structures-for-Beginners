import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';

interface TreeNodeProps {
  value: number;
  n: number;
  isActive: boolean;
  isCalculated: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ value, n, isActive, isCalculated }) => {
  const getNodeStyle = () => {
    if (isActive) return 'border-yellow-400 bg-yellow-50 text-yellow-700';
    if (isCalculated) return 'border-green-500 bg-green-50 text-green-700';
    return 'border-gray-300 bg-white text-gray-700';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 ${getNodeStyle()}`}>
        {isCalculated ? value : '?'}
      </div>
      <div className="text-xs mt-1 text-gray-600">fib({n})</div>
    </div>
  );
};

interface Step {
  n: number;
  type: 'call' | 'return';
  value?: number;
  stack: string[];
  heap: Record<string, any>;
  phase: 'creation' | 'execution';
}

interface FibonacciTreeProps {
  onStepUpdate: (stepData: {
    currentStep: number;
    stack: string[];
    heap: Record<string, any>;
    phase: 'creation' | 'execution';
    type: 'call' | 'return';
  }) => void;
}

export const FibonacciTree: React.FC<FibonacciTreeProps> = ({ onStepUpdate }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [calculatedValues, setCalculatedValues] = useState<Map<number, number>>(new Map());
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());
  const [zoom, setZoom] = useState(1);

  const generateFibSteps = (n: number): Step[] => {
    const steps: Step[] = [];
    const stack: string[] = [];
    const heap: Record<string, any> = {};
    
    const fib = (x: number): number => {
      // Creation phase
      stack.push(`fib(${x})`);
      steps.push({
        n: x,
        type: 'call',
        stack: [...stack],
        heap: { ...heap },
        phase: 'creation'
      });

      // Execution phase
      if (x <= 1) {
        const result = x;
        heap[`result_${x}`] = result;
        steps.push({
          n: x,
          type: 'return',
          value: result,
          stack: [...stack],
          heap: { ...heap },
          phase: 'execution'
        });
        stack.pop();
        return result;
      }

      const left = fib(x - 1);
      const right = fib(x - 2);
      const result = left + right;
      
      heap[`result_${x}`] = result;
      steps.push({
        n: x,
        type: 'return',
        value: result,
        stack: [...stack],
        heap: { ...heap },
        phase: 'execution'
      });
      stack.pop();
      return result;
    };

    fib(n);
    return steps;
  };

  useEffect(() => {
    setSteps(generateFibSteps(5));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step.type === 'call') {
        setActiveNodes(prev => new Set(prev).add(step.n));
      } else if (step.type === 'return' && step.value !== undefined) {
        setCalculatedValues(prev => new Map(prev).set(step.n, step.value));
        setActiveNodes(prev => {
          const next = new Set(prev);
          next.delete(step.n);
          return next;
        });
      }

      // Update the code panel
      onStepUpdate({
        currentStep: currentStepIndex,
        stack: step.stack,
        heap: step.heap,
        phase: step.phase,
        type: step.type
      });
    }
  }, [currentStepIndex, steps, onStepUpdate]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
    setCalculatedValues(new Map());
    setActiveNodes(new Set());
    onStepUpdate({
      currentStep: -1,
      stack: [],
      heap: {},
      phase: 'creation',
      type: 'call'
    });
  };
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const renderTree = (n: number): JSX.Element => {
    if (n <= 1) {
      return (
        <TreeNode
          value={calculatedValues.get(n) ?? 0}
          n={n}
          isActive={activeNodes.has(n)}
          isCalculated={calculatedValues.has(n)}
        />
      );
    }

    return (
      <div className="flex flex-col items-center">
        <TreeNode
          value={calculatedValues.get(n) ?? 0}
          n={n}
          isActive={activeNodes.has(n)}
          isCalculated={calculatedValues.has(n)}
        />
        <div className="mt-8 flex gap-16">
          <div className="relative">
            <div className="absolute top-0 left-1/2 h-8 w-px bg-gray-300 -translate-y-8"></div>
            {renderTree(n - 1)}
          </div>
          <div className="relative">
            <div className="absolute top-0 left-1/2 h-8 w-px bg-gray-300 -translate-y-8"></div>
            {renderTree(n - 2)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-x-4 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleStepBack}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={currentStepIndex <= 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Pause className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleStepForward}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={currentStepIndex >= steps.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Speed:</span>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600">{speed}ms</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(z => Math.min(2, z + 0.1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div 
        className="overflow-auto p-4 bg-white rounded-lg shadow-lg"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          height: '400px'
        }}
      >
        {renderTree(5)}
      </div>
    </div>
  );
};