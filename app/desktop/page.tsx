'use client';
import { Desktop } from '@/components/desktop';
import { useDocumentTitle } from '@mantine/hooks';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function DesktopPage() {
  useDocumentTitle('Desktop');
  return (
    <Canvas camera={{ position: [-5, 10, -15], fov: 90 }}>
      <Desktop />
      <CameraControls />
    </Canvas>
  );
}
