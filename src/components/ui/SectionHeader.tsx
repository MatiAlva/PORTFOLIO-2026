import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SplitReveal } from './SplitReveal';
interface SectionHeaderProps {
  /** Applied to the heading, so sections can reference it with `aria-labelledby`. */
  titleId: string;
  index: string;
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  className?: string;
}

export function SectionHeader({
  titleId,
  index,
  eyebrow,
  title,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'mb-[clamp(3rem,2rem+5vw,7rem)] grid grid-cols-12 items-end gap-x-gutter gap-y-6',
        className,
      )}
    >
      <p className="label col-span-full flex gap-3">
        <span className="text-accent">({index})</span>
        {eyebrow}
      </p>
      <SplitReveal
        as="h2"
        id={titleId}
        text={title}
        className="col-[1/span_9] text-3xl leading-none tracking-tight max-[860px]:col-span-full"
      />
      {aside && (
        <div className="col-[10/-1] justify-self-end text-right text-sm text-fg-muted max-[860px]:col-span-full max-[860px]:justify-self-start max-[860px]:text-left">
          {aside}
        </div>
      )}
    </header>
  );
}
