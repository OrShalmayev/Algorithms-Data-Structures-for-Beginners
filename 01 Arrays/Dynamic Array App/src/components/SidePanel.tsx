import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SidePanelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function SidePanel({ children, isOpen, onToggle }: SidePanelProps) {
  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
      </button>
      <div className={`p-4 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}