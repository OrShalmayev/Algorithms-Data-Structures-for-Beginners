import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  sorting: boolean;
  onReset: () => void;
  onStart: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  sorting,
  onReset,
  onStart,
}) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onStart}
        disabled={sorting}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {sorting ? (
          <>
            <Pause size={20} />
            Sorting...
          </>
        ) : (
          <>
            <Play size={20} />
            Start Sorting
          </>
        )}
      </button>
      
      <button
        onClick={onReset}
        disabled={sorting}
        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RotateCcw size={20} />
        Reset Array
      </button>
    </div>
  );
};