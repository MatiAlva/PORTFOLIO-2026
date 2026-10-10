import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { m } from 'motion/react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

const MotionLink = m.create(Link);

const VARIANTS = {
  outline: 'text-fg shadow-[inset_0_0_0_1px_var(--color-line-strong)]',
  solid: 'bg-fg text-bg',
};

interface CommonProps {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  icon?: IconName;
  className?: string;
  /** Label shown inside the custom cursor while hovering. */
  cursorLabel?: string;
  onClick?: () => void;
}

type MagneticButtonProps = CommonProps &
  (
    | { to: string; href?: never; download?: never; type?: never; disabled?: never }
    | { href: string; download?: string; to?: never; type?: never; disabled?: never }
    | {
        to?: never;
        href?: never;
        download?: never;
        type?: 'button' | 'submit';
        disabled?: boolean;
      }
  );

export function MagneticButton(props: MagneticButtonProps) {
  const { children, variant = 'outline', icon, className, cursorLabel, onClick } = props;
  const { x, y, handlers } = useMagnetic();

  const shared = {
    className: cn(
      'group/magnetic relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-6 font-mono text-xs font-medium tracking-label whitespace-nowrap uppercase transition-[color] duration-420 ease-out',
      'hover:text-accent-contrast focus-visible:text-accent-contrast disabled:pointer-events-none disabled:opacity-50',
      VARIANTS[variant],
      className,
    ),
    style: { x, y },
    'data-cursor': cursorLabel ? 'label' : undefined,
    'data-cursor-label': cursorLabel,
    onClick,
    ...handlers,
  };

  const content = (
    <>
      <span
        className="absolute -inset-px -z-1 translate-y-[101%] rounded-[50%_50%_0_0/40%_40%_0_0] bg-accent transition-[translate,border-radius] duration-420 ease-out group-hover/magnetic:translate-y-0 group-hover/magnetic:rounded-none group-focus-visible/magnetic:translate-y-0 group-focus-visible/magnetic:rounded-none"
        aria-hidden="true"
      />
      <span className="block h-[1.2em] overflow-hidden leading-[1.2em]">
        <span className="flex flex-col transition-transform duration-420 ease-out group-hover/magnetic:-translate-y-1/2">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      {icon && (
        <Icon
          name={icon}
          className="transition-transform duration-420 ease-out group-hover/magnetic:translate-x-0.5 group-hover/magnetic:-translate-y-0.5 group-hover/magnetic:-rotate-8"
        />
      )}
    </>
  );

  if (props.to !== undefined) {
    return (
      <MotionLink to={props.to} {...shared}>
        {content}
      </MotionLink>
    );
  }

  if (props.href !== undefined) {
    const external = /^https?:/.test(props.href);
    return (
      <m.a
        href={props.href}
        download={props.download}
        {...shared}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button type={props.type ?? 'button'} disabled={props.disabled} {...shared}>
      {content}
    </m.button>
  );
}
