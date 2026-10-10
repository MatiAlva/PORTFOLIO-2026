import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds per loop. */
  duration?: number;
}

const COPIES = 2;

/** Pure CSS loop: two identical tracks translate by -100% for a seamless repeat. */
export function Marquee({ items, className, duration = 40 }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group/marquee flex overflow-hidden select-none [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
        className,
      )}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <p className="sr-only">{items.join(' — ')}</p>
      {Array.from({ length: COPIES }, (_, copy) => (
        <ul
          key={copy}
          className="flex min-w-full shrink-0 animate-marquee-scroll group-[:hover]/marquee:[animation-play-state:paused] motion-reduce:animate-none"
          aria-hidden="true"
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-[clamp(1.5rem,3vw,3rem)] pr-[clamp(1.5rem,3vw,3rem)] whitespace-nowrap"
            >
              {item}
              <span className="size-[0.4em] rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
