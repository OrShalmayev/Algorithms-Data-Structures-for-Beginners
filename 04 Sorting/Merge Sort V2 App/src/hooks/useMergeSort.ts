import { useState, useCallback } from 'react';

interface Step {
  type: 'split' | 'merge' | 'compare';
  description: string;
  timestamp: number;
  values: number[];
}

export const useMergeSort = (
  speed: number,
  setIsSorting: (sorting: boolean) => void
) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [array, setArray] = useState<number[]>([]);

  const addStep = (type: Step['type'], description: string, values: number[]) => {
    setSteps(prev => [...prev, {
      type,
      description,
      timestamp: Date.now(),
      values: [...values]
    }]);
    setCurrentStep(prev => prev + 1);
  };

  const merge = async (
    arr: number[],
    start: number,
    mid: number,
    end: number
  ) => {
    const leftArray = arr.slice(start, mid + 1);
    const rightArray = arr.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;
    const merged = [...arr];

    while (i < leftArray.length && j < rightArray.length) {
      setComparingIndices([start + i, mid + 1 + j]);
      addStep(
        'compare',
        `Comparing ${leftArray[i]} and ${rightArray[j]}`,
        [...arr]
      );

      await new Promise(resolve => setTimeout(resolve, speed));

      if (leftArray[i] <= rightArray[j]) {
        merged[k] = leftArray[i];
        i++;
      } else {
        merged[k] = rightArray[j];
        j++;
      }
      k++;
      setArray([...merged]);
    }

    while (i < leftArray.length) {
      merged[k] = leftArray[i];
      i++;
      k++;
      setArray([...merged]);
    }

    while (j < rightArray.length) {
      merged[k] = rightArray[j];
      j++;
      k++;
      setArray([...merged]);
    }

    for (let p = start; p <= end; p++) {
      arr[p] = merged[p];
      setSortedIndices(prev => new Set([...prev, p]));
    }

    addStep('merge', `Merged subarray from index ${start} to ${end}`, [...arr]);
    setComparingIndices([]);
    
    return arr;
  };

  const mergeSortHelper = async (
    arr: number[],
    start: number,
    end: number
  ): Promise<number[]> => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      
      addStep('split', `Split array at index ${mid}`, arr.slice(start, end + 1));
      await new Promise(resolve => setTimeout(resolve, speed));

      await mergeSortHelper(arr, start, mid);
      await mergeSortHelper(arr, mid + 1, end);
      await merge(arr, start, mid, end);
    }
    return arr;
  };

  const startSorting = async () => {
    setIsSorting(true);
    setSteps([]);
    setCurrentStep(-1);
    setSortedIndices(new Set());
    setComparingIndices([]);
    
    const arrCopy = [...array];
    try {
      await mergeSortHelper(arrCopy, 0, arrCopy.length - 1);
      setArray(arrCopy);
    } finally {
      setIsSorting(false);
    }
  };

  const pauseSorting = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsSorting(false);
  };

  const resetArray = useCallback(() => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 1);
    setSteps([]);
    setCurrentStep(-1);
    setSortedIndices(new Set());
    setComparingIndices([]);
    setArray(newArray);
  }, []);

  return {
    steps,
    currentStep,
    sortedIndices,
    comparingIndices,
    array,
    startSorting,
    pauseSorting,
    resetArray
  };
};