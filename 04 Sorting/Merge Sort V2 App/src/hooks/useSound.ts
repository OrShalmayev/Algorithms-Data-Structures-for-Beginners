import { useCallback } from 'react';

export const useSound = () => {
  const playNote = useCallback((value: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Map value to frequency (200-800Hz)
    const frequency = 200 + (value / 100) * 600;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  return { playNote };
};