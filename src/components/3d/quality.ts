import type { QualityTier } from '@/lib/device';

export interface QualitySettings {
  /** Icosahedron subdivision of the core sculpture. */
  coreDetail: number;
  particles: number;
  shards: number;
  dpr: [min: number, max: number];
  antialias: boolean;
}

export const QUALITY: Record<QualityTier, QualitySettings> = {
  high: { coreDetail: 64, particles: 2200, shards: 28, dpr: [1, 2], antialias: true },
  medium: { coreDetail: 40, particles: 1200, shards: 18, dpr: [1.25, 2], antialias: true },
  // Phones land here: below 1.5x DPR (or without MSAA) the core looks pixelated on dense screens.
  low: { coreDetail: 32, particles: 500, shards: 8, dpr: [1.25, 1.5], antialias: true },
};
