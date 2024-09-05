'use client';
import { Desktop } from '@/components/desktop';
import { CameraControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function DesktopPage() {
  return (
    <Canvas camera={{ position: [-5, 10, -15], fov: 90 }}>
      <Desktop />
      <CameraControls />
    </Canvas>
  );
}
