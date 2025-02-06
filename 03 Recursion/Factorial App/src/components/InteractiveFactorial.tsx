import React, { useState } from 'react';
import { Calculator, Check, X } from 'lucide-react';

interface PredictionProps {
  number: number;
  onPredict: (prediction: number) => void;
}

export const FactorialPrediction: React.FC<PredictionProps> = ({ number, onPredict }) => {
  const [prediction, setPrediction] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const predictedValue = parseInt(prediction);
    if (isNaN(predictedValue)) {
      setFeedback('Please enter a valid number');
      return;
    }
    onPredict(predictedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What do you think {number}! equals?
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your prediction"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Calculator className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      {feedback && (
        <div className="text-red-500 text-sm">{feedback}</div>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Check Prediction
      </button>
    </form>
  );
};

export const RecursiveBreakdown: React.FC<{ number: number }> = ({ number }) => {
  const steps = [];
  let current = number;
  while (current > 1) {
    steps.push(current);
    current--;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Recursive Breakdown</h3>
      {steps.map((n, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="font-mono">{n}!</span>
          <span>=</span>
          <span className="font-mono">{n} × {n-1}!</span>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <span className="font-mono">1!</span>
        <span>=</span>
        <span className="font-mono">1</span>
        <span className="text-green-500"><Check className="w-4 h-4" /></span>
      </div>
    </div>
  );
};