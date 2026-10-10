import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useContent } from '@/context/locale';
import { cn, padIndex } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const factValue = 'mt-1 text-sm';

const principleItem = cn(
  'relative border-t border-line pt-6 pb-8',
  'before:absolute before:-top-px before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-900 before:ease-out [&:hover]:before:scale-x-100',
);

function Portrait() {
  const { site } = useContent();
  const figure = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: figure, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const { portrait } = site.about;

  return (
    <figure
      ref={figure}
      className="col-[1/span_5] flex flex-col gap-4 max-[1024px]:col-[1/span_6] max-[760px]:col-[1/-1]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[repeating-linear-gradient(0deg,transparent_0_3px,color-mix(in_srgb,var(--color-fg)_4%,transparent)_3px_4px),radial-gradient(120%_90%_at_30%_20%,var(--color-bg-elevated),var(--color-bg))] shadow-[inset_0_0_0_1px_var(--color-line)]">
        <m.div className="absolute inset-x-0 -inset-y-[10%] grid place-items-center" style={{ y }}>
          {portrait ? (
            <img
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover filter-[grayscale(1)_contrast(1.05)]"
            />
          ) : (
            <span
              className="serif-accent text-[length:clamp(8rem,18vw,18rem)] leading-none text-fg"
              aria-hidden="true"
            >
              {site.initials}
            </span>
          )}
        </m.div>
        <svg
          className="absolute right-[6%] bottom-[5%] w-[28%] animate-about-spin fill-fg font-mono text-[10.5px] tracking-[0.18em] uppercase"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <path id="about-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
          </defs>
          <text>
            <textPath href="#about-ring" textLength="500" lengthAdjust="spacing">
              {`${site.role} • ${site.location} • `}
            </textPath>
          </text>
        </svg>
      </div>
      <figcaption className="label">Fig. 01 — {site.name}</figcaption>
    </figure>
  );
}

export function About() {
  const { site, ui } = useContent();
  const { about } = site;

  return (
    <section id="about" className="py-section" aria-labelledby="about-title">
      <div className="site-container">
        <SectionHeader
          titleId="about-title"
          index="04"
          eyebrow={ui.about.eyebrow}
          title={about.headline}
        />

        <div className="grid grid-cols-12 items-start gap-x-gutter gap-y-12">
          <Portrait />

          <div className="col-[7/-1] flex flex-col gap-6 max-[760px]:col-[1/-1]">
            {about.bio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <p
                  className={
                    index === 0 ? 'text-xl leading-[1.35] tracking-[-0.01em]' : 'text-fg-muted'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <dl className="mt-6 grid grid-cols-2 gap-x-gutter gap-y-6 border-t border-line pt-6 max-[760px]:grid-cols-[1fr]">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="label">{fact.label}</dt>
                    <dd className={factValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-section grid grid-cols-12 gap-x-gutter">
          <p className="label col-[1/span_3] max-[760px]:col-[1/-1] max-[760px]:mb-4">
            {ui.about.principles}
          </p>
          <ol className="col-[4/-1] grid grid-cols-2 gap-x-gutter gap-y-0 max-[760px]:col-[1/-1] max-[760px]:grid-cols-[1fr]">
            {about.principles.map((principle, index) => (
              <Reveal as="li" key={index} className={principleItem} delay={index * 0.08}>
                <span className="font-mono text-xs text-accent">{padIndex(index + 1)}</span>
                <h3 className="mt-3 text-xl tracking-[-0.02em]">{principle.title}</h3>
                <p className="mt-2 text-fg-muted">{principle.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
