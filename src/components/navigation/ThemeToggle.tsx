import type { MouseEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useExperience } from '@/context/experience';
import { useContent } from '@/context/locale';
import { DURATION, EASE_OUT } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useExperience();
  const { ui } = useContent();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className="grid size-11 place-items-center rounded-full inset-ring inset-ring-line-strong transition-shadow duration-420 ease-out hover:inset-ring-fg"
      onClick={handleClick}
      aria-label={theme === 'dark' ? ui.theme.toLight : ui.theme.toDark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          className="grid place-items-center"
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: DURATION.fast * 1.5, ease: EASE_OUT }}
        >
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} />
        </m.span>
      </AnimatePresence>
    </button>
  );
}
