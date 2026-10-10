import { useRef, useState, type PointerEvent } from 'react';
import { useInView, useSpring } from 'motion/react';
import type { Project } from '@/types/content';
import { useExperience } from '@/context/experience';
import { SPRING } from '@/lib/constants';
import { ProjectPreview } from './ProjectPreview';
import { ProjectRow } from './ProjectRow';

interface ProjectIndexProps {
  projects: Project[];
  onActiveChange?: (project: Project | null) => void;
}

export function ProjectIndex({ projects, onActiveChange }: ProjectIndexProps) {
  const { finePointer } = useExperience();
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);
  // Keyboard focus also activates rows; the floating frame only follows a real pointer.
  const [pointerInside, setPointerInside] = useState(false);
  // Scrolling away without moving the mouse fires no pointerleave; this hides the frame anyway.
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const x = useSpring(0, SPRING.preview);
  const y = useSpring(0, SPRING.preview);

  const activate = (index: number | null) => {
    setActive(index);
    if (index !== null) setLastActive(index);
    onActiveChange?.(index === null ? null : (projects[index] ?? null));
  };

  const pointerHandlers = finePointer
    ? {
        // Jump on entry so the frame appears under the cursor instead of flying in.
        onPointerEnter: (event: PointerEvent<HTMLElement>) => {
          x.jump(event.clientX);
          y.jump(event.clientY);
          setPointerInside(true);
        },
        onPointerMove: (event: PointerEvent<HTMLElement>) => {
          x.set(event.clientX);
          y.set(event.clientY);
        },
      }
    : {};

  return (
    <div
      ref={root}
      className="relative"
      {...pointerHandlers}
      onPointerLeave={() => {
        setPointerInside(false);
        activate(null);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) activate(null);
      }}
    >
      <ul className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            inlineMedia={!finePointer}
            state={active === null ? 'idle' : active === index ? 'active' : 'dimmed'}
            onActivate={() => activate(index)}
          />
        ))}
      </ul>
      {finePointer && (
        <ProjectPreview
          projects={projects}
          index={lastActive}
          visible={inView && pointerInside && active !== null}
          x={x}
          y={y}
        />
      )}
    </div>
  );
}
