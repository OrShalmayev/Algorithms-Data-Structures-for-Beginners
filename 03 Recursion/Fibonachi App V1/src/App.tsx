import React, { useState } from 'react';
import { Trees as Tree, Brain, ArrowRight, Code2, BookOpen, History } from 'lucide-react';
import RecursionVisualizer from './components/RecursionVisualizer';
import CodePlayground from './components/CodePlayground';
import LearningModule from './components/LearningModule';
import Quiz from './components/Quiz';

function App() {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Tree className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RecursionMaster</span>
            </div>
            <div className="flex space-x-8">
              <NavButton
                active={activeTab === 'learn'}
                onClick={() => setActiveTab('learn')}
                icon={<Brain className="h-5 w-5" />}
                text="Learn"
              />
              <NavButton
                active={activeTab === 'visualize'}
                onClick={() => setActiveTab('visualize')}
                icon={<Tree className="h-5 w-5" />}
                text="Visualize"
              />
              <NavButton
                active={activeTab === 'practice'}
                onClick={() => setActiveTab('practice')}
                icon={<Code2 className="h-5 w-5" />}
                text="Practice"
              />
              <NavButton
                active={activeTab === 'quiz'}
                onClick={() => setActiveTab('quiz')}
                icon={<BookOpen className="h-5 w-5" />}
                text="Quiz"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'learn' && <LearningModule />}
        {activeTab === 'visualize' && <RecursionVisualizer />}
        {activeTab === 'practice' && <CodePlayground />}
        {activeTab === 'quiz' && <Quiz />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default App;