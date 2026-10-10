import { m, useTransform, useVelocity, type MotionValue } from 'motion/react';
import type { Project } from '@/types/content';
import { DURATION, EASE_OUT } from '@/lib/constants';
import { ProjectMedia } from './ProjectMedia';

interface ProjectPreviewProps {
  projects: Project[];
  /** Index shown in the frame — kept after hover ends so the exit doesn't flash. */
  index: number;
  visible: boolean;
  /** Already-smoothed pointer position (springs owned by the parent). */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/** Maximum tilt (deg) reached when the pointer moves fast horizontally. */
const MAX_TILT = 9;
const VELOCITY_RANGE = 1600;

/**
 * Floating frame that trails the cursor over the project list. All covers live in one
 * vertical strip, so switching projects is a single translate instead of a re-mount.
 */
export function ProjectPreview({ projects, index, visible, x, y }: ProjectPreviewProps) {
  const velocity = useVelocity(x);
  const rotate = useTransform(velocity, [-VELOCITY_RANGE, VELOCITY_RANGE], [-MAX_TILT, MAX_TILT], {
    clamp: true,
  });

  return (
    <m.div
      className="pointer-events-none fixed top-0 left-0 z-89 aspect-[4/3] w-[clamp(18rem,24vw,26rem)] -translate-x-1/2 -translate-y-1/2"
      style={{ x, y, rotate }}
      aria-hidden="true"
    >
      <m.div
        className="size-full overflow-hidden rounded-md will-change-[clip-path,transform]"
        initial={false}
        animate={{
          clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(50% 50% 50% 50%)',
          scale: visible ? 1 : 0.8,
        }}
        transition={{ duration: DURATION.slow * 0.8, ease: EASE_OUT }}
      >
        <m.div
          className="h-full"
          initial={false}
          animate={{ y: `${-index * 100}%` }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        >
          {projects.map((project) => (
            <div key={project.slug} className="h-full">
              <ProjectMedia media={project.cover} palette={project.palette} title={project.title} />
            </div>
          ))}
        </m.div>
      </m.div>
    </m.div>
  );
}
