import { m, useScroll, useSpring } from 'motion/react';
import { SPRING } from '@/lib/constants';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);

  return (
    <m.div
      className="pointer-events-none fixed inset-x-0 top-0 z-51 h-[2px] origin-[0_50%] bg-accent"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
