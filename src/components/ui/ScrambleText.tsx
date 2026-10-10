import { useEffect, useRef, useState } from 'react';
import { useExperience } from '@/context/experience';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-';
const FRAME_MS = 32;
const REVEAL_FRAMES = 12;

interface ScrambleTextProps {
  text: string;
  /** Scramble while this is true (typically the parent's hover state). */
  active: boolean;
}

/** Briefly decodes the text through random glyphs, left to right. */
export function ScrambleText({ text, active }: ScrambleTextProps) {
  const { reducedMotion } = useExperience();
  const [output, setOutput] = useState(text);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active || reducedMotion) return;
    let frame = 0;

    timer.current = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / REVEAL_FRAMES) * text.length);
      const next = text
        .split('')
        .map((char, index) =>
          index < revealed || char === ' '
            ? char
            : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? char),
        )
        .join('');
      setOutput(next);
      if (revealed >= text.length) window.clearInterval(timer.current);
    }, FRAME_MS);

    return () => {
      window.clearInterval(timer.current);
      setOutput(text);
    };
  }, [active, reducedMotion, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </>
  );
}
