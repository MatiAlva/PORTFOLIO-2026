import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { content } from '@/data';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { STORAGE_KEYS } from '@/lib/constants';
import { LocaleContext, type LocaleValue } from './locale';

/** `public/theme-init.js` already applied the stored language to `<html lang>`. */
function readInitialLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    document.documentElement.lang = next;
    try {
      localStorage.setItem(STORAGE_KEYS.locale, next);
    } catch {
      // Storage can be unavailable (private mode); the language still applies for this session.
    }
    setLocaleState(next);
  }, []);

  const value = useMemo<LocaleValue>(
    () => ({ locale, setLocale, content: content[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
}
