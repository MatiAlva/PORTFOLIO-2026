import { useState, type CSSProperties } from 'react';
import { AnimatePresence, m } from 'motion/react';
import type { Skill } from '@/types/content';
import { useContent } from '@/context/locale';
import { DURATION, EASE_OUT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Ring diameters (% of the system) and seconds per revolution, inner → outer. */
const RINGS = [
  { size: 38, duration: 70 },
  { size: 64, duration: 110 },
  { size: 90, duration: 150 },
];

const CHIP =
  'pointer-events-auto rounded-full bg-bg px-[0.85rem] py-[0.45rem] font-mono text-xs whitespace-nowrap shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color,box-shadow,scale] duration-420 ease-out hover:shadow-[inset_0_0_0_1px_var(--color-fg)]! aria-pressed:scale-112 aria-pressed:bg-accent aria-pressed:text-accent-contrast aria-pressed:shadow-none';

/** Counter-spins with its ring (rotations compose through `rotate`, `transform` keeps the angle). */
const ORBIT_CHIP =
  'absolute top-0 left-1/2 -translate-1/2 animate-[stack-spin_var(--ring-duration)_linear_infinite_reverse] [transform:rotate(calc(-1*var(--angle)))] group-focus-within/system:[animation-play-state:paused] group-hover/system:[animation-play-state:paused] group-data-[direction=reverse]/ring:[animation-direction:normal]';

interface SkillButtonProps {
  skill: Skill;
  active: boolean;
  onSelect: (name: string) => void;
  className?: string;
  style?: CSSProperties;
}

function SkillButton({ skill, active, onSelect, className, style }: SkillButtonProps) {
  return (
    <button
      type="button"
      className={cn(CHIP, className)}
      style={style}
      aria-pressed={active}
      onPointerEnter={() => onSelect(skill.name)}
      onFocus={() => onSelect(skill.name)}
      onClick={() => onSelect(skill.name)}
    >
      {skill.name}
    </button>
  );
}

export function Stack() {
  const { skills, skillCategories, ui } = useContent();
  // Stored by name so switching language keeps the selection and picks up the new copy.
  const [activeName, setActiveName] = useState(() => skills[0]?.name ?? '');
  const active = skills.find((skill) => skill.name === activeName) ?? skills[0];
  const category = skillCategories.find((entry) => entry.id === active?.category);
  const grouped = skillCategories.map((group) => ({
    ...group,
    items: skills.filter((skill) => skill.category === group.id),
  }));

  if (!active) return null;

  return (
    <section id="stack" className="overflow-clip py-section" aria-labelledby="stack-title">
      <div className="site-container">
        <SectionHeader
          titleId="stack-title"
          index="03"
          eyebrow={ui.stack.eyebrow}
          title={ui.stack.title}
          aside={ui.stack.hint}
        />

        <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-gutter max-[1024px]:grid-cols-1">
          <div className="group/system relative mx-auto aspect-square w-[min(100%,44rem)] max-[640px]:hidden">
            <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
              <span className="aspect-square w-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-bg-elevated),var(--color-bg)_60%,var(--color-accent))] shadow-[0_0_60px_color-mix(in_srgb,var(--color-accent)_35%,transparent)]" />
            </div>
            {grouped.map((group, ringIndex) => {
              const ring = RINGS[ringIndex] ?? RINGS[RINGS.length - 1];
              return (
                <ul
                  key={group.id}
                  className="group/ring pointer-events-none absolute top-1/2 left-1/2 aspect-square w-(--ring-size) -translate-1/2 animate-[stack-spin_var(--ring-duration)_linear_infinite] rounded-full border border-dashed border-line-strong group-focus-within/system:[animation-play-state:paused] group-hover/system:[animation-play-state:paused] data-[direction=reverse]:[animation-direction:reverse]"
                  aria-label={group.label}
                  data-direction={ringIndex % 2 === 0 ? 'normal' : 'reverse'}
                  style={
                    {
                      '--ring-size': `${ring?.size}%`,
                      '--ring-duration': `${ring?.duration}s`,
                    } as CSSProperties
                  }
                >
                  {group.items.map((skill, index) => (
                    <li
                      key={skill.name}
                      className="pointer-events-none absolute inset-0 [transform:rotate(var(--angle))]"
                      style={
                        {
                          '--angle': `${(index / group.items.length) * 360 + ringIndex * 24}deg`,
                        } as CSSProperties
                      }
                    >
                      <SkillButton
                        skill={skill}
                        active={skill.name === active.name}
                        onSelect={setActiveName}
                        className={ORBIT_CHIP}
                      />
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>

          <div className="hidden max-[640px]:block">
            {grouped.map((group) => (
              <div key={group.id} className="not-first:mt-6">
                <p className="label">{group.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={group.label}>
                  {group.items.map((skill) => (
                    <li key={skill.name}>
                      <SkillButton
                        skill={skill}
                        active={skill.name === active.name}
                        onSelect={setActiveName}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside
            className="min-h-80 border-t border-line-strong p-[clamp(1.5rem,3vw,2.5rem)] max-[640px]:min-h-64 max-[640px]:px-0"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: DURATION.fast * 1.5, ease: EASE_OUT }}
              >
                <p className="label">{category?.label}</p>
                <h3 className="mt-4 text-3xl leading-none tracking-tight">{active.name}</h3>
                <p className="mt-4 font-serif text-xl leading-[1.3] text-fg-muted italic">
                  {active.note}
                </p>
              </m.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
