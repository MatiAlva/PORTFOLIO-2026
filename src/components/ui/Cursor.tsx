import { useEffect, useState } from 'react';
import { AnimatePresence, m, useMotionValue, useSpring } from 'motion/react';
import { DURATION, EASE_OUT, SPRING } from '@/lib/constants';
type CursorMode = 'default' | 'interactive' | 'label' | 'text';

interface CursorState {
  mode: CursorMode;
  label: string;
}

const INTERACTIVE = 'a, button, [role="button"], label, select, summary';
const TEXT_INPUT =
  'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

function resolveState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return { mode: 'default', label: '' };

  const labelled = target.closest<HTMLElement>('[data-cursor="label"]');
  if (labelled?.dataset.cursorLabel) return { mode: 'label', label: labelled.dataset.cursorLabel };
  if (target.closest(TEXT_INPUT)) return { mode: 'text', label: '' };
  if (target.closest(INTERACTIVE)) return { mode: 'interactive', label: '' };
  return { mode: 'default', label: '' };
}

const RING_SCALE: Record<CursorMode, number> = {
  default: 1,
  interactive: 1.8,
  label: 0,
  text: 0,
};

/**
 * Desktop-only cursor. Elements opt into a labelled state with
 * `data-cursor="label" data-cursor-label="View"`. The native cursor is hidden through the
 * `has-custom-cursor` class, except over text fields.
 */
export function Cursor() {
  const [state, setState] = useState<CursorState>({ mode: 'default', label: '' });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, SPRING.cursor);
  const dotY = useSpring(y, SPRING.cursor);
  const ringX = useSpring(x, SPRING.cursorTrail);
  const ringY = useSpring(y, SPRING.cursorTrail);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const handleOver = (event: PointerEvent) => {
      const next = resolveState(event.target);
      setState((current) =>
        current.mode === next.mode && current.label === next.label ? current : next,
      );
    };
    const handleLeave = () => setVisible(false);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [x, y]);

  const hidden = !visible || state.mode === 'text';
  const pressScale = pressed ? 0.8 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-90 transition-opacity duration-420 ease-out data-[hidden=true]:opacity-0"
      aria-hidden="true"
      data-hidden={hidden}
    >
      <m.div
        className="fixed top-0 left-0 m-[-1.125rem_0_0_-1.125rem] size-9 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: RING_SCALE[state.mode] * pressScale }}
        transition={{ duration: DURATION.base, ease: EASE_OUT }}
      />
      <m.div
        className="fixed top-0 left-0 m-[-0.1875rem_0_0_-0.1875rem] size-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: state.mode === 'default' ? pressScale : 0 }}
        transition={{ duration: DURATION.fast, ease: EASE_OUT }}
      />
      <AnimatePresence>
        {state.mode === 'label' && (
          <m.div
            key="label"
            className="fixed top-0 left-0 m-[-2.75rem_0_0_-2.75rem] grid size-22 place-items-center rounded-full bg-accent font-mono text-[0.6875rem] font-semibold tracking-label text-accent-contrast uppercase"
            style={{ x: ringX, y: ringY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: pressScale, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
          >
            <span>{state.label}</span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
