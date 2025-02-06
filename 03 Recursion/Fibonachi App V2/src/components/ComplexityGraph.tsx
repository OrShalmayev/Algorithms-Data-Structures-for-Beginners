import React from 'react';
import { LineChart, TrendingUp as TrendUp } from 'lucide-react';

export const ComplexityGraph: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Time Complexity</h3>
        <LineChart className="text-blue-500" />
      </div>
      <div className="relative h-40 border-b border-l border-gray-300">
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
          <div className="w-full h-3/4 bg-gradient-to-t from-red-100 to-red-50 opacity-50"></div>
        </div>
        <div className="absolute bottom-0 left-0 text-sm text-gray-600">O(2^n)</div>
        <TrendUp className="absolute top-4 right-4 text-red-500" />
      </div>
    </div>
  );
};