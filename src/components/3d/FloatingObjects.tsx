import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, type InstancedMesh, type MeshStandardMaterial } from 'three';
import { createRandom } from '@/lib/utils';
import { easeColor, scenePalette } from './palette';
import { sceneState } from './sceneState';

interface Shard {
  radius: number;
  angle: number;
  speed: number;
  height: number;
  size: number;
  spin: number;
  phase: number;
}

/** One in five shards carries the accent color. */
const ACCENT_RATIO = 0.2;

function createShards(count: number, seed: number): Shard[] {
  const random = createRandom(seed);
  return Array.from({ length: count }, () => ({
    radius: 2.1 + random() * 1.9,
    angle: random() * Math.PI * 2,
    speed: (0.05 + random() * 0.12) * (random() > 0.5 ? 1 : -1),
    height: (random() - 0.5) * 2.4,
    size: 0.035 + random() * 0.085,
    spin: 0.2 + random() * 0.8,
    phase: random() * Math.PI * 2,
  }));
}

const dummy = new Object3D();

interface ShardFieldProps {
  count: number;
  seed: number;
  tone: 'line' | 'rim';
  animated: boolean;
}

/** Instanced so the whole field costs a single draw call per tone. */
function ShardField({ count, seed, tone, animated }: ShardFieldProps) {
  const mesh = useRef<InstancedMesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const shards = useMemo(() => createShards(count, seed), [count, seed]);

  useFrame((state, delta) => {
    const instances = mesh.current;
    if (!instances) return;

    const time = animated ? state.clock.elapsedTime : 0;
    const shrink = 1 - sceneState.scroll * 0.5;

    shards.forEach((shard, index) => {
      const angle = shard.angle + time * shard.speed;
      dummy.position.set(
        Math.cos(angle) * shard.radius,
        shard.height + Math.sin(time * 0.6 + shard.phase) * 0.15,
        Math.sin(angle) * shard.radius,
      );
      dummy.rotation.set(time * shard.spin + shard.phase, time * shard.spin * 0.7, 0);
      dummy.scale.setScalar(shard.size * shrink);
      dummy.updateMatrix();
      instances.setMatrixAt(index, dummy.matrix);
    });
    instances.instanceMatrix.needsUpdate = true;

    if (material.current) {
      easeColor(material.current.color, scenePalette[tone], delta, !animated);
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial ref={material} flatShading roughness={0.35} metalness={0.4} />
    </instancedMesh>
  );
}

export function FloatingObjects({ count, animated }: { count: number; animated: boolean }) {
  const accentCount = Math.max(1, Math.round(count * ACCENT_RATIO));
  return (
    <>
      <ShardField count={count - accentCount} seed={7} tone="line" animated={animated} />
      <ShardField count={accentCount} seed={42} tone="rim" animated={animated} />
    </>
  );
}
