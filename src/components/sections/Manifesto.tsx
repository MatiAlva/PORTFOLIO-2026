import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useExperience, type Theme } from '@/context/experience';
import { useContent } from '@/context/locale';
import { splitWords, type TextSegment } from '@/lib/utils';
import { WordParts } from '@/components/ui/WordParts';

/**
 * Opacity of words the reader has not reached yet: the lowest value that still keeps a
 * 3:1 contrast ratio (WCAG AA for large text) against each theme's background.
 */
const DIM: Record<Theme, number> = { dark: 0.38, light: 0.48 };

interface WordProps {
  parts: TextSegment[];
  range: [number, number];
  progress: MotionValue<number>;
  dim: number;
}

function Word({ parts, range, progress, dim }: WordProps) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <m.span className="will-change-[opacity]" style={{ opacity }}>
        <WordParts parts={parts} />
      </m.span>{' '}
    </>
  );
}

/**
 * Identity statement whose words light up as the reader scrolls, so the sentence is
 * literally read at scroll speed. Real text — fully readable without animation.
 */
export function Manifesto() {
  const { reducedMotion, theme } = useExperience();
  const { site, ui } = useContent();
  const words = splitWords(site.manifesto);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraph,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <section className="py-section" aria-label={ui.manifesto}>
      <div className="site-container grid grid-cols-12 gap-x-gutter">
        <p className="label col-[1/span_3] inline-flex items-center gap-3 self-start pt-[0.9em] max-[860px]:col-[1/-1] max-[860px]:mb-6">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          {ui.manifesto}
        </p>
        <p
          ref={paragraph}
          className="col-[4/-1] text-[length:clamp(1.75rem,1rem+3.2vw,4.25rem)] leading-[1.08] font-[450] tracking-[-0.035em] text-pretty max-[860px]:col-[1/-1]"
        >
          {words.map((parts, index) =>
            reducedMotion ? (
              <span key={index}>
                <WordParts parts={parts} />{' '}
              </span>
            ) : (
              <Word
                key={index}
                parts={parts}
                range={[index / words.length, (index + 1) / words.length]}
                progress={scrollYProgress}
                dim={DIM[theme]}
              />
            ),
          )}
        </p>
      </div>
    </section>
  );
}
