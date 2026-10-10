import { useEffect, useEffectEvent, useRef } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, m, type Variants } from 'motion/react';
import { useContent } from '@/context/locale';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { trackEvent } from '@/lib/analytics';
import { DURATION, EASE_IN_OUT, EASE_OUT, STAGGER } from '@/lib/constants';
import { padIndex } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** The overlay grows out of the menu button, top-right. */
const ORIGIN = 'calc(100% - 2.75rem) 2.25rem';

const panel: Variants = {
  closed: { clipPath: `circle(0% at ${ORIGIN})` },
  open: { clipPath: `circle(150% at ${ORIGIN})` },
};

const item: Variants = {
  closed: { y: '100%' },
  open: (index: number) => ({
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE_OUT, delay: 0.25 + index * STAGGER.items },
  }),
};

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { navigation, site, socials, ui, locale } = useContent();
  const dialog = useRef<HTMLDivElement>(null);
  const close = useEffectEvent(onClose);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialog.current) return;

      const focusable = [...dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={dialog}
          id="mobile-menu"
          className="fixed inset-0 z-60 flex flex-col justify-between overflow-y-auto bg-fg px-gutter pt-[calc(var(--spacing-nav)+3rem)] pb-8 text-bg"
          role="dialog"
          aria-modal="true"
          aria-label={ui.nav.siteMenu}
          variants={panel}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: DURATION.slow, ease: EASE_IN_OUT }}
        >
          <nav aria-label={ui.nav.mobile}>
            <ul className="flex flex-col">
              {navigation.map((entry, index) => (
                <li key={entry.id} className="overflow-clip border-b border-bg/15">
                  <m.span className="block" variants={item} custom={index}>
                    <Link
                      to={`/#${entry.id}`}
                      className="flex items-baseline gap-4 py-3 text-[length:clamp(2.75rem,13vw,5rem)] leading-none font-medium tracking-tight focus-visible:outline-bg"
                      onClick={onClose}
                    >
                      <span className="font-mono text-xs tracking-normal opacity-50">
                        {padIndex(index + 1)}
                      </span>
                      {entry.label}
                    </Link>
                  </m.span>
                </li>
              ))}
            </ul>
          </nav>

          <m.div
            className="flex flex-col gap-4 pt-12 font-mono text-xs tracking-label uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: DURATION.base } }}
            exit={{ opacity: 0 }}
          >
            <a
              href={site.cv.href}
              download={site.cv.fileName}
              className="inline-flex items-center gap-2 self-start rounded-full bg-bg px-5 py-3.5 text-fg focus-visible:outline-bg"
              onClick={() => trackEvent('cv_download', { locale })}
            >
              {ui.cv.download}
              <Icon name="download" size={14} />
            </a>
            <a href={`mailto:${site.email}`} className="text-sm tracking-normal normal-case">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-4 opacity-70">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
