import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useExperience } from '@/context/experience';
import { useContent } from '@/context/locale';
import { useKonami } from '@/hooks/useKonami';
import { trackEvent } from '@/lib/analytics';
import { DURATION, EASE_OUT } from '@/lib/constants';
const TOAST_MS = 3200;

/** Konami code cycles the accent color — the 3D scene and UI follow it live. */
export function EasterEgg() {
  const { accent, cycleAccent } = useExperience();
  const { ui } = useContent();
  const [visible, setVisible] = useState(false);

  useKonami(() => {
    cycleAccent();
    setVisible(true);
    trackEvent('easter_egg');
  });

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => setVisible(false), TOAST_MS);
    return () => window.clearTimeout(timeout);
  }, [visible, accent]);

  return (
    <div
      className="pointer-events-none fixed bottom-8 left-1/2 z-100 -translate-x-1/2"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {visible && (
          <m.p
            key={accent}
            className="flex items-center gap-3 rounded-full bg-fg px-[1.1rem] py-3 font-mono text-xs tracking-[0.04em] whitespace-nowrap text-bg"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
          >
            <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
            {ui.easterEgg.unlocked} <strong>{accent}</strong>. {ui.easterEgg.again}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
