'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Cloud } from '@react-three/drei';
import { Earth } from './earth';
import {Atmosphere} from "@/components/atmosphere";
export const EarthStage = () => {
  const earthTextureUrl = '/earth.jpg';
  const displacementMapUrl = '/gray.png';
  return (
    <Canvas>
      <Stage adjustCamera>
        <OrbitControls zoomSpeed={0.1} autoRotate maxZoom={3}/>
        <Earth
          earthTextureUrl={earthTextureUrl}
          displacementMapUrl={displacementMapUrl}
        />
        <Atmosphere />
      </Stage>
    </Canvas>
  );
};
