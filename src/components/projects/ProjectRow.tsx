import { Link } from 'react-router';
import type { Project } from '@/types/content';
import { useContent } from '@/context/locale';
import { padIndex } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectMedia } from './ProjectMedia';

interface ProjectRowProps {
  project: Project;
  index: number;
  state: 'idle' | 'active' | 'dimmed';
  /** Touch devices get the artwork inline, since there is no hover preview. */
  inlineMedia: boolean;
  onActivate: () => void;
}

export function ProjectRow({ project, index, state, inlineMedia, onActivate }: ProjectRowProps) {
  const { ui } = useContent();
  return (
    <Reveal
      as="li"
      className="relative border-t border-line before:absolute before:-top-px before:right-0 before:left-0 before:h-px before:origin-right before:scale-x-0 before:bg-fg before:transition-transform before:duration-900 before:ease-out last:border-b has-data-[state=active]:before:origin-left has-data-[state=active]:before:scale-x-100"
      delay={index * 0.06}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group/row grid grid-cols-[4rem_minmax(0,1fr)_auto_3rem] items-center gap-x-gutter py-[clamp(1.5rem,1rem+2vw,2.75rem)] transition-opacity duration-420 ease-out [grid-template-areas:'index_title_meta_arrow'_'._details_details_.'] max-[860px]:grid-cols-[minmax(0,1fr)_auto] max-[860px]:gap-y-3 max-[860px]:[grid-template-areas:'media_media'_'index_arrow'_'title_title'_'meta_meta'_'details_details'] [@media(hover:hover)]:data-[state=dimmed]:opacity-32"
        data-state={state}
        data-cursor="label"
        data-cursor-label={ui.work.cursor}
        onPointerEnter={onActivate}
        onFocus={onActivate}
      >
        {inlineMedia && (
          <span className="col-span-full mb-6 block aspect-[16/10] overflow-hidden rounded-md max-[860px]:[grid-area:media]">
            <ProjectMedia media={project.cover} palette={project.palette} title={project.title} />
          </span>
        )}
        <span className="font-mono text-xs text-fg-subtle transition-[color] duration-420 ease-out [grid-area:index] group-data-[state=active]/row:text-accent">
          {padIndex(index + 1)}
        </span>
        <span className="text-[length:clamp(2.25rem,1.2rem+4.6vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.05em] transition-transform duration-900 ease-out [grid-area:title] [@media(hover:hover)]:group-data-[state=active]/row:translate-x-[clamp(0.75rem,2vw,2rem)]">
          {project.title}
        </span>
        <span className="flex gap-6 font-mono text-xs tracking-label text-fg-muted uppercase [grid-area:meta] max-[860px]:gap-4">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </span>
        <span
          className="grid size-12 place-items-center justify-self-end rounded-full shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[rotate,background-color,color] duration-420 ease-out [grid-area:arrow] group-data-[state=active]/row:rotate-45 group-data-[state=active]/row:bg-fg group-data-[state=active]/row:text-bg max-[860px]:size-10"
          aria-hidden="true"
        >
          <Icon name="arrowUpRight" size={22} />
        </span>
        <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-900 ease-out [grid-area:details] group-data-[state=active]/row:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
          <span className="flex min-h-0 flex-wrap items-baseline gap-x-6 gap-y-2 overflow-hidden opacity-0 transition-opacity duration-420 ease-out group-data-[state=active]/row:opacity-100 [@media(hover:none)]:opacity-100">
            <span className="basis-full pt-4 text-lg text-fg-muted">{project.summary}</span>
            <span className="font-mono text-xs tracking-label uppercase">{project.role}</span>
            <span className="font-mono text-xs tracking-label text-fg-subtle uppercase">
              {project.stack.join(' · ')}
            </span>
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
