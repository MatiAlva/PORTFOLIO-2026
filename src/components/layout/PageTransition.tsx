import type { ReactNode } from 'react';
import { m, type Variants } from 'motion/react';
import { useExperience } from '@/context/experience';
import { DURATION, EASE_IN_OUT } from '@/lib/constants';
const curtain: Variants = {
  initial: { scaleY: 1, originY: 0 },
  enter: { scaleY: 0, originY: 0, transition: { duration: DURATION.slow, ease: EASE_IN_OUT } },
  exit: { scaleY: 1, originY: 1, transition: { duration: DURATION.slow * 0.8, ease: EASE_IN_OUT } },
};

const content: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DURATION.base, delay: DURATION.slow * 0.5 } },
  exit: { opacity: 0, transition: { duration: DURATION.base } },
};

/**
 * Route change choreography: a curtain covers the old page, then lifts off the new one.
 * Only opacity is applied to the page itself, so `position: fixed` descendants keep working.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { reducedMotion } = useExperience();

  if (reducedMotion) return <>{children}</>;

  return (
    <m.div initial="initial" animate="enter" exit="exit">
      <m.div
        className="pointer-events-none fixed inset-0 z-99 bg-fg"
        variants={curtain}
        aria-hidden="true"
      />
      <m.div variants={content}>{children}</m.div>
    </m.div>
  );
}
