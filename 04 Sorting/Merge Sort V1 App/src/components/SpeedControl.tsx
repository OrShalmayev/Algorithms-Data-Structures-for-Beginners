import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({ speed, onSpeedChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Gauge size={20} className="text-gray-600" />
      <input
        type="range"
        min="100"
        max="2000"
        step="100"
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        title={`Animation Speed: ${speed}ms`}
      />
      <span className="text-sm text-gray-600 w-16">{speed}ms</span>
    </div>
  );
};