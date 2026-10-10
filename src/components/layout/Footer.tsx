import { useContent } from '@/context/locale';
import { useLocalTime } from '@/hooks/useLocalTime';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { Icon } from '@/components/ui/Icon';

const YEAR = new Date().getFullYear();

export function Footer() {
  const { site, socials, ui } = useContent();
  const localTime = useLocalTime(site.timezone);

  return (
    <footer className="border-t border-line">
      <div className="site-container grid grid-cols-[1fr_auto] gap-x-gutter gap-y-8 pt-12 pb-8 max-[760px]:grid-cols-1">
        <p className="text-lg">
          {site.name}
          <span className="serif-accent"> — {site.role}</span>
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {socials.map((social) => (
            <li key={social.platform}>
              <AnimatedLink href={social.href}>{social.label}</AnimatedLink>
            </li>
          ))}
        </ul>

        <div className="col-span-full flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="label">
            © {YEAR} — {site.location} <time>{localTime}</time>
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-label uppercase [&_svg]:transition-transform [&_svg]:duration-420 [&_svg]:ease-out hover:[&_svg]:-translate-y-[3px]"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            {ui.footer.backToTop}
            <Icon name="arrowUp" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
