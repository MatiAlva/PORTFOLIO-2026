import { useEffect, useState } from 'react';
import { AnimatePresence, animate, m, useMotionValue, useTransform } from 'motion/react';
import { useExperience } from '@/context/experience';
import { useContent } from '@/context/locale';
import { useBoot } from '@/hooks/useBoot';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { bootStore } from '@/lib/boot';
import { BOOT, DURATION, EASE_IN_OUT, EASE_OUT } from '@/lib/constants';
import { padIndex } from '@/lib/utils';
/** Progress never shows 100 until every task is done, so the counter stays honest. */
const PENDING_CEILING = 92;

function useBootTimers(reducedMotion: boolean) {
  const [minElapsed, setMinElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    bootStore.register('fonts');
    document.fonts.ready.then(() => bootStore.resolve('fonts'));

    const min = window.setTimeout(() => setMinElapsed(true), reducedMotion ? 0 : BOOT.minDuration);
    const max = window.setTimeout(() => setTimedOut(true), BOOT.maxDuration);
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(max);
    };
  }, [reducedMotion]);

  return { minElapsed, timedOut };
}

export function Preloader() {
  const { total, resolved, booted } = useBoot();
  const { reducedMotion } = useExperience();
  const { site, ui } = useContent();
  const { minElapsed, timedOut } = useBootTimers(reducedMotion);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (value) => padIndex(Math.round(value), 3));
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  const ready = (minElapsed && total > 0 && resolved === total) || timedOut;

  useLockBodyScroll(!booted);

  useEffect(() => {
    const target = ready ? 100 : total ? (resolved / total) * PENDING_CEILING : 8;
    const controls = animate(progress, target, {
      duration: ready ? DURATION.base : DURATION.reveal,
      ease: EASE_OUT,
      onComplete: () => {
        if (ready) bootStore.complete();
      },
    });
    return () => controls.stop();
  }, [ready, resolved, total, progress]);

  return (
    <AnimatePresence>
      {!booted && (
        <m.div
          className="fixed inset-0 z-100 overflow-hidden bg-bg text-fg"
          role="status"
          aria-live="polite"
          aria-label={ui.preloader(site.name)}
          exit={{ y: '-100%' }}
          transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASE_IN_OUT }}
        >
          <m.div
            className="absolute inset-0 flex items-end justify-between gap-8 p-[clamp(1.25rem,3vw,2.5rem)]"
            exit={{ y: '30%', opacity: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE_IN_OUT }}
          >
            <div className="flex flex-col gap-2 font-mono text-xs font-medium tracking-label uppercase">
              <span>{site.initials}</span>
              <span className="text-fg-muted">{site.role}</span>
            </div>
            <m.span
              className="text-[length:clamp(5rem,18vw,16rem)] leading-[0.8] font-medium tracking-tight tabular-nums"
              aria-hidden="true"
            >
              {counter}
            </m.span>
          </m.div>
          <m.div
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
            style={{ scaleX }}
            aria-hidden="true"
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
