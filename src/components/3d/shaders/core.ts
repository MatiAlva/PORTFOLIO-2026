import { simplexNoise } from './noise';

/**
 * The core sculpture: a noise-displaced sphere whose surface is engraved with animated
 * topographic contour lines. Normals are recomputed from neighbouring samples so lighting
 * follows the displacement without any extra geometry.
 */
export const coreVertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform vec2 uPointer;
uniform float uPointerStrength;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

${simplexNoise}

float displacement(vec3 p) {
  vec3 q = p * uFrequency + vec3(0.0, uTime * 0.12, 0.0);
  float warp = snoise(q * 0.55 + uTime * 0.04);
  float n = snoise(q + warp * 0.65);

  vec3 worldDir = normalize(mat3(modelMatrix) * p);
  vec3 pointerDir = normalize(vec3(uPointer, 0.9));
  float bulge = smoothstep(0.55, 1.0, dot(worldDir, pointerDir));

  return n * uAmplitude + bulge * uPointerStrength;
}

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

void main() {
  vec3 base = position;
  vec3 dir = normalize(base);
  float d = displacement(base);
  vec3 displaced = base + dir * d;

  const float EPSILON = 0.01;
  vec3 tangent = orthogonal(dir);
  vec3 bitangent = normalize(cross(dir, tangent));
  vec3 p1 = base + tangent * EPSILON;
  vec3 p2 = base + bitangent * EPSILON;
  vec3 d1 = p1 + normalize(p1) * displacement(p1);
  vec3 d2 = p2 + normalize(p2) * displacement(p2);
  vec3 displacedNormal = normalize(cross(d1 - displaced, d2 - displaced));

  vNormal = normalize(normalMatrix * displacedNormal);
  vDisplacement = d;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const coreFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uLineDensity;
uniform vec3 uBaseColor;
uniform vec3 uLineColor;
uniform vec3 uRimColor;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  vec3 lightDir = normalize(vec3(-0.6, 0.8, 0.7));

  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);
  float diffuse = max(dot(normal, lightDir), 0.0) * 0.5 + 0.5;
  vec3 color = uBaseColor * (0.6 + 0.6 * diffuse) + uLineColor * 0.06 * diffuse;

  float level = vDisplacement * uLineDensity - uTime * 0.18;
  float distanceToLine = abs(fract(level) - 0.5) / fwidth(level);
  float contour = 1.0 - min(distanceToLine, 1.0);
  color = mix(color, uLineColor, contour * (0.3 + fresnel * 0.4));

  vec3 halfDir = normalize(lightDir + viewDir);
  float specular = pow(max(dot(normal, halfDir), 0.0), 64.0);
  color += uLineColor * specular * 0.5;
  color += uRimColor * fresnel * 0.9;

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;
