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
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

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
            <Gltf castShadow receiveShadow src="/rocket-2.glb" />
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
