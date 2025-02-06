import React from 'react';

interface ArrayBarProps {
  value: number;
  max: number;
  isActive?: boolean;
  isComparing?: boolean;
}

export const ArrayBar: React.FC<ArrayBarProps> = ({
  value,
  max,
  isActive = false,
  isComparing = false,
}) => {
  const height = `${(value / max) * 100}%`;
  
  return (
    <div
      className={`
        w-8 rounded-t-md transition-all duration-200
        ${isComparing 
          ? 'bg-gradient-to-t from-yellow-500 to-yellow-300 shadow-lg scale-105' 
          : isActive
            ? 'bg-gradient-to-t from-indigo-600 to-purple-400'
            : 'bg-gradient-to-t from-indigo-500 to-purple-500'
        }
      `}
      style={{ height }}
      title={`Value: ${value}`}
    />
  );
};