import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useContent } from '@/context/locale';
import { SECTION_IDS } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { trackEvent } from '@/lib/analytics';
import { NAV_CONDENSE_OFFSET } from '@/lib/constants';
import { padIndex } from '@/lib/utils';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { Icon } from '@/components/ui/Icon';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

/** Scroll distance before the bar starts hiding on downward scroll. */
const HIDE_AFTER = 480;

const MENU_BAR =
  'absolute left-1/2 -ml-2 h-[1.5px] w-4 bg-bg transition-transform duration-420 ease-out group-data-[menu-open=true]/header:bg-current group-data-[open=true]/menu:translate-y-0';

export function Navbar() {
  const { navigation, site, ui, locale } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(latest > NAV_CONDENSE_OFFSET);
    setHidden(latest > previous && latest > HIDE_AFTER);
  });

  return (
    <>
      <header
        className="group/header fixed inset-x-0 top-0 z-50 [transition:translate_900ms_var(--ease-out),background-color_420ms_var(--ease-out),backdrop-filter_420ms_var(--ease-out)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-line after:transition-transform after:duration-900 after:ease-out data-[condensed=true]:not-data-[menu-open=true]:bg-bg/72 data-[condensed=true]:not-data-[menu-open=true]:backdrop-blur-[14px] data-[condensed=true]:not-data-[menu-open=true]:backdrop-saturate-140 data-[condensed=true]:not-data-[menu-open=true]:after:scale-x-100 data-[hidden=true]:-translate-y-full data-[menu-open=true]:z-61 data-[menu-open=true]:bg-transparent data-[menu-open=true]:text-bg data-[menu-open=true]:[--color-fg:currentColor] data-[menu-open=true]:[--color-line-strong:color-mix(in_srgb,currentColor_30%,transparent)]"
        data-condensed={condensed}
        data-hidden={hidden && !menuOpen}
        data-menu-open={menuOpen}
      >
        <nav
          className="site-container grid h-nav grid-cols-[1fr_auto_1fr] items-center max-[860px]:grid-cols-[1fr_auto]"
          aria-label={ui.nav.primary}
        >
          <Logo onNavigate={() => setMenuOpen(false)} />

          <ul className="flex gap-[clamp(1.5rem,3vw,3rem)] max-[860px]:hidden">
            {navigation.map((item, index) => (
              <li key={item.id}>
                <AnimatedLink
                  href={`/#${item.id}`}
                  className="text-sm font-[450]"
                  aria-current={activeSection === item.id ? 'location' : undefined}
                >
                  <span
                    className="-translate-y-[0.4em] font-mono text-[0.625rem] text-fg-subtle"
                    aria-hidden="true"
                  >
                    {padIndex(index + 1)}
                  </span>
                  {item.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3 max-[860px]:gap-2">
            <a
              href={site.cv.href}
              download={site.cv.fileName}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-4 font-mono text-xs tracking-label text-bg transition-[background-color] duration-420 ease-out hover:bg-accent max-[860px]:hidden"
              aria-label={ui.cv.download}
              onClick={() => trackEvent('cv_download', { locale })}
            >
              {ui.cv.short}
              <Icon name="download" size={14} />
            </a>
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              className="group/menu relative z-61 hidden size-11 rounded-full bg-fg group-data-[menu-open=true]/header:bg-transparent group-data-[menu-open=true]/header:inset-ring group-data-[menu-open=true]/header:inset-ring-current max-[860px]:block"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
              data-open={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`${MENU_BAR} -translate-y-[3px] group-data-[open=true]/menu:rotate-45`}
              />
              <span
                className={`${MENU_BAR} translate-y-[3px] group-data-[open=true]/menu:-rotate-45`}
              />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
