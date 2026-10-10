import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { detectDeviceProfile } from '@/lib/device';
import { MEDIA_QUERIES, STORAGE_KEYS } from '@/lib/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  ACCENTS,
  ExperienceContext,
  type Accent,
  type ExperienceValue,
  type Theme,
} from './experience';

function readInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this session.
  }
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [device] = useState(detectDeviceProfile);
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [accent, setAccent] = useState<Accent>('signal');
  const reducedMotion = useMediaQuery(MEDIA_QUERIES.reducedMotion);
  const finePointer = useMediaQuery(MEDIA_QUERIES.finePointer);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      const apply = () => {
        root.dataset.theme = next;
        persistTheme(next);
        flushSync(() => setTheme(next));
      };

      if (reducedMotion || !('startViewTransition' in document)) {
        apply();
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty('--vt-r', `${radius}px`);
      document.startViewTransition(apply);
    },
    [theme, reducedMotion],
  );

  const cycleAccent = useCallback(() => {
    const next = ACCENTS[(ACCENTS.indexOf(accent) + 1) % ACCENTS.length] ?? 'signal';
    if (next === 'signal') delete document.documentElement.dataset.accent;
    else document.documentElement.dataset.accent = next;
    setAccent(next);
  }, [accent]);

  const value = useMemo<ExperienceValue>(
    () => ({ device, reducedMotion, finePointer, theme, toggleTheme, accent, cycleAccent }),
    [device, reducedMotion, finePointer, theme, toggleTheme, accent, cycleAccent],
  );

  return <ExperienceContext value={value}>{children}</ExperienceContext>;
}
