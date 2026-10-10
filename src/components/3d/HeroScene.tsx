import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import type { QualitySettings } from './quality';
import { CameraRig } from './CameraRig';
import { Core } from './Core';
import { FloatingObjects } from './FloatingObjects';
import { Lights } from './Lights';
import { OrbitRings } from './OrbitRings';
import { Particles } from './Particles';
import { WireShell } from './WireShell';
import { sceneState } from './sceneState';

interface Layout {
  x: number;
  y: number;
  scale: number;
}

/** The sculpture sits beside the headline on wide screens and above it on portrait ones. */
const LAYOUTS = {
  wide: { x: 1.55, y: 0.1, scale: 1 },
  square: { x: 0.7, y: 0.55, scale: 0.82 },
  portrait: { x: 0, y: 1.2, scale: 0.55 },
} satisfies Record<string, Layout>;

function pickLayout(aspect: number): Layout {
  if (aspect < 0.85) return LAYOUTS.portrait;
  if (aspect < 1.3) return LAYOUTS.square;
  return LAYOUTS.wide;
}

interface HeroSceneProps {
  settings: QualitySettings;
  animated: boolean;
}

export function HeroScene({ settings, animated }: HeroSceneProps) {
  const sculpture = useRef<Group>(null);
  const aspect = useThree((state) => state.size.width / state.size.height);
  const layout = pickLayout(aspect);

  useFrame((_, delta) => {
    const group = sculpture.current;
    if (!group) return;
    const scroll = sceneState.scroll;
    const ease = (current: number, target: number) =>
      animated ? MathUtils.damp(current, target, 3, delta) : target;

    group.position.x = ease(group.position.x, layout.x * (1 - scroll * 0.6));
    group.position.y = ease(group.position.y, layout.y + scroll * 0.6);
    group.scale.setScalar(ease(group.scale.x, layout.scale * (1 + scroll * 0.25)));
  });

  return (
    <>
      <Lights animated={animated} />
      <CameraRig animated={animated} />
      <group ref={sculpture} position={[layout.x, layout.y, 0]} scale={layout.scale}>
        <Core detail={settings.coreDetail} animated={animated} />
        <WireShell animated={animated} />
        <OrbitRings animated={animated} />
        <FloatingObjects count={settings.shards} animated={animated} />
      </group>
      <Particles count={settings.particles} animated={animated} />
    </>
  );
}
