import React, { useState, useCallback } from 'react';
import { ChevronRight, Package, History, Brain, Trophy } from 'lucide-react';
import { BackpackSimulator } from './components/BackpackSimulator';
import { NavBar } from './components/NavBar';
import { SidePanel } from './components/SidePanel';

function App() {
  const [activeModule, setActiveModule] = useState('backpack');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <NavBar />
      
      <div className="flex">
        <SidePanel isOpen={sidebarOpen} onToggle={toggleSidebar}>
          <button 
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              activeModule === 'backpack' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-indigo-50'
            }`}
            onClick={() => setActiveModule('backpack')}
          >
            <Package className="mr-2 h-5 w-5" />
            <span>Magic Backpack</span>
          </button>
          <button 
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              activeModule === 'memory' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-indigo-50'
            }`}
            onClick={() => setActiveModule('memory')}
          >
            <Brain className="mr-2 h-5 w-5" />
            <span>Memory Allocation</span>
          </button>
          <button 
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              activeModule === 'history' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-indigo-50'
            }`}
            onClick={() => setActiveModule('history')}
          >
            <History className="mr-2 h-5 w-5" />
            <span>Time Machine</span>
          </button>
          <button 
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              activeModule === 'achievements' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-indigo-50'
            }`}
            onClick={() => setActiveModule('achievements')}
          >
            <Trophy className="mr-2 h-5 w-5" />
            <span>Achievements</span>
          </button>
        </SidePanel>

        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="max-w-6xl mx-auto">
            {activeModule === 'backpack' && <BackpackSimulator />}
            {/* Other modules will be implemented later */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;