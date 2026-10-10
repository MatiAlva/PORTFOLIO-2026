import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { m, useInView, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useExperience } from '@/context/experience';
import { useContent } from '@/context/locale';
import { useBoot } from '@/hooks/useBoot';
import { useLocalTime } from '@/hooks/useLocalTime';
import { usePageVisible } from '@/hooks/usePageVisible';
import { bootStore } from '@/lib/boot';
import { DURATION, EASE_OUT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary';
import { SceneFallback } from '@/components/3d/SceneFallback';
import { sceneState } from '@/components/3d/sceneState';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitReveal } from '@/components/ui/SplitReveal';

const Scene = lazy(() => import('@/components/3d/Scene'));

const YEAR = new Date().getFullYear();

const SCENE_TASK = 'scene';

type SceneStatus = 'loading' | 'ready' | 'failed';

/**
 * The 3D scene loads behind the preloader, which waits for its first drawn frame (capped by
 * `BOOT.maxDuration`), so the hero is revealed with the shape already in place. The static
 * fallback is only for devices without WebGL or after a failure — never a placeholder, so
 * visitors don't see a different shape swap into the real one.
 */
function useHeroScene(enabled: boolean) {
  const [status, setStatus] = useState<SceneStatus>(enabled ? 'loading' : 'failed');

  useEffect(() => {
    if (enabled && !bootStore.getSnapshot().booted) bootStore.register(SCENE_TASK);
  }, [enabled]);

  useEffect(() => {
    if (status !== 'loading') bootStore.resolve(SCENE_TASK);
  }, [status]);

  const onReady = useCallback(() => setStatus('ready'), []);
  const onFailure = useCallback(() => setStatus('failed'), []);

  return { status, onReady, onFailure };
}

export function Hero() {
  const { device, reducedMotion, theme, accent } = useExperience();
  const { site, ui } = useContent();
  const { booted } = useBoot();
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section);
  const pageVisible = usePageVisible();
  const localTime = useLocalTime(site.timezone);
  const scene = useHeroScene(device.webgl);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    sceneState.scroll = progress;
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.2]);

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: booted ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: DURATION.slow, ease: EASE_OUT, delay },
  });

  return (
    <section
      ref={section}
      className={cn(
        'relative min-h-svh overflow-clip',
        'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[30%] after:bg-[linear-gradient(to_bottom,transparent,var(--color-bg))]',
        'max-[860px]:before:pointer-events-none max-[860px]:before:absolute max-[860px]:before:inset-[40%_0_0] max-[860px]:before:z-1 max-[860px]:before:bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--color-bg)_78%,transparent)_30%,var(--color-bg)_85%)]',
      )}
      aria-labelledby="hero-title"
    >
      <m.div className="pointer-events-none absolute inset-0 z-0" style={{ opacity: stageOpacity }}>
        {scene.status === 'failed' && <SceneFallback />}
        {(scene.status === 'loading' || scene.status === 'ready') && (
          <SceneErrorBoundary fallback={null} onError={scene.onFailure}>
            <Suspense fallback={null}>
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-900 ease-out data-[ready=true]:opacity-100"
                data-ready={scene.status === 'ready'}
              >
                <Scene
                  tier={device.tier}
                  animated={!reducedMotion}
                  active={inView && pageVisible}
                  paletteKey={`${theme}-${accent}`}
                  onReady={scene.onReady}
                  onContextLost={scene.onFailure}
                />
              </div>
            </Suspense>
          </SceneErrorBoundary>
        )}
      </m.div>

      <m.div
        className={cn(
          'site-container relative z-1 grid min-h-svh grid-rows-[auto_1fr_auto_auto] pt-[calc(var(--spacing-nav)+1.5rem)] pb-8',
          'max-[860px]:z-2 max-[860px]:grid-rows-[auto_1fr_auto_auto_auto]',
        )}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <m.div className="flex items-center justify-between gap-4" {...intro(0.6)}>
          <span className="label max-[480px]:hidden">
            {ui.hero.portfolio} ©{YEAR}
          </span>
          {site.availability.open && (
            <span
              className={cn(
                'inline-flex items-center gap-2 font-mono text-xs tracking-label uppercase',
                'max-[860px]:rounded-full max-[860px]:bg-bg/72 max-[860px]:px-3 max-[860px]:py-2 max-[860px]:text-[0.625rem] max-[860px]:shadow-[inset_0_0_0_1px_var(--color-line)]',
              )}
            >
              <span
                className="relative size-2 rounded-full bg-accent after:absolute after:inset-0 after:animate-hero-pulse after:rounded-[inherit] after:bg-inherit"
                aria-hidden="true"
              />
              {site.availability.label}
            </span>
          )}
        </m.div>

        <h1 className="mb-8 -ml-[0.05em] self-end text-display leading-tight font-medium tracking-[-0.06em] max-[860px]:mb-6">
          <SplitReveal id="hero-title" text={site.name} play={booted} stagger={0.08} />
        </h1>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 max-[860px]:grid-cols-[1fr] max-[860px]:gap-6">
          <div className="flex max-w-[34rem] flex-col gap-4">
            <m.p className="label text-fg!" {...intro(0.35)}>
              {site.role}
            </m.p>
            <SplitReveal
              as="p"
              text={site.tagline.text}
              className="text-xl leading-[1.25] text-fg-muted [&_.serif-accent]:text-fg"
              play={booted}
              delay={0.4}
            />
          </div>

          <m.div
            className="flex flex-wrap gap-3 max-[480px]:*:flex-[1_1_100%] max-[480px]:*:justify-center"
            {...intro(0.7)}
          >
            {/* TODO: re-enable once the real projects are ready.
            <MagneticButton to="/#work" variant="solid" icon="arrowDown">
              {ui.hero.viewWork}
            </MagneticButton> */}
            <MagneticButton to="/#contact" icon="arrowUpRight">
              {ui.hero.letsTalk}
            </MagneticButton>
          </m.div>
        </div>

        <m.div
          className="mt-12 flex items-center justify-between border-t border-line pt-4"
          {...intro(0.9)}
        >
          <span className="label">
            {site.location} — <time>{localTime}</time>
          </span>
          <span className="label inline-flex items-center gap-3" aria-hidden="true">
            {ui.hero.scroll}
            <span className="relative h-px w-12 overflow-hidden bg-line-strong after:absolute after:inset-0 after:animate-hero-scan after:bg-fg" />
          </span>
        </m.div>
      </m.div>
    </section>
  );
}
