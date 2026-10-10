const CONTOURS = [0.92, 0.78, 0.64, 0.5, 0.36, 0.22];

const STROKE = 'fill-none stroke-fg [vector-effect:non-scaling-stroke]';

/**
 * Static, zero-JS-cost rendition of the sculpture. Shown while the 3D chunk loads and as the
 * permanent fallback when WebGL is unavailable, so the hero never looks empty.
 */
export function SceneFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid place-items-center"
      aria-hidden="true"
    >
      <svg
        className="w-[min(78vh,52vw)] translate-x-[22%] overflow-visible [@media(max-aspect-ratio:13/10)]:w-[min(70vw,52vh)] [@media(max-aspect-ratio:13/10)]:translate-x-0 [@media(max-aspect-ratio:13/10)]:-translate-y-[22%]"
        viewBox="-300 -300 600 600"
      >
        <defs>
          <radialGradient id="fallback-core" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="var(--color-bg-elevated)" />
            <stop offset="72%" stopColor="var(--color-bg)" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.55" />
          </radialGradient>
        </defs>
        <ellipse
          className={`${STROKE} [stroke-opacity:0.28]`}
          rx="270"
          ry="64"
          transform="rotate(-14)"
        />
        <ellipse
          className={`${STROKE} [stroke-opacity:0.14]`}
          rx="290"
          ry="120"
          transform="rotate(22)"
        />
        <circle r="150" fill="url(#fallback-core)" />
        {CONTOURS.map((scale) => (
          <ellipse
            key={scale}
            className={`${STROKE} [stroke-opacity:0.16]`}
            rx={150 * scale}
            ry={150 * scale * 0.82}
            transform={`rotate(-18) translate(${(1 - scale) * 28} ${(1 - scale) * -18})`}
          />
        ))}
        <circle className="fill-accent" cx="248" cy="-58" r="5" />
      </svg>
    </div>
  );
}
