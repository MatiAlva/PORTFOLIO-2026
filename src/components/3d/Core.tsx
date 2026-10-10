import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  IcosahedronGeometry,
  MathUtils,
  Vector2,
  type Group,
  type ShaderMaterial,
} from 'three';
import { coreFragmentShader, coreVertexShader } from './shaders/core';
import { easeColor, scenePalette } from './palette';
import { sceneState } from './sceneState';

const RADIUS = 1.15;

/** Resting values → values when the hero has fully scrolled away. */
const MORPH = {
  amplitude: [0.16, 0.4],
  frequency: [1.05, 1.8],
  lineDensity: [9, 22],
} as const;

const POINTER_STRENGTH = 0.16;
const DAMPING = 2.5;

interface CoreProps {
  detail: number;
  animated: boolean;
}

/** Quantization step for welding vertices; far below the spacing of any subdivision level. */
const WELD_PRECISION = 1e4;
/** Each quantized axis fits in 16 bits, so a whole position packs into one safe integer. */
const WELD_AXIS = 2 ** 16;
const quantize = (value: number) => Math.round(value * WELD_PRECISION) + WELD_AXIS / 2;

/**
 * Indexed geometry: every vertex is displaced once instead of up to six times. Positions
 * are welded with integer keys, which is several times faster than `mergeVertices` (it
 * builds string hashes for every attribute) and keeps the main thread free at startup.
 */
function createGeometry(detail: number) {
  const source = new IcosahedronGeometry(RADIUS, detail);
  const input = source.getAttribute('position').array;
  const count = input.length / 3;
  const lookup = new Map<number, number>();
  const positions = new Float32Array(input.length);
  const indices = new Uint32Array(count);
  let unique = 0;

  for (let i = 0; i < count; i++) {
    const x = input[i * 3] ?? 0;
    const y = input[i * 3 + 1] ?? 0;
    const z = input[i * 3 + 2] ?? 0;
    const key = (quantize(x) * WELD_AXIS + quantize(y)) * WELD_AXIS + quantize(z);
    let index = lookup.get(key);
    if (index === undefined) {
      index = unique++;
      lookup.set(key, index);
      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;
    }
    indices[i] = index;
  }
  source.dispose();

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions.slice(0, unique * 3), 3));
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function createUniforms() {
  return {
    uTime: { value: 0 },
    uAmplitude: { value: MORPH.amplitude[0] as number },
    uFrequency: { value: MORPH.frequency[0] as number },
    uLineDensity: { value: MORPH.lineDensity[0] as number },
    uPointer: { value: new Vector2() },
    uPointerStrength: { value: 0 },
    uBaseColor: { value: new Color().copy(scenePalette.base) },
    uLineColor: { value: new Color().copy(scenePalette.line) },
    uRimColor: { value: new Color().copy(scenePalette.rim) },
  };
}

type CoreUniforms = ReturnType<typeof createUniforms>;

export function Core({ detail, animated }: CoreProps) {
  const group = useRef<Group>(null);
  const material = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => createGeometry(detail), [detail]);
  const uniforms = useMemo(() => createUniforms(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const mat = material.current;
    const mesh = group.current;
    if (!mat || !mesh) return;

    const u = mat.uniforms as CoreUniforms;
    const scroll = sceneState.scroll;
    const instant = !animated;

    u.uTime.value = animated ? state.clock.elapsedTime : 0;
    u.uAmplitude.value = MathUtils.damp(
      u.uAmplitude.value,
      MathUtils.lerp(MORPH.amplitude[0], MORPH.amplitude[1], scroll),
      DAMPING,
      delta,
    );
    u.uFrequency.value = MathUtils.lerp(MORPH.frequency[0], MORPH.frequency[1], scroll);
    u.uLineDensity.value = MathUtils.lerp(MORPH.lineDensity[0], MORPH.lineDensity[1], scroll);

    const pointer = u.uPointer.value;
    pointer.x = MathUtils.damp(pointer.x, sceneState.pointer.x, DAMPING, delta);
    pointer.y = MathUtils.damp(pointer.y, sceneState.pointer.y, DAMPING, delta);
    u.uPointerStrength.value = MathUtils.damp(
      u.uPointerStrength.value,
      sceneState.hasPointer ? POINTER_STRENGTH : 0,
      DAMPING,
      delta,
    );

    easeColor(u.uBaseColor.value, scenePalette.base, delta, instant);
    easeColor(u.uLineColor.value, scenePalette.line, delta, instant);
    easeColor(u.uRimColor.value, scenePalette.rim, delta, instant);

    if (animated) {
      mesh.rotation.y += delta * (0.08 + scroll * 0.6);
      mesh.rotation.x = MathUtils.damp(
        mesh.rotation.x,
        sceneState.pointer.y * 0.25,
        DAMPING,
        delta,
      );
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}
