'use client';

import {
  Gltf,
  Html,
  OrbitControls,
  Preload,
  Sky,
  Stage,
  Stars,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useHotkeys } from '@mantine/hooks';

function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  // set progress max two precision
  const progressPercentage = Math.round(progress * 100);
  if (!active) {
    return null;
  }
  return <Html center>{progressPercentage} % loaded</Html>;
}

const RocketModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  useHotkeys([['Space', () => setIsLaunched(!isLaunched)]]);
  const { camera } = useThree();
  useFrame(() => {
    if (isLaunched && modelRef.current) {
      modelRef.current.position.y += 0.02;
    }
    camera.lookAt(modelRef?.current?.position || new THREE.Vector3(0, 0, 0));
  });
  return (
    <Suspense fallback={null}>
      <Gltf ref={modelRef} castShadow receiveShadow src="/rocket-2.glb" />
      <Preload all />
      <LoadingIndicator />
    </Suspense>
  );
};

export default function Rocket() {
  return (
    <>
      <Canvas>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          speed={1}
        />
        <Stage adjustCamera={1} intensity={0.5}>
          <Suspense fallback={null}>
            <RocketModel />
            <Preload all />
          </Suspense>
        </Stage>
        <OrbitControls
          // makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
      </Canvas>
    </>
  );
}
