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
  useProgress,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { useRoute } from 'wouter';
import * as THREE from 'three';
import { Rockets } from '../gallery/page';

function LoadingIndicator() {
  const { active, progress } = useProgress();
  if (!active) {
    return null;
  }
  return <Html center>{progress} % loaded</Html>;
}

const Rig = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const [, params] = useRoute('/portal/:id');
  useEffect(() => {
    const active = scene.getObjectByName(params?.id!);
    if (active) {
      active.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active.parent?.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  useEffect(() => {
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, []);
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
};

export default function PortalPage() {
  return (
    <>
      <Canvas
        flat
        camera={{ fov: 90, position: [0, 0, 20] }}
        eventSource={document.body}
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
