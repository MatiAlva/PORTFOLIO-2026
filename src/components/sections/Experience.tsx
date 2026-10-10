import { useRef } from 'react';
import { m, useInView, useScroll, useSpring } from 'motion/react';
import type { Experience as ExperienceEntry } from '@/types/content';
import { useContent } from '@/context/locale';
import { LOCALE_META } from '@/i18n/config';
import { SPRING } from '@/lib/constants';
import { formatPeriod } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

function TimelineItem({ entry }: { entry: ExperienceEntry }) {
  const { ui, locale } = useContent();
  const item = useRef<HTMLLIElement>(null);
  const reached = useInView(item, { margin: '0px 0px -50% 0px' });

  return (
    <li
      ref={item}
      className="group relative grid grid-cols-[25%_minmax(0,1fr)] gap-x-gutter pb-[clamp(3rem,2rem+4vw,6rem)] last:pb-0 max-[860px]:grid-cols-1 max-[860px]:gap-y-4 max-[860px]:pl-8"
      data-reached={reached}
    >
      <span
        className="absolute top-[0.35rem] left-(--rail-x) -ml-1.5 size-3 rounded-full bg-bg shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,box-shadow,scale] duration-420 ease-out group-data-[reached=true]:scale-110 group-data-[reached=true]:bg-accent group-data-[reached=true]:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]"
        aria-hidden="true"
      />
      <Reveal className="flex flex-col gap-2 pr-8 max-[860px]:p-0">
        <span className="label">
          {formatPeriod(entry, LOCALE_META[locale].intl, ui.experience.present)}
        </span>
        {!entry.end && (
          <span className="self-start rounded-full bg-fg px-[0.55rem] py-[0.2rem] font-mono text-[0.625rem] tracking-label text-bg uppercase">
            {ui.experience.current}
          </span>
        )}
      </Reveal>
      <Reveal className="max-w-[46rem] pl-8 max-[860px]:p-0" delay={0.08}>
        <h3 className="text-2xl leading-[1.05] tracking-[-0.03em]">{entry.role}</h3>
        <p className="mt-2 text-fg-muted">
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-line-strong underline-offset-[0.25em] transition-[text-decoration-color] duration-420 ease-out hover:decoration-current"
            >
              {entry.company}
              <span className="sr-only">{ui.opensInNewTab}</span>
            </a>
          ) : (
            entry.company
          )}
          <span aria-hidden="true"> — </span>
          {entry.location}
        </p>
        <p className="mt-6 text-fg-muted">{entry.description}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {entry.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-accent before:content-['']"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}

export function Experience() {
  const { experience, ui } = useContent();
  const timeline = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timeline,
    offset: ['start 0.6', 'end 0.6'],
  });
  const scaleY = useSpring(scrollYProgress, SPRING.progress);

  return (
    <section id="experience" className="py-section" aria-labelledby="experience-title">
      <div className="site-container">
        <SectionHeader
          titleId="experience-title"
          index="02"
          eyebrow={ui.experience.eyebrow}
          title={ui.experience.title}
        />
        <div className="relative [--rail-x:calc(25%_+_var(--spacing-gutter)_/_2)] before:absolute before:inset-y-0 before:left-(--rail-x) before:w-px before:bg-line before:content-[''] max-[860px]:[--rail-x:0.375rem]">
          <m.span
            className="absolute inset-y-0 left-(--rail-x) w-px origin-top bg-accent"
            style={{ scaleY }}
            aria-hidden="true"
          />
          <ol ref={timeline}>
            {experience.map((entry) => (
              <TimelineItem key={`${entry.company}-${entry.start}`} entry={entry} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
