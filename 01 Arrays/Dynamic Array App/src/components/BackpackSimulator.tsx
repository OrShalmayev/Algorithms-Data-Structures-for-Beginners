import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Item {
  id: number;
  value: number;
}

export function BackpackSimulator() {
  const [items, setItems] = useState<Item[]>([]);
  const [capacity, setCapacity] = useState(4);
  const [nextId, setNextId] = useState(1);

  const addItem = () => {
    if (items.length >= capacity) {
      // Double the capacity
      setCapacity(prev => prev * 2);
    }
    const newItem = {
      id: nextId,
      value: Math.floor(Math.random() * 100) + 1
    };
    setItems(prev => [...prev, newItem]);
    setNextId(prev => prev + 1);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Magic Backpack Simulator</h2>
        <p className="text-gray-600">
          Learn about dynamic arrays through this interactive backpack simulator.
          Watch how the capacity doubles when we run out of space!
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Items: {items.length}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">Capacity: {capacity}</span>
          </div>
          <button
            onClick={addItem}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>

        <div className="relative">
          <div
            className="grid gap-4 transition-all duration-300"
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(capacity))}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: capacity }).map((_, index) => {
              const item = items[index];
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg border-2 ${
                    item
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-dashed border-gray-200'
                  } flex items-center justify-center relative group`}
                >
                  {item && (
                    <>
                      <span className="text-lg font-semibold text-indigo-700">
                        {item.value}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Operations</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Insertion: O(1) amortized</p>
          <p>• Deletion: O(1)</p>
          <p>• Access: O(1)</p>
        </div>
      </div>
    </div>
  );
}