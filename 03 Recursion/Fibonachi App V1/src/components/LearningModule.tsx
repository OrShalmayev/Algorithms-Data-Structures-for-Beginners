import React, { useState } from 'react';
import { ChevronRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';

const LearningModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Understanding Recursion",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Recursion is a programming concept where a function calls itself to solve a problem by breaking it down into smaller, similar sub-problems.
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="flex items-center text-indigo-700 font-semibold">
              <Lightbulb className="h-5 w-5 mr-2" />
              Key Concept
            </h4>
            <p className="text-indigo-600 mt-2">
              Think of recursion like a Russian nesting doll - each doll contains a smaller version of itself until you reach the smallest doll.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Two-Branch Recursion",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            In two-branch recursion, each function call splits into two recursive calls. The Fibonacci sequence is a classic example where each number is the sum of the two preceding ones.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="flex items-center text-yellow-700 font-semibold">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Common Pitfall
            </h4>
            <p className="text-yellow-600 mt-2">
              Be careful with two-branch recursion as it can lead to exponential time complexity if not optimized properly.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Base Cases",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Base cases are the conditions that stop the recursion. Without them, your function would call itself indefinitely, causing a stack overflow.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="flex items-center text-green-700 font-semibold">
              <BookOpen className="h-5 w-5 mr-2" />
              Example
            </h4>
            <pre className="bg-white p-3 rounded mt-2 text-sm">
              {`function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
            </pre>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Path</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                  activeSection === index
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="font-medium">{section.title}</span>
                <ChevronRight className={`h-5 w-5 transform transition-transform ${
                  activeSection === index ? 'rotate-90' : ''
                }`} />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg border-2 border-indigo-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {sections[activeSection].title}
            </h3>
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;