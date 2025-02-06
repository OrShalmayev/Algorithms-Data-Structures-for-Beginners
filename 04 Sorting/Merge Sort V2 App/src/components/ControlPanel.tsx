import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface ControlPanelProps {
  isSorting: boolean;
  speed: number;
  onSpeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStart: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isSorting,
  speed,
  onSpeedChange,
  onStart,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onStart}
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSorting}
      >
        {isSorting ? <Pause size={20} /> : <Play size={20} />}
        {isSorting ? 'Pause' : 'Start'}
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSorting}
      >
        <RefreshCw size={20} />
        Reset
      </button>

      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm text-gray-600">Speed:</span>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={onSpeedChange}
          className="flex-1"
        />
        <span className="text-sm text-gray-600">{speed}ms</span>
      </div>
    </div>
  );
};