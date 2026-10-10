import { useRef, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import { m, useScroll, useTransform } from 'motion/react';
import type { Project } from '@/types/content';
import { useContent } from '@/context/locale';
import { getNextProject, getProjectBySlug } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';
import { padIndex } from '@/lib/utils';
import { ProjectMedia } from '@/components/projects/ProjectMedia';
import { Icon } from '@/components/ui/Icon';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { NotFoundPage } from './NotFoundPage';

const sectionGrid = 'grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-x-gutter gap-y-8 mt-8';

function CoverReveal({ project }: { project: Project }) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'start 0.2'] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(12% 8% 12% 8% round 24px)', 'inset(0% 0% 0% 0% round 12px)'],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <m.div
      ref={frame}
      className="aspect-video overflow-hidden will-change-[clip-path]"
      style={{ clipPath }}
    >
      <m.div className="size-full" style={{ scale }}>
        <ProjectMedia
          media={project.cover}
          palette={project.palette}
          title={project.title}
          priority
        />
      </m.div>
    </m.div>
  );
}

function NextProject({ project }: { project: Project }) {
  const { ui } = useContent();
  return (
    <section className="border-t border-line" aria-labelledby="next-title">
      <Link
        to={`/projects/${project.slug}`}
        className="group/next relative isolate grid justify-items-center gap-6 overflow-hidden px-gutter py-section text-center"
        data-cursor="label"
        data-cursor-label={ui.project.nextCursor}
      >
        <span className="label">{ui.project.next}</span>
        <span
          id="next-title"
          className="inline-flex items-center gap-[0.2em] text-display leading-tight tracking-[-0.06em] transition-transform duration-900 ease-out"
        >
          {project.title}
          <Icon
            name="arrowRight"
            className="size-[0.4em] transition-transform duration-900 ease-out group-hover/next:translate-x-[0.15em]"
          />
        </span>
        <span className="absolute inset-0 -z-1 scale-108 opacity-0 transition-[opacity,scale] duration-900 ease-out after:absolute after:inset-0 after:bg-bg/55 group-hover/next:scale-100 group-hover/next:opacity-100 group-focus-visible/next:scale-100 group-focus-visible/next:opacity-100">
          <ProjectMedia media={project.cover} palette={project.palette} title={project.title} />
        </span>
      </Link>
    </section>
  );
}

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const { projects, ui } = useContent();
  const project = getProjectBySlug(projects, slug);

  useSeo({
    title: project?.title ?? ui.notFound.seoTitle,
    description: project?.summary,
    path: `/projects/${slug}`,
    type: 'article',
    noindex: !project,
  });

  if (!project) return <NotFoundPage />;

  const next = getNextProject(projects, project.slug);
  const study = project.caseStudy;
  const t = ui.project;
  const meta = [
    { label: t.role, value: project.role },
    { label: t.client, value: project.client ?? t.personal },
    { label: t.year, value: String(project.year) },
    { label: t.category, value: project.category },
  ];

  return (
    <main
      id="main"
      tabIndex={-1}
      className="pt-[calc(var(--spacing-nav)+--spacing(12))]"
      style={{ '--project-accent': project.palette.accent } as CSSProperties}
    >
      <article>
        <header className="site-container grid gap-8 pb-[clamp(3rem,2rem+4vw,6rem)]">
          <Link
            to="/#work"
            className="label group/back inline-flex items-center gap-2 justify-self-start transition-[color] duration-420 ease-out hover:text-fg"
          >
            <Icon
              name="arrowRight"
              className="rotate-180 transition-[translate] duration-420 ease-out group-hover/back:translate-x-[-4px]"
            />
            {t.allWork}
          </Link>
          <SplitReveal
            as="h1"
            text={project.title}
            className="ml-[-0.04em] text-display leading-tight tracking-[-0.06em]"
          />
          <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-x-gutter gap-y-12 max-[860px]:grid-cols-[1fr]">
            <Reveal>
              <p className="max-w-[40rem] text-xl leading-[1.35]">{project.description}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-x-gutter gap-y-6">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="label">{item.label}</dt>
                    <dd className="mt-1 text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        <div className="site-container">
          <CoverReveal project={project} />
        </div>

        {study && (
          <>
            <section
              className="site-container grid grid-cols-2 gap-x-gutter gap-y-12 pt-section pb-0 max-[860px]:grid-cols-[1fr]"
              aria-label={t.problemAndSolution}
            >
              <Reveal className="flex flex-col gap-4 border-t border-line pt-6">
                <h2 className="label">{t.problem}</h2>
                <p className="text-xl leading-[1.4]">{study.problem}</p>
              </Reveal>
              <Reveal className="flex flex-col gap-4 border-t border-line pt-6" delay={0.1}>
                <h2 className="label">{t.solution}</h2>
                <p className="text-xl leading-[1.4]">{study.solution}</p>
              </Reveal>
            </section>

            <section
              className="site-container grid grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-x-gutter gap-y-8 pt-section max-[860px]:grid-cols-[1fr]"
              aria-labelledby="role-title"
            >
              <h2 id="role-title" className="label">
                {t.myRole}
              </h2>
              <ul className="flex flex-col text-2xl leading-[1.2] tracking-[-0.025em]">
                {study.responsibilities.map((item) => (
                  <Reveal as="li" key={item} className="border-b border-line py-3">
                    {item}
                  </Reveal>
                ))}
              </ul>
              <ul
                className="col-start-2 flex flex-wrap gap-2 max-[860px]:col-start-1"
                aria-label={t.stack}
              >
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full px-[0.8rem] py-[0.35rem] font-mono text-xs shadow-[inset_0_0_0_1px_var(--color-line-strong)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section className="site-container pt-section" aria-labelledby="process-title">
              <h2 id="process-title" className="label">
                {t.process}
              </h2>
              <ol className={sectionGrid}>
                {study.process.map((step, index) => (
                  <Reveal
                    as="li"
                    key={step.title}
                    className="border-t border-line-strong pt-6"
                    delay={index * 0.08}
                  >
                    <span className="font-mono text-xs text-(--project-accent)">
                      {padIndex(index + 1)}
                    </span>
                    <h3 className="mt-4 text-xl">{step.title}</h3>
                    <p className="mt-2 text-fg-muted">{step.description}</p>
                  </Reveal>
                ))}
              </ol>
            </section>

            {study.gallery.length > 0 && (
              <section
                className="site-container grid grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))] gap-gutter pt-section"
                aria-label={t.gallery}
              >
                {study.gallery.map((media, index) => (
                  <Reveal
                    as="figure"
                    key={index}
                    className="flex flex-col gap-3"
                    delay={index * 0.1}
                  >
                    <ProjectMedia
                      media={media}
                      palette={project.palette}
                      title={project.title}
                      className="aspect-[4/3] overflow-hidden rounded-md"
                    />
                    <figcaption className="label">{media.alt}</figcaption>
                  </Reveal>
                ))}
              </section>
            )}

            <section className="site-container pt-section" aria-labelledby="results-title">
              <h2 id="results-title" className="label">
                {t.results}
              </h2>
              <dl className={sectionGrid}>
                {study.results.map((metric, index) => (
                  <Reveal
                    key={metric.label}
                    className="flex flex-col-reverse gap-2 border-t border-line pt-6"
                    delay={index * 0.08}
                  >
                    <dt className="text-fg-muted">{metric.label}</dt>
                    <dd className="text-3xl leading-none tracking-tight">{metric.value}</dd>
                  </Reveal>
                ))}
              </dl>
            </section>
          </>
        )}

        {(project.links.live || project.links.github) && (
          <div className="site-container flex flex-wrap gap-3 py-section">
            {project.links.live && (
              <MagneticButton href={project.links.live} variant="solid" icon="arrowUpRight">
                {t.liveDemo}
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton href={project.links.github} icon="arrowUpRight">
                {t.source}
              </MagneticButton>
            )}
          </div>
        )}
      </article>

      <NextProject project={next} />
    </main>
  );
}
