import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RefreshCw, Volume2, VolumeX, Settings } from 'lucide-react';
import { StepHistory } from './components/StepHistory';
import { ControlPanel } from './components/ControlPanel';
import { ArrayVisualization } from './components/ArrayVisualization';
import { useSound } from './hooks/useSound';
import { useMergeSort } from './hooks/useMergeSort';

function App() {
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const { 
    steps,
    currentStep,
    sortedIndices,
    comparingIndices,
    array,
    startSorting,
    pauseSorting,
    resetArray 
  } = useMergeSort(speed, setIsSorting);

  const { playNote } = useSound();

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  useEffect(() => {
    if (historyRef.current && currentStep > 0) {
      const activeStep = historyRef.current.querySelector('[data-active="true"]');
      if (activeStep) {
        activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentStep]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleStart = () => {
    if (!isSorting) {
      startSorting();
    } else {
      pauseSorting();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Merge Sort Visualization</h1>
          <div className="flex gap-4">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors text-gray-700 shadow-sm border border-gray-200"
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors text-gray-700 shadow-sm border border-gray-200"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <ArrayVisualization
              array={array}
              sortedIndices={sortedIndices}
              comparingIndices={comparingIndices}
              soundEnabled={soundEnabled}
              playNote={playNote}
            />

            <ControlPanel
              isSorting={isSorting}
              speed={speed}
              onSpeedChange={handleSpeedChange}
              onStart={handleStart}
              onReset={resetArray}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div ref={historyRef} className="h-[calc(100vh-16rem)] overflow-y-auto">
              <StepHistory steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App