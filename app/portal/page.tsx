'use client';
import { Frame } from '@/components/frame';
import {
  Environment,
  Gltf,
  Html,
  Preload,
  Sky,
  Stars,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Rockets } from '@/components/rockets';
import { Rig } from '@/components/rig';
import { ModelScene, ModelSceneContext } from '@/hooks/context';
import { ArrowLeft } from 'lucide-react';
import { useHotkeys } from '@mantine/hooks';
import {
  PlanetarySystem,
  SolarComponent,
  SolarStage,
} from '@/components/stage';
import { Tips } from '@/components/tips';

export default function PortalPage() {
  const [model, setModel] = useState<ModelScene | null>(null);
  useHotkeys([['escape', () => setModel(null)]]);
  return (
    <>
      <ModelSceneContext.Provider
        value={{
          model,
          setModel,
        }}
      >
        <Canvas
          flat
          camera={{ fov: 90, position: [0, 0, 20] }}
          eventPrefix="client"
        >
          <Frame
            id={ModelScene.SOLAR}
            name={`solar`}
            author="m1911star"
            bg="#e4cdac"
            position={[-1.2, 0, 0]}
            rotation={[0, 0.35, 0]}
          >
            <ambientLight intensity={3} />
            <Environment files="/universe.jpg" background />
            <group scale={0.1} position={[-10, -5, -50]}>
              <Suspense fallback={null}>
                <PlanetarySystem />
              </Suspense>
            </group>
          </Frame>
          <Frame
            id={ModelScene.ROCKET}
            name="rocket"
            author="m1911star"
            bg={'#e4cdac'}
          >
            <Suspense fallback={null}>
              <Gltf src="/rocket-2.glb" position={[0, -1, -2]} />
            </Suspense>
            <ambientLight intensity={2} />
          </Frame>
          <Frame
            id={ModelScene.GALLERY}
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
        {model !== null ? (
          <div className="absolute top-2 left-2">
            <ArrowLeft
              className="cursor-pointer text-gray-500"
              onClick={() => setModel(null)}
            />
          </div>
        ) : null}
        <Tips />
      </ModelSceneContext.Provider>
    </>
  );
}
