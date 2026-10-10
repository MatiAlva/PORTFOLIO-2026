import { useId, type JSX } from 'react';
import type { Locale } from '@/i18n/config';

function SpainFlag() {
  return (
    <>
      <rect width="60" height="40" fill="#c60b1e" />
      <rect y="10" width="60" height="20" fill="#ffc400" />
    </>
  );
}

function UnitedKingdomFlag() {
  const clip = useId();
  return (
    <>
      <clipPath id={clip}>
        <path d="M30 20h30v20zv20H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40m0-40L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40m0-40L0 40" stroke="#c8102e" strokeWidth="4" clipPath={`url(#${clip})`} />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7" />
    </>
  );
}

const FLAGS: Record<Locale, () => JSX.Element> = { es: SpainFlag, en: UnitedKingdomFlag };

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const Art = FLAGS[locale];
  return (
    <svg
      className={className}
      viewBox="0 0 60 40"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Art />
    </svg>
  );
}
