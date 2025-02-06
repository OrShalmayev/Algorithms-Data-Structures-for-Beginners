import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const RecursionVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    // Build Fibonacci tree for n=5
    const buildFibTree = (n: number): TreeNode | null => {
      if (n <= 1) return { value: n };
      return {
        value: n,
        left: buildFibTree(n - 1),
        right: buildFibTree(n - 2),
      };
    };

    setTree(buildFibTree(5));
  }, []);

  const renderNode = (node: TreeNode | null, depth: number = 0) => {
    if (!node) return null;

    return (
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
            ${depth === currentStep ? 'bg-indigo-500 text-white animate-pulse' : 'bg-white text-gray-800'}
            shadow-lg border-2 border-indigo-200`}
        >
          {node.value}
        </div>
        {(node.left || node.right) && (
          <div className="flex items-start space-x-4 mt-4">
            <div className="flex flex-col items-center">
              {node.left && <ArrowDown className="h-6 w-6 text-indigo-300" />}
              {renderNode(node.left, depth + 1)}
            </div>
            <div className="flex flex-col items-center">
              {node.right && <ArrowDown className="h-6 w-6 text-indigo-300" />}
              {renderNode(node.right, depth + 1)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fibonacci Recursion Tree</h2>
      <div className="flex flex-col items-center space-y-8">
        <div className="overflow-auto p-4">
          {tree && renderNode(tree)}
        </div>
        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Animation Speed
          </label>
          <input
            type="range"
            min="200"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            Previous Step
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecursionVisualizer;