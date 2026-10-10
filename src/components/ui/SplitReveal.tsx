import { Fragment } from 'react';
import { m, type Variants } from 'motion/react';
import { DURATION, EASE_OUT, STAGGER } from '@/lib/constants';
import { cn, splitWords, stripEmphasis } from '@/lib/utils';
import { WordParts } from './WordParts';
type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface SplitRevealProps {
  text: string;
  id?: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Controlled playback (e.g. after the preloader). When omitted, plays on scroll into view. */
  play?: boolean;
}

const wordVariants: Variants = {
  hidden: { y: '110%' },
  visible: (index: number) => ({
    y: '0%',
    transition: { duration: DURATION.reveal, ease: EASE_OUT, delay: index },
  }),
};

/**
 * Word-by-word masked reveal. Screen readers and crawlers get the plain sentence;
 * the animated words are presentation only. `*word*` renders in the serif accent.
 */
export function SplitReveal({
  text,
  id,
  as: Component = 'span',
  className,
  delay = 0,
  stagger = STAGGER.words,
  play,
}: SplitRevealProps) {
  const words = splitWords(text);

  const playback =
    play === undefined
      ? { whileInView: 'visible', viewport: { once: true, amount: 0.6 } }
      : { animate: play ? 'visible' : 'hidden' };

  return (
    <Component className={cn('block', className)}>
      {/* `id` targets the plain text so `aria-labelledby` never reads the split words. */}
      <span id={id} className="sr-only">
        {stripEmphasis(text)}
      </span>
      <m.span aria-hidden="true" initial="hidden" {...playback}>
        {words.map((parts, index) => (
          <Fragment key={index}>
            <span className="mt-[-0.06em] mb-[-0.12em] inline-block overflow-clip pt-[0.06em] pe-[0.04em] pb-[0.12em] align-top">
              <m.span
                className="inline-block will-change-transform"
                variants={wordVariants}
                custom={delay + index * stagger}
              >
                <WordParts parts={parts} />
              </m.span>
            </span>{' '}
          </Fragment>
        ))}
      </m.span>
    </Component>
  );
}
