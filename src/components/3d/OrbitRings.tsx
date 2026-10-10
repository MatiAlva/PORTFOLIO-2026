import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Float32BufferAttribute,
  type LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
} from 'three';
import { easeColor, scenePalette } from './palette';

interface RingConfig {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  opacity: number;
}

const RINGS: RingConfig[] = [
  { radius: 2.35, rotation: [1.22, 0.18, 0], speed: 0.32, opacity: 0.3 },
  { radius: 2.95, rotation: [1.42, -0.48, 0.3], speed: -0.2, opacity: 0.16 },
];

const SEGMENTS = 128;
const SATELLITE_RADIUS = 0.035;

function createCircle(radius: number) {
  const points: number[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i / SEGMENTS) * Math.PI * 2;
    points.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
  return geometry;
}

function Ring({ config, animated }: { config: RingConfig; animated: boolean }) {
  const satellite = useRef<Mesh>(null);
  const lineMaterial = useRef<LineBasicMaterial>(null);
  const satelliteMaterial = useRef<MeshBasicMaterial>(null);
  const geometry = useMemo(() => createCircle(config.radius), [config.radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const angle = (animated ? state.clock.elapsedTime : 1) * config.speed;
    satellite.current?.position.set(
      Math.cos(angle) * config.radius,
      Math.sin(angle) * config.radius,
      0,
    );
    if (lineMaterial.current) {
      easeColor(lineMaterial.current.color, scenePalette.line, delta, !animated);
    }
    if (satelliteMaterial.current) {
      easeColor(satelliteMaterial.current.color, scenePalette.rim, delta, !animated);
    }
  });

  return (
    <group rotation={config.rotation}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial
          ref={lineMaterial}
          transparent
          opacity={config.opacity}
          depthWrite={false}
        />
      </lineLoop>
      <mesh ref={satellite}>
        <sphereGeometry args={[SATELLITE_RADIUS, 12, 12]} />
        <meshBasicMaterial ref={satelliteMaterial} />
      </mesh>
    </group>
  );
}

export function OrbitRings({ animated }: { animated: boolean }) {
  return (
    <>
      {RINGS.map((config) => (
        <Ring key={config.radius} config={config} animated={animated} />
      ))}
    </>
  );
}
