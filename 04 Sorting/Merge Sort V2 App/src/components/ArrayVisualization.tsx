import React from 'react';

interface ArrayVisualizationProps {
  array: number[];
  sortedIndices: Set<number>;
  comparingIndices: number[];
  soundEnabled: boolean;
  playNote: (value: number) => void;
}

export const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({
  array,
  sortedIndices,
  comparingIndices,
  soundEnabled,
  playNote,
}) => {
  const maxValue = Math.max(...array, 1);

  return (
    <div className="h-80 flex items-end justify-around gap-1 mb-8 bg-gray-50 rounded-lg p-4">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;
        const isComparing = comparingIndices.includes(index);
        const isSorted = sortedIndices.has(index);

        let bgColor = 'bg-blue-200 border-blue-300';
        if (isComparing) bgColor = 'bg-yellow-200 border-yellow-300';
        else if (isSorted) bgColor = 'bg-green-200 border-green-300';

        return (
          <div
            key={`${index}-${value}`}
            className="relative group flex-1"
            onMouseEnter={() => soundEnabled && playNote(value)}
          >
            <div
              className={`${bgColor} transition-all duration-300 rounded border shadow-sm`}
              style={{
                height: `${height}%`,
                transform: isComparing ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
              {value}
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
};