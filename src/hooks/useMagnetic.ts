import type { PointerEvent } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';
import { useExperience } from '@/context/experience';
import { SPRING } from '@/lib/constants';

interface Magnetic {
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
}

/** Pulls an element towards the pointer. Inert on touch devices and under reduced motion. */
export function useMagnetic(strength = 0.35): Magnetic {
  const { finePointer, reducedMotion } = useExperience();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING.magnetic);
  const y = useSpring(rawY, SPRING.magnetic);
  const enabled = finePointer && !reducedMotion;

  return {
    x,
    y,
    handlers: {
      onPointerMove: (event) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      },
      onPointerLeave: () => {
        rawX.set(0);
        rawY.set(0);
      },
    },
  };
}
