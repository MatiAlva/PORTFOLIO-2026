/**
 * Mutable bridge between the DOM and the render loop. Written by DOM listeners and read
 * inside `useFrame`, so per-frame values never trigger React re-renders.
 */
export const sceneState = {
  /** 0 → 1 while the hero scrolls out of view. */
  scroll: 0,
  /** Normalized viewport pointer, -1 → 1 on both axes. */
  pointer: { x: 0, y: 0 },
  hasPointer: false,
};
