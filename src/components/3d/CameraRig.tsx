import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { CAMERA } from './config';
import { sceneState } from './sceneState';

const BASE_Z = CAMERA.position[2];
const PARALLAX = { x: 0.55, y: 0.35 };
/** Dolly-in distance when the hero has fully scrolled away. */
const SCROLL_DOLLY = 1.4;
const DAMPING = 2;

/** Pointer parallax and scroll dolly. Touch devices get a slow ambient drift instead. */
export function CameraRig({ animated }: { animated: boolean }) {
  useFrame((state, delta) => {
    if (!animated) return;
    const { camera, clock } = state;
    const { pointer, hasPointer, scroll } = sceneState;

    const t = clock.elapsedTime;
    const x = hasPointer ? pointer.x : Math.sin(t * 0.2) * 0.6;
    const y = hasPointer ? pointer.y : Math.cos(t * 0.15) * 0.4;

    camera.position.x = MathUtils.damp(camera.position.x, x * PARALLAX.x, DAMPING, delta);
    camera.position.y = MathUtils.damp(
      camera.position.y,
      y * PARALLAX.y - scroll * 0.4,
      DAMPING,
      delta,
    );
    camera.position.z = MathUtils.damp(
      camera.position.z,
      BASE_Z - scroll * SCROLL_DOLLY,
      DAMPING,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
