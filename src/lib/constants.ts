type Bezier = [number, number, number, number];

/** Mirrors the CSS custom properties in tokens.css so JS and CSS motion feel identical. */
export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.18,
  base: 0.42,
  slow: 0.9,
  reveal: 1.1,
} as const;

export const STAGGER = {
  words: 0.05,
  items: 0.08,
} as const;

export const SPRING = {
  cursor: { stiffness: 520, damping: 42, mass: 0.4 },
  cursorTrail: { stiffness: 180, damping: 24, mass: 0.6 },
  magnetic: { stiffness: 220, damping: 16, mass: 0.4 },
  preview: { stiffness: 160, damping: 22, mass: 0.6 },
  progress: { stiffness: 140, damping: 30, restDelta: 0.001 },
} as const;

export const MEDIA_QUERIES = {
  finePointer: '(hover: hover) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  mobile: '(max-width: 767px)',
  desktop: '(min-width: 1024px)',
} as const;

export const BOOT = {
  /** Shortest time the preloader stays visible, so it never flickers. */
  minDuration: 900,
  /** Hard cap: content is revealed even if web fonts are still loading. */
  maxDuration: 2600,
} as const;

/** Scroll distance (px) after which the navigation switches to its condensed state. */
export const NAV_CONDENSE_OFFSET = 40;

export const STORAGE_KEYS = {
  theme: 'theme',
  locale: 'locale',
} as const;
