import { useState, type CSSProperties } from 'react';
import { useContent } from '@/context/locale';
import { cn } from '@/lib/utils';
import { ProjectIndex } from '@/components/projects/ProjectIndex';
import { SectionHeader } from '@/components/ui/SectionHeader';
export function Work() {
  const { projects, ui } = useContent();
  const [tint, setTint] = useState<string | null>(null);
  const years = projects.map((project) => project.year);

  return (
    <section
      id="work"
      className={cn(
        'relative isolate py-section',
        'before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(60%_50%_at_70%_55%,color-mix(in_srgb,var(--work-tint)_14%,transparent),transparent_70%)] before:transition-[--work-tint] before:duration-700 before:ease-out',
      )}
      aria-labelledby="work-title"
      style={{ '--work-tint': tint ?? 'transparent' } as CSSProperties}
    >
      <div className="site-container relative">
        <SectionHeader
          titleId="work-title"
          index="01"
          eyebrow={ui.work.eyebrow}
          title={ui.work.title}
          aside={
            <>
              {ui.work.caseStudies(projects.length)}
              <br />
              {Math.min(...years)} — {Math.max(...years)}
            </>
          }
        />
        <ProjectIndex
          projects={projects}
          onActiveChange={(project) => setTint(project?.palette.accent ?? null)}
        />
      </div>
    </section>
  );
}
