import { m } from 'motion/react';
import { useLocale } from '@/context/locale';
import { LOCALE_META, LOCALES } from '@/i18n/config';
import { trackEvent } from '@/lib/analytics';
import { EASE_OUT, DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Flag } from './Flag';

/** Segmented control: every language is visible, the active one sits on a sliding pill. */
export function LanguageToggle() {
  const { locale, setLocale, content } = useLocale();
  const { language } = content.ui;

  return (
    <div
      className="inline-flex h-11 items-center gap-0.5 rounded-full p-1 font-mono text-xs tracking-label inset-ring inset-ring-line-strong"
      role="group"
      aria-label={language.label}
    >
      {LOCALES.map((entry) => {
        const active = entry === locale;
        const meta = LOCALE_META[entry];
        return (
          <button
            key={entry}
            type="button"
            lang={entry}
            className={cn(
              'group/option relative inline-flex h-full items-center gap-[0.4rem] rounded-full pr-[0.6rem] pl-[0.3rem] transition-[color] duration-420 ease-out max-[480px]:px-[0.3rem]',
              active ? 'cursor-default text-bg' : 'text-fg-muted hover:text-fg',
            )}
            aria-pressed={active}
            aria-label={`${meta.short} — ${meta.name}`}
            title={active ? meta.name : language.switchTo(meta.name)}
            onClick={() => {
              if (active) return;
              setLocale(entry);
              trackEvent('language_change', { locale: entry });
            }}
          >
            {active && (
              <m.span
                layoutId="language-indicator"
                className="absolute inset-0 rounded-[inherit] bg-fg"
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
              />
            )}
            <span
              className={cn(
                'relative size-6 overflow-hidden rounded-full ring ring-fg/18 transition-[filter,opacity,scale] duration-420 ease-out',
                active
                  ? 'filter-none opacity-100'
                  : 'opacity-70 grayscale-70 group-hover/option:scale-108 group-hover/option:opacity-100 group-hover/option:filter-none',
              )}
            >
              <Flag locale={entry} className="block size-full" />
            </span>
            <span className="relative max-[480px]:hidden" aria-hidden="true">
              {meta.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
