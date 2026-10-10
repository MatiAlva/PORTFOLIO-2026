import { useEffect, useEffectEvent } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonami(onUnlock: () => void): void {
  const unlock = useEffectEvent(onUnlock);

  useEffect(() => {
    let position = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === SEQUENCE[position] ? position + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (position === SEQUENCE.length) {
        position = 0;
        unlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
