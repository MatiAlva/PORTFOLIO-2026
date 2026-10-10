import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import type { QualityTier } from '@/lib/device';
import { CAMERA } from './config';
import { HeroScene } from './HeroScene';
import { syncScenePalette } from './palette';
import { QUALITY } from './quality';
import { sceneState } from './sceneState';

export interface SceneProps {
  tier: QualityTier;
  /** False under reduced motion: a single still frame is rendered on demand. */
  animated: boolean;
  /** Pauses the render loop when the hero is off-screen or the tab is hidden. */
  active: boolean;
  /** Changes whenever theme or accent changes, so materials re-read the CSS tokens. */
  paletteKey: string;
  onReady: () => void;
  onContextLost: () => void;
}

syncScenePalette();

function PaletteSync({ paletteKey }: { paletteKey: string }) {
  const invalidate = useThree((state) => state.invalidate);
  useLayoutEffect(() => {
    syncScenePalette();
    invalidate();
  }, [paletteKey, invalidate]);
  return null;
}

/**
 * Compiles every material before the first frame. With KHR_parallel_shader_compile the
 * driver links programs off the main thread, so startup avoids one long blocking frame.
 */
function Precompile({ compiled, onCompiled }: { compiled: boolean; onCompiled: () => void }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let cancelled = false;
    gl.compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) onCompiled();
      });
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onCompiled]);

  useEffect(() => {
    if (compiled) invalidate();
  }, [compiled, invalidate]);

  return null;
}

/** Fires once the first frame has actually been drawn (shaders compiled). */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

function usePointerBridge(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const handleMove = (event: PointerEvent) => {
      sceneState.hasPointer = event.pointerType === 'mouse';
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enabled]);
}

export default function Scene({
  tier,
  animated,
  active,
  paletteKey,
  onReady,
  onContextLost,
}: SceneProps) {
  const settings = QUALITY[tier];
  const [minDpr, maxDpr] = settings.dpr;
  const [dpr, setDpr] = useState(() => Math.min(maxDpr, window.devicePixelRatio));
  const [compiled, setCompiled] = useState(false);
  const onCompiled = useCallback(() => setCompiled(true), []);

  usePointerBridge(animated);

  return (
    <Canvas
      frameloop={!compiled ? 'never' : !animated ? 'demand' : active ? 'always' : 'never'}
      dpr={dpr}
      flat
      camera={{ position: CAMERA.position, fov: CAMERA.fov, near: 0.1, far: 40 }}
      gl={{ antialias: settings.antialias, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', onContextLost, { once: true });
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr(minDpr)}
        onIncline={() => setDpr(Math.min(maxDpr, window.devicePixelRatio))}
        onFallback={() => setDpr(minDpr)}
      />
      <Precompile compiled={compiled} onCompiled={onCompiled} />
      <PaletteSync paletteKey={paletteKey} />
      <FirstFrame onReady={onReady} />
      <HeroScene settings={settings} animated={animated} />
    </Canvas>
  );
}
