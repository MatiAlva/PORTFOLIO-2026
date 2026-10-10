import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { PointLight } from 'three';
import { easeColor, scenePalette } from './palette';
import { sceneState } from './sceneState';

/** Key light for form, an accent point light that follows the pointer for life. */
export function Lights({ animated }: { animated: boolean }) {
  const accent = useRef<PointLight>(null);

  useFrame((_, delta) => {
    const light = accent.current;
    if (!light) return;
    easeColor(light.color, scenePalette.rim, delta, !animated);
    if (animated) {
      light.position.x = 3 + sceneState.pointer.x * 2;
      light.position.y = -1.5 + sceneState.pointer.y * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 5]} intensity={2.4} />
      <pointLight ref={accent} position={[3, -1.5, 3]} intensity={22} distance={14} decay={2} />
    </>
  );
}
