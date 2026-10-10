import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  EdgesGeometry,
  IcosahedronGeometry,
  MathUtils,
  type LineBasicMaterial,
  type LineSegments,
} from 'three';
import { easeColor, scenePalette } from './palette';
import { sceneState } from './sceneState';

const RADIUS = 1.9;
const OPACITY = 0.16;

export function WireShell({ animated }: { animated: boolean }) {
  const lines = useRef<LineSegments>(null);
  const material = useRef<LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const ico = new IcosahedronGeometry(RADIUS, 1);
    const edges = new EdgesGeometry(ico);
    ico.dispose();
    return edges;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const mesh = lines.current;
    const mat = material.current;
    if (!mesh || !mat) return;

    const scroll = sceneState.scroll;
    if (animated) {
      mesh.rotation.y -= delta * 0.05;
      mesh.rotation.z += delta * 0.02;
    }
    mesh.scale.setScalar(MathUtils.damp(mesh.scale.x, 1 + scroll * 0.45, 3, delta));
    mat.opacity = OPACITY * (1 - scroll * 0.5);
    easeColor(mat.color, scenePalette.line, delta, !animated);
  });

  return (
    <lineSegments ref={lines} geometry={geometry}>
      <lineBasicMaterial ref={material} transparent opacity={OPACITY} depthWrite={false} />
    </lineSegments>
  );
}
