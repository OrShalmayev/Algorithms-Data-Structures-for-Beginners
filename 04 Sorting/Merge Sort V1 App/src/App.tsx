import React, { useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings } from 'lucide-react';
import { generateRandomArray, sleep, playNote } from './utils';
import { ArrayBar } from './components/ArrayBar';
import { Controls } from './components/Controls';
import { InfoPanel } from './components/InfoPanel';
import { SpeedControl } from './components/SpeedControl';
import { CalculationPanel } from './components/CalculationPanel';
import { StepHistory } from './components/StepHistory';

interface Step {
  type: 'split' | 'merge';
  description: string;
  leftArray?: number[];
  rightArray?: number[];
  result?: number[];
  timestamp: number;
}

function App() {
  const [array, setArray] = useState(() => generateRandomArray(20));
  const [sorting, setSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [showInfo, setShowInfo] = useState(true);
  const [speed, setSpeed] = useState(500); // Increased default speed
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [comparedIndices, setComparedIndices] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [calculationState, setCalculationState] = useState<{
    leftArray?: number[];
    rightArray?: number[];
    comparedValues?: [number, number];
    operation?: string;
    result?: number;
  }>({});
  
  const resetArray = useCallback(() => {
    setArray(generateRandomArray(20));
    setCurrentStep('');
    setActiveIndices([]);
    setComparedIndices([]);
    setCalculationState({});
    setSteps([]);
  }, []);

  const addStep = (step: Omit<Step, 'timestamp'>) => {
    setSteps(prev => [...prev, { ...step, timestamp: Date.now() }]);
  };

  const merge = async (arr: number[], left: number, middle: number, right: number) => {
    const n1 = middle - left + 1;
    const n2 = right - middle;
    
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);
    
    addStep({
      type: 'merge',
      description: `Merging subarrays [${leftArray.join(', ')}] and [${rightArray.join(', ')}]`,
      leftArray,
      rightArray
    });

    setCalculationState({
      leftArray,
      rightArray
    });
    
    let i = 0;
    let j = 0;
    let k = left;
    
    setActiveIndices([...Array(right - left + 1)].map((_, idx) => left + idx));
    
    while (i < n1 && j < n2) {
      await sleep(speed);
      
      setComparedIndices([left + i, middle + 1 + j]);
      setCalculationState({
        leftArray,
        rightArray,
        comparedValues: [leftArray[i], rightArray[j]],
        operation: leftArray[i] <= rightArray[j] ? '≤' : '>',
        result: leftArray[i] <= rightArray[j] ? leftArray[i] : rightArray[j]
      });
      
      if (soundEnabled) {
        playNote(leftArray[i], 'sine');
        await sleep(50);
        playNote(rightArray[j], 'sine');
      }
      
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
      setArray([...arr]);
    }
    
    while (i < n1) {
      await sleep(speed);
      if (soundEnabled) {
        playNote(leftArray[i], 'sine');
      }
      setCalculationState({
        leftArray,
        rightArray,
        comparedValues: [leftArray[i], undefined],
        result: leftArray[i]
      });
      arr[k] = leftArray[i];
      i++;
      k++;
      setArray([...arr]);
    }
    
    while (j < n2) {
      await sleep(speed);
      if (soundEnabled) {
        playNote(rightArray[j], 'sine');
      }
      setCalculationState({
        leftArray,
        rightArray,
        comparedValues: [undefined, rightArray[j]],
        result: rightArray[j]
      });
      arr[k] = rightArray[j];
      j++;
      k++;
      setArray([...arr]);
    }
    
    const mergedArray = arr.slice(left, right + 1);
    addStep({
      type: 'merge',
      description: `Merged result: [${mergedArray.join(', ')}]`,
      result: mergedArray
    });

    setComparedIndices([]);
    setCalculationState({});
  };

  const mergeSortHelper = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor(left + (right - left) / 2);
      const subarray = arr.slice(left, right + 1);
      
      addStep({
        type: 'split',
        description: `Splitting array [${subarray.join(', ')}]`,
        leftArray: arr.slice(left, middle + 1),
        rightArray: arr.slice(middle + 1, right + 1)
      });

      setCurrentStep(`Splitting array from index ${left} to ${right}`);
      await mergeSortHelper(arr, left, middle);
      await mergeSortHelper(arr, middle + 1, right);
      setCurrentStep(`Merging subarrays from ${left} to ${right}`);
      await merge(arr, left, middle, right);
    }
  };

  const startSorting = async () => {
    setSorting(true);
    setSteps([]);
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setCurrentStep('Sorting complete!');
    setActiveIndices([]);
    setSorting(false);
    
    if (soundEnabled) {
      playNote(800, 'sine', 0.5);
      await sleep(200);
      playNote(1000, 'sine', 0.5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[1fr,400px] gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Merge Sort Visualizer</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  title={soundEnabled ? 'Disable sound' : 'Enable sound'}
                >
                  {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                <SpeedControl speed={speed} onSpeedChange={setSpeed} />
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <Settings size={20} />
                  {showInfo ? 'Hide Info' : 'Show Info'}
                </button>
              </div>
            </div>

            {showInfo && <InfoPanel />}
            
            <CalculationPanel {...calculationState} />

            <div className="relative">
              <div className="h-64 flex items-end justify-center gap-1 mb-8 border-b-2 border-gray-100 pb-4">
                {array.map((value, index) => (
                  <ArrayBar
                    key={index}
                    value={value}
                    max={Math.max(...array)}
                    isActive={activeIndices.includes(index)}
                    isComparing={comparedIndices.includes(index)}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-2">
                {array.map((value, index) => (
                  <div
                    key={index}
                    className="w-8 text-center text-sm text-gray-500"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 font-medium">{currentStep}</p>
            </div>

            <Controls
              sorting={sorting}
              onReset={resetArray}
              onStart={startSorting}
            />
          </div>

          <StepHistory steps={steps} />
        </div>
      </div>
    </div>
  );
}

export default App;