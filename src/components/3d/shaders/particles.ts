export const particlesVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;

attribute float aScale;
attribute float aSeed;

varying float vAlpha;

void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.25 + aSeed * 6.2831) * 0.08;
  p.y += cos(uTime * 0.2 + aSeed * 12.566) * 0.08;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);

  float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed) + aSeed * 40.0);
  vAlpha = twinkle * smoothstep(14.0, 4.0, -mvPosition.z);
}
`;

export const particlesFragmentShader = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha * 0.7);
  #include <colorspace_fragment>
}
`;
