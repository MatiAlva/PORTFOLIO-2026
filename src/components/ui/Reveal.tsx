import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { DURATION, EASE_OUT } from '@/lib/constants';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
  as?: 'div' | 'li' | 'figure' | 'aside';
}

/** Section-level entrance (fade + rise). Plays once when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, distance = 32, as = 'div' }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT, delay }}
    >
      {children}
    </Component>
  );
}
