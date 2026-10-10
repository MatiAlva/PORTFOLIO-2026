export type QualityTier = 'high' | 'medium' | 'low';

export interface DeviceProfile {
  /** WebGL is available and hardware accelerated. */
  webgl: boolean;
  tier: QualityTier;
  saveData: boolean;
}

interface NavigatorHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|software|basic render/i;

function probeWebGL(): { supported: boolean; software: boolean } {
  try {
    const canvas = document.createElement('canvas');
    // three.js r163+ requires WebGL 2.
    const gl = canvas.getContext('webgl2');
    if (!gl) return { supported: false, software: false };

    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(
      gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? '',
    );
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    return { supported: true, software: SOFTWARE_RENDERERS.test(renderer) };
  } catch {
    return { supported: false, software: false };
  }
}

const TIER_ORDER: QualityTier[] = ['low', 'medium', 'high'];

function capTier(tier: QualityTier, max: QualityTier): QualityTier {
  return TIER_ORDER.indexOf(tier) > TIER_ORDER.indexOf(max) ? max : tier;
}

/**
 * Cheap heuristics only — no GPU benchmark downloads. The 3D layer also adapts at runtime
 * through `PerformanceMonitor`, so this just picks a sensible starting point.
 */
export function detectDeviceProfile(): DeviceProfile {
  const nav = navigator as Navigator & NavigatorHints;
  const { supported, software } = probeWebGL();
  const saveData = nav.connection?.saveData === true;

  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory ?? 8;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const smallScreen = Math.min(window.screen.width, window.screen.height) < 768;

  let tier: QualityTier = cores >= 8 ? 'high' : cores >= 4 ? 'medium' : 'low';
  if (memory <= 2) tier = 'low';
  else if (memory <= 4) tier = capTier(tier, 'medium');
  if (coarse && smallScreen) tier = capTier(tier, cores >= 6 ? 'medium' : 'low');
  if (saveData) tier = 'low';

  return { webgl: supported && !software && !saveData, tier, saveData };
}
