import { createContext, useContext } from 'react';
import type { DeviceProfile } from '@/lib/device';

export type Theme = 'dark' | 'light';
export type Accent = 'signal' | 'acid' | 'ion' | 'rose';

export const ACCENTS: Accent[] = ['signal', 'acid', 'ion', 'rose'];

export interface ExperienceValue {
  device: DeviceProfile;
  reducedMotion: boolean;
  /** Desktop-like pointer: enables custom cursor, magnetic effects and hover previews. */
  finePointer: boolean;
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  accent: Accent;
  cycleAccent: () => void;
}

export const ExperienceContext = createContext<ExperienceValue | null>(null);

export function useExperience(): ExperienceValue {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error('useExperience must be used inside <ExperienceProvider>');
  return value;
}
