import React from 'react';

export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">How Merge Sort Works</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">1. Divide</h3>
          <p className="text-gray-600">
            The algorithm starts by dividing the array into smaller subarrays until each subarray contains just one element.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">2. Conquer</h3>
          <p className="text-gray-600">
            Each pair of adjacent subarrays is merged in sorted order, creating larger sorted subarrays.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">3. Combine</h3>
          <p className="text-gray-600">
            The process continues until all elements are merged back into a single, fully sorted array.
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Time Complexity: O(n log n) | Space Complexity: O(n)
      </div>
    </div>
  );
};