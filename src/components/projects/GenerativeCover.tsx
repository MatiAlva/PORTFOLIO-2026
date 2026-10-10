import { useId, useMemo, type JSX } from 'react';
import type { GenerativeVariant, Palette } from '@/types/content';
import { createRandom } from '@/lib/utils';

const WIDTH = 1600;
const HEIGHT = 1000;

interface ArtProps {
  seed: number;
  palette: Palette;
  title: string;
  uid: string;
}

function Terrain({ seed, palette }: ArtProps) {
  const lines = useMemo(() => {
    const random = createRandom(seed);
    const LINE_COUNT = 30;
    const STEP = 20;
    const peaks = Array.from({ length: 4 }, () => ({
      x: 250 + random() * 1100,
      width: 70 + random() * 200,
      height: 60 + random() * 170,
    }));

    return Array.from({ length: LINE_COUNT }, (_, line) => {
      const baseY = 200 + line * 24;
      const lift = 0.25 + 0.75 * Math.sin((Math.PI * line) / LINE_COUNT);
      const points: string[] = [];
      for (let x = 0; x <= WIDTH; x += STEP) {
        const elevation = peaks.reduce(
          (sum, peak) => sum + peak.height * Math.exp(-((x - peak.x) ** 2) / (2 * peak.width ** 2)),
          0,
        );
        points.push(`${x},${(baseY - elevation * lift - random() * 5).toFixed(1)}`);
      }
      return points.join(' ');
    });
  }, [seed]);

  const accentLine = Math.floor(lines.length * 0.62);

  return (
    <g>
      {lines.map((points, index) => (
        <g key={index}>
          <polygon points={`0,${HEIGHT} ${points} ${WIDTH},${HEIGHT}`} fill={palette.background} />
          <polyline
            points={points}
            fill="none"
            stroke={index === accentLine ? palette.accent : palette.foreground}
            strokeOpacity={index === accentLine ? 1 : 0.55}
            strokeWidth={index === accentLine ? 2.5 : 1.25}
          />
        </g>
      ))}
    </g>
  );
}

function Orbits({ seed, palette, uid }: ArtProps) {
  const { rings, dots } = useMemo(() => {
    const random = createRandom(seed);
    const ringList = Array.from({ length: 9 }, (_, index) => {
      const rx = 190 + index * 88;
      return { rx, ry: rx * (0.28 + random() * 0.08) };
    });
    const dotList = ringList.flatMap((ring, index) =>
      Array.from({ length: 1 + Math.floor(random() * 2) }, () => {
        const angle = random() * Math.PI * 2;
        return {
          cx: Math.cos(angle) * ring.rx,
          cy: Math.sin(angle) * ring.ry,
          accent: index % 3 === 1,
        };
      }),
    );
    return { rings: ringList, dots: dotList };
  }, [seed]);

  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-core`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={palette.foreground} stopOpacity="0.25" />
          <stop offset="55%" stopColor={palette.background} />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      {Array.from({ length: 40 }, (_, index) => (
        <text
          key={index}
          x={100 + (index % 8) * 200}
          y={110 + Math.floor(index / 8) * 200}
          fill={palette.foreground}
          fillOpacity="0.18"
          fontSize="22"
          textAnchor="middle"
        >
          +
        </text>
      ))}
      <g transform="translate(980 520) rotate(-18)">
        {rings.map((ring) => (
          <ellipse
            key={ring.rx}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={palette.foreground}
            strokeOpacity="0.28"
            strokeWidth="1.25"
          />
        ))}
        <circle r="150" fill={`url(#${uid}-core)`} />
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.accent ? 9 : 5}
            fill={dot.accent ? palette.accent : palette.foreground}
          />
        ))}
      </g>
    </g>
  );
}

function Interface({ seed, palette }: ArtProps) {
  const { bars, sidebar } = useMemo(() => {
    const random = createRandom(seed);
    return {
      bars: Array.from({ length: 18 }, () => 60 + random() * 260),
      sidebar: Array.from({ length: 7 }, () => 90 + random() * 110),
    };
  }, [seed]);

  const chartLeft = 520;
  const chartBottom = 800;
  const barWidth = 30;
  const barGap = 18;
  const accentBar = 11;
  const linePoints = bars
    .map((height, index) => {
      const x = chartLeft + index * (barWidth + barGap) + barWidth / 2;
      return `${x},${chartBottom - height * 0.6 - 120}`;
    })
    .join(' ');

  return (
    <g>
      <rect
        x="180"
        y="130"
        width="1240"
        height="740"
        rx="18"
        fill={palette.foreground}
        fillOpacity="0.04"
        stroke={palette.foreground}
        strokeOpacity="0.16"
      />
      <line x1="180" x2="1420" y1="182" y2="182" stroke={palette.foreground} strokeOpacity="0.16" />
      {[0, 1, 2].map((index) => (
        <circle
          key={index}
          cx={212 + index * 24}
          cy="156"
          r="6"
          fill={palette.foreground}
          fillOpacity="0.3"
        />
      ))}
      <line x1="460" x2="460" y1="182" y2="870" stroke={palette.foreground} strokeOpacity="0.12" />
      {sidebar.map((width, index) => (
        <rect
          key={index}
          x="212"
          y={230 + index * 52}
          width={width}
          height="12"
          rx="6"
          fill={index === 2 ? palette.accent : palette.foreground}
          fillOpacity={index === 2 ? 1 : 0.22}
        />
      ))}
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${520 + index * 290} 230)`}>
          <rect width="260" height="120" rx="10" fill={palette.foreground} fillOpacity="0.05" />
          <rect
            x="24"
            y="28"
            width="90"
            height="10"
            rx="5"
            fill={palette.foreground}
            fillOpacity="0.3"
          />
          <rect
            x="24"
            y="62"
            width={140 - index * 20}
            height="28"
            rx="6"
            fill={palette.foreground}
            fillOpacity="0.75"
          />
        </g>
      ))}
      {bars.map((height, index) => (
        <rect
          key={index}
          x={chartLeft + index * (barWidth + barGap)}
          y={chartBottom - height}
          width={barWidth}
          height={height}
          rx="4"
          fill={index === accentBar ? palette.accent : palette.foreground}
          fillOpacity={index === accentBar ? 1 : 0.16}
        />
      ))}
      <polyline points={linePoints} fill="none" stroke={palette.accent} strokeWidth="3" />
    </g>
  );
}

function Type({ seed, palette, title, uid }: ArtProps) {
  const word = (title.split(' ')[0] ?? title).toUpperCase();
  const lens = useMemo(() => {
    const random = createRandom(seed);
    return { cx: 900 + random() * 300, cy: 420 + random() * 120, r: 250 };
  }, [seed]);

  const textProps = {
    x: -30,
    y: 700,
    fontSize: 420,
    fontWeight: 600,
    letterSpacing: '-0.06em',
    style: { fontFamily: 'var(--font-sans)' },
  };

  return (
    <g>
      <defs>
        <clipPath id={`${uid}-lens`}>
          <circle cx={lens.cx} cy={lens.cy} r={lens.r} />
        </clipPath>
      </defs>
      <text
        {...textProps}
        fill="none"
        stroke={palette.foreground}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      >
        {word}
      </text>
      <circle cx={lens.cx} cy={lens.cy} r={lens.r} fill={palette.accent} />
      <text {...textProps} fill={palette.background} clipPath={`url(#${uid}-lens)`}>
        {word}
      </text>
      <text
        x="80"
        y="110"
        fill={palette.foreground}
        fillOpacity="0.6"
        fontSize="22"
        letterSpacing="0.12em"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {`FIG. ${String(seed).padStart(2, '0')} — ${title.toUpperCase()}`}
      </text>
    </g>
  );
}

const ART: Record<GenerativeVariant, (props: ArtProps) => JSX.Element> = {
  terrain: Terrain,
  orbits: Orbits,
  interface: Interface,
  type: Type,
};

interface GenerativeCoverProps {
  variant: GenerativeVariant;
  seed: number;
  palette: Palette;
  title: string;
  alt: string;
  className?: string;
}

/** Deterministic procedural artwork used as a lightweight stand-in for project imagery. */
export function GenerativeCover({
  variant,
  seed,
  palette,
  title,
  alt,
  className,
}: GenerativeCoverProps) {
  const uid = useId().replace(/:/g, '');
  const Art = ART[variant];

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
    >
      <rect width={WIDTH} height={HEIGHT} fill={palette.background} />
      <Art seed={seed} palette={palette} title={title} uid={uid} />
    </svg>
  );
}
