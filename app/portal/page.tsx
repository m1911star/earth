'use client';
import { Frame } from '@/components/frame';
import {
  CameraControls,
  Environment,
  Gltf,
  Html,
  Preload,
  Sky,
  Stars,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Rockets } from '@/components/rockets';
import { Rig } from '@/components/rig';

export default function PortalPage() {
  return (
    <>
      <Canvas
        flat
        camera={{ fov: 90, position: [0, 0, 20] }}
        eventPrefix="client"
      >
        <color attach="background" args={['#f0f0f0']} />
        <Frame
          id="earth"
          name={`earth`}
          author="m1911star"
          bg="#e4cdac"
          position={[-1.2, 0, 0]}
          rotation={[0, 0.35, 0]}
        >
          <ambientLight intensity={5} />
          <Environment files="/universe.jpg" background />
          <group scale={0.5} position={[-10, -5, -50]}>
            <Suspense fallback={null}>{/* <Desktop /> */}</Suspense>
          </group>
        </Frame>
        <Frame id="rocket" name="rocket" author="m1911star" bg={undefined}>
          <Suspense fallback={null}>
            <Gltf src="/rocket-2.glb" position={[0, -1, -2]} />
          </Suspense>
          <ambientLight />
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={5}
            saturation={0}
            speed={3}
          />
        </Frame>
        <Frame
          id="gallery"
          name="gallery"
          author="m1911star"
          bg="#d1d1ca"
          position={[1.15, 0, 0]}
          rotation={[0, -0.5, 0]}
        >
          <ambientLight />
          <group position={[0, -1, -4]} scale={0.4}>
            <Suspense fallback={null}>
              <Rockets />
            </Suspense>
          </group>
        </Frame>
        <Rig />
        <Preload all />
      </Canvas>
    </>
  );
}
