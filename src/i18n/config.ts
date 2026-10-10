export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_META: Record<Locale, { name: string; short: string; intl: string }> = {
  es: { name: 'Español', short: 'ES', intl: 'es-AR' },
  en: { name: 'English', short: 'EN', intl: 'en-US' },
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}
