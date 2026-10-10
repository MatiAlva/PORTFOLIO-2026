import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  type Points,
  type ShaderMaterial,
} from 'three';
import { createRandom } from '@/lib/utils';
import { particlesFragmentShader, particlesVertexShader } from './shaders/particles';
import { easeColor, scenePalette } from './palette';
import { sceneState } from './sceneState';

const INNER_RADIUS = 3.2;
const OUTER_RADIUS = 11;
const POINT_SIZE = 36;

function createParticles(count: number) {
  const random = createRandom(1337);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Uniform direction on a sphere, radius biased towards the inner shell.
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const radius = INNER_RADIUS + Math.pow(random(), 1.6) * (OUTER_RADIUS - INNER_RADIUS);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    scales[i] = 0.4 + random() * 1.1;
    seeds[i] = random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new Float32BufferAttribute(scales, 1));
  geometry.setAttribute('aSeed', new Float32BufferAttribute(seeds, 1));
  return geometry;
}

function createUniforms() {
  return {
    uTime: { value: 0 },
    uSize: { value: POINT_SIZE },
    uPixelRatio: { value: 1 },
    uColor: { value: new Color().copy(scenePalette.line) },
  };
}

type ParticleUniforms = ReturnType<typeof createUniforms>;

export function Particles({ count, animated }: { count: number; animated: boolean }) {
  const points = useRef<Points>(null);
  const material = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => createParticles(count), [count]);
  const uniforms = useMemo(() => createUniforms(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat || !points.current) return;

    const u = mat.uniforms as ParticleUniforms;
    u.uTime.value = animated ? state.clock.elapsedTime : 0;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    easeColor(u.uColor.value, scenePalette.line, delta, !animated);

    if (animated) points.current.rotation.y += delta * (0.012 + sceneState.scroll * 0.08);
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
