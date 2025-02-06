import React, { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';

const initialCode = `function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Try it out!
console.log(fibonacci(5));`;

const CodePlayground: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    try {
      // Clear previous output and errors
      setOutput('');
      setError('');

      // Create a safe console.log replacement
      const logs: string[] = [];
      const safeConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        }
      };

      // Execute the code in a new Function context
      const fn = new Function('console', code);
      fn(safeConsole);

      // Update output
      setOutput(logs.join('\n'));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Code Playground</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-gray-800 text-gray-100 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={runCode}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </button>
            <button
              onClick={() => setCode(initialCode)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4 h-80 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Output:</h3>
            {error ? (
              <pre className="text-red-600 font-mono text-sm">{error}</pre>
            ) : (
              <pre className="text-gray-800 font-mono text-sm">{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;