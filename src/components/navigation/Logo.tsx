import { useState } from 'react';
import { Link } from 'react-router';
import { useContent } from '@/context/locale';
import { ScrambleText } from '@/components/ui/ScrambleText';

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  const { site, ui } = useContent();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3 font-mono text-xs font-medium tracking-label uppercase"
      aria-label={ui.nav.home(site.name)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onNavigate}
    >
      <span
        className="relative grid size-6 place-items-center rounded-full border-[1.5px] border-fg transition-transform duration-900 ease-out group-hover:rotate-180"
        aria-hidden="true"
      >
        <span className="size-1.5 rounded-full bg-accent transition-transform duration-420 ease-out group-hover:translate-x-[0.3rem] group-hover:scale-80" />
      </span>
      <span className="inline-block min-w-[9ch]" aria-hidden="true">
        <ScrambleText text={site.name} active={hovered} />
      </span>
    </Link>
  );
}
