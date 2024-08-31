'use client';

import {
  Gltf,
  OrbitControls,
  Preload,
  Sky,
  Stage,
  Stars,
  useFBX,
} from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Rockets: React.FC = () => {
  const all = useFBX('/all.fbx');
  return <primitive object={all} dispose={null} scale={0.02} />;
};

export default function Gallery() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.7} />
        <directionalLight />
        <Stage adjustCamera={1} intensity={0.2}>
          <Suspense fallback={null}>
            <Rockets />
          </Suspense>
        </Stage>
        <OrbitControls makeDefault />
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
