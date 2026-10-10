export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function padIndex(index: number, length = 2): string {
  return String(index).padStart(length, '0');
}

export interface TextSegment {
  text: string;
  emphasis: boolean;
}

/** Splits `Some *emphasised* copy` into segments so content files can mark serif accents. */
export function parseEmphasis(source: string): TextSegment[] {
  return source
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('*') && part.endsWith('*')
        ? { text: part.slice(1, -1), emphasis: true }
        : { text: part, emphasis: false },
    );
}

/**
 * Splits emphasised copy into words, where each word may mix styles — so the period in
 * `*motion*.` stays glued to its word instead of becoming a word of its own.
 */
export function splitWords(source: string): TextSegment[][] {
  const words: TextSegment[][] = [];
  let current: TextSegment[] = [];

  for (const segment of parseEmphasis(source)) {
    for (const token of segment.text.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        if (current.length) words.push(current);
        current = [];
      } else {
        current.push({ text: token, emphasis: segment.emphasis });
      }
    }
  }
  if (current.length) words.push(current);
  return words;
}

export function stripEmphasis(source: string): string {
  return source.replace(/\*/g, '');
}

/** `2023-03` → `Mar 2023` (or `mar 2023` in Spanish). */
export function formatMonth(value: string, locale: string): string {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return value;
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    new Date(year, month - 1),
  );
}

export function formatPeriod(
  { start, end }: { start: string; end?: string },
  locale: string,
  presentLabel: string,
): string {
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : presentLabel}`;
}

/** Deterministic PRNG so generative artwork is stable between renders and builds. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function readCssVariable(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
