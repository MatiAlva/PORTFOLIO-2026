import { createContext, useContext } from 'react';
import type { Content } from '@/data';
import type { Locale } from '@/i18n/config';

export interface LocaleValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Every piece of copy for the active language: site, projects, experience, UI… */
  content: Content;
}

export const LocaleContext = createContext<LocaleValue | null>(null);

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>');
  return value;
}

export function useContent(): Content {
  return useLocale().content;
}
