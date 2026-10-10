import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useContent } from '@/context/locale';
import { cn } from '@/lib/utils';
interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  cursorLabel?: string;
  onClick?: () => void;
  'aria-current'?: 'page' | 'location' | 'true';
}

/** Underline draws in from the left on hover and retreats to the right on leave. */
export function AnimatedLink({
  href,
  children,
  className,
  cursorLabel,
  ...rest
}: AnimatedLinkProps) {
  const { ui } = useContent();
  const classes = cn(
    'relative inline-flex items-center gap-2 py-[0.15em]',
    'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-420 after:ease-out',
    '[&:hover]:after:origin-left [&:hover]:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 [&[aria-current]]:after:origin-left [&[aria-current]]:after:scale-x-100',
    className,
  );
  const cursor = cursorLabel ? { 'data-cursor': 'label', 'data-cursor-label': cursorLabel } : {};

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes} {...cursor} {...rest}>
        {children}
      </Link>
    );
  }

  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...cursor}
      {...rest}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {external && <span className="sr-only">{ui.opensInNewTab}</span>}
    </a>
  );
}
