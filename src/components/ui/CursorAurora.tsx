import { useEffect, useState } from 'react';
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Each band follows the pointer with more inertia than the previous one, so fast movement
 * stretches them into a soft trail that settles back into a single glow.
 * Radial gradients are already soft, so no blur filter is needed (and none is paid for).
 */
const BANDS = [
  {
    className:
      'h-[22rem] w-[22rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_30%,transparent),transparent)]',
    spring: { stiffness: 120, damping: 22, mass: 0.6 },
  },
  {
    className:
      'h-[26rem] w-[34rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-aurora-teal)_22%,transparent),transparent)]',
    spring: { stiffness: 55, damping: 18, mass: 0.9 },
  },
  {
    className:
      'h-[34rem] w-[46rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-aurora-blue)_16%,transparent),transparent)]',
    spring: { stiffness: 26, damping: 15, mass: 1.2 },
  },
];

/** Pointer speed (px/s) at which the aurora reaches full intensity. */
const FULL_SPEED = 1800;
const IDLE_INTENSITY = 0.35;

interface BandProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  className: string;
  spring: { stiffness: number; damping: number; mass: number };
}

function Band({ x, y, className, spring }: BandProps) {
  const bandX = useSpring(x, spring);
  const bandY = useSpring(y, spring);
  return (
    <m.div
      className={cn(
        'absolute top-0 left-0 -translate-1/2 rounded-full will-change-transform',
        className,
      )}
      style={{ x: bandX, y: bandY }}
    />
  );
}

/** Desktop-only ambient glow that trails the cursor. Purely decorative. */
export function CursorAurora() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);
  const speed = useTransform(() => Math.hypot(velocityX.get(), velocityY.get()));
  const intensity = useSpring(
    useTransform(speed, [0, FULL_SPEED], [IDLE_INTENSITY, 1], { clamp: true }),
    { stiffness: 60, damping: 20 },
  );

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [x, y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden opacity-0 mix-blend-screen transition-opacity duration-800 ease-out data-[visible=true]:opacity-100 light:mix-blend-multiply"
      aria-hidden="true"
      data-visible={visible}
    >
      <m.div className="absolute inset-0" style={{ opacity: intensity }}>
        {BANDS.map((band, index) => (
          <Band key={index} x={x} y={y} className={band.className} spring={band.spring} />
        ))}
      </m.div>
    </div>
  );
}
