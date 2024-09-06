'use client';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, Preload } from '@react-three/drei';
import * as THREE from 'three';

import { useEffect, useRef } from 'react';
import React from 'react';

const maxSpeed = 20;

// 行星数据
const planetData = [
  {
    name: 'Mercury',
    size: 3.2,
    texture: '/solar/mercury.jpg',
    position: 28,
    rotationSpeed: 0.004,
    orbitSpeed: 0.004,
  },
  {
    name: 'Venus',
    size: 5.8,
    texture: '/solar/venus.jpg',
    position: 44,
    rotationSpeed: 0.002,
    orbitSpeed: 0.015,
  },
  {
    name: 'Earth',
    size: 6,
    texture: '/solar/earth.jpg',
    position: 62,
    rotationSpeed: 0.02,
    orbitSpeed: 0.01,
  },
  {
    name: 'Mars',
    size: 4,
    texture: '/solar/mars.jpg',
    position: 78,
    rotationSpeed: 0.018,
    orbitSpeed: 0.008,
  },
  {
    name: 'Jupiter',
    size: 12,
    texture: '/solar/jupiter.jpg',
    position: 100,
    rotationSpeed: 0.04,
    orbitSpeed: 0.002,
  },
  {
    name: 'Saturn',
    size: 10,
    texture: '/solar/saturn.jpg',
    position: 138,
    rotationSpeed: 0.038,
    orbitSpeed: 0.0009,
    ring: {
      innerRadius: 10,
      outerRadius: 20,
      texture: '/solar/saturn_ring.png',
    },
  },
  {
    name: 'Uranus',
    size: 7,
    texture: '/solar/uranus.jpg',
    position: 176,
    rotationSpeed: 0.03,
    orbitSpeed: 0.0004,
    ring: {
      innerRadius: 7,
      outerRadius: 12,
      texture: '/solar/uranus_ring.png',
    },
  },
  {
    name: 'Neptune',
    size: 7,
    texture: '/solar/neptune.jpg',
    position: 200,
    rotationSpeed: 0.032,
    orbitSpeed: 0.0001,
  },
  {
    name: 'Pluto',
    size: 2.8,
    texture: '/solar/pluto.jpg',
    position: 216,
    rotationSpeed: 0.008,
    orbitSpeed: 0.0007,
  },
];

function Sun() {
  const sunRef = useRef<THREE.Mesh | null>(null);
  const texture = useLoader(THREE.TextureLoader, '/solar/sun.jpg');

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[15, 50, 50]} />
      <meshBasicMaterial map={texture} />
      <pointLight intensity={4} distance={300} />
    </mesh>
  );
}

function Planet({
  size,
  texture,
  position,
  rotationSpeed,
  orbitSpeed,
  ring,
}: {
  size: number;
  texture: string;
  position: number;
  rotationSpeed: number;
  orbitSpeed: number;
  ring: { innerRadius: number; outerRadius: number; texture: string } | null;
}) {
  const planetRef = useRef<THREE.Mesh | null>(null);
  const orbitRef = useRef<THREE.Group | null>(null);
  const planetTexture = useLoader(THREE.TextureLoader, texture);

  useFrame((state, delta) => {
    if (planetRef.current && orbitRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
      orbitRef.current.rotation.y += orbitSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[position, 0, 0]}>
        <sphereGeometry args={[size, 50, 50]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
      {ring && (
        <mesh position={[position, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.innerRadius, ring.outerRadius, 32]} />
          <meshBasicMaterial
            map={useLoader(THREE.TextureLoader, ring.texture)}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function PlanetOrbit({ radius }: { radius: number }) {
  const lineLoopPoints = [];

  // Calculate points for the circular path
  const numSegments = 100; // Number of segments to create the circular path
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(new THREE.Vector3(x, 0, z));
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(lineLoopPoints);
  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial color={0xfffaff} />
    </lineLoop>
  );
}
export function PlanetarySystem() {
  return (
    <>
      <Sun />
      {planetData.map((planet, index) => (
        <React.Fragment key={planet.name}>
          <Planet
            size={planet.size}
            texture={planet.texture}
            position={planet.position}
            rotationSpeed={planet.rotationSpeed}
            orbitSpeed={planet.orbitSpeed}
            ring={planet.ring!}
          />
          <PlanetOrbit radius={planet.position} />
        </React.Fragment>
      ))}
    </>
  );
}

const Bg = () => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      '/solar/stars.jpg',
      '/solar/stars.jpg',
      '/solar/stars.jpg',
      '/solar/stars.jpg',
      '/solar/stars.jpg',
      '/solar/stars.jpg',
    ]);
    scene.background = texture;
  }, [scene]);
  return null;
};

export const SolarComponent = () => {
  return (
    <>
      <Stage adjustCamera={1} environment={null}>
        <OrbitControls zoomSpeed={0.2} />
        <Preload all />
        <ambientLight intensity={0.5} />
        <PlanetarySystem />
      </Stage>
      <Bg />
    </>
  );
};

export const SolarStage = () => {
  return (
    <>
      <Canvas>
        <SolarComponent />
      </Canvas>
    </>
  );
};
