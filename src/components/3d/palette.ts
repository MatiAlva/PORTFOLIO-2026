import { Color } from 'three';
import { readCssVariable } from '@/lib/utils';

/**
 * Target colors for every scene material, sourced from the CSS design tokens so the theme
 * and accent stay defined in a single place. Materials ease toward these every frame.
 */
export const scenePalette = {
  base: new Color(),
  line: new Color(),
  rim: new Color(),
};

export function syncScenePalette(): void {
  scenePalette.base.set(readCssVariable('--color-bg-elevated') || '#131315');
  scenePalette.line.set(readCssVariable('--color-fg') || '#ecebe6');
  scenePalette.rim.set(readCssVariable('--color-accent') || '#ff4f1f');
}

const COLOR_EASING = 3.5;

/** Frame-rate independent color easing; snaps when `instant` (reduced motion). */
export function easeColor(current: Color, target: Color, delta: number, instant: boolean): void {
  if (instant) current.copy(target);
  else current.lerp(target, 1 - Math.exp(-COLOR_EASING * delta));
}
