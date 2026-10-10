import type { SVGProps } from 'react';

const PATHS = {
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  arrowRight: 'M4 12h16m-6-6 6 6-6 6',
  arrowDown: 'M12 4v16m-6-6 6 6 6-6',
  arrowUp: 'M12 20V4m-6 6 6-6 6 6',
  download: 'M12 4v11m-5-5 5 5 5-5M5 20h14',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  sun: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
