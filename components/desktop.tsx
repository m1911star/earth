import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Environment, useGLTF, ContactShadows } from '@react-three/drei';

function Model() {
  const group = useRef<THREE.Group | null>(null);
  // Load model
  const { nodes, materials } = useGLTF('/mac-draco.glb');
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 2) / 20 + 0.25,
        0.1
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 4) / 20,
        0.1
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(t / 8) / 20,
        0.1
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-2 + Math.sin(t / 2)) / 2,
        0.1
      );
    }
  });
  // The jsx graph was auto-generated by: https://github.com/pmndrs/gltfjsx
  return (
    <group ref={group} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={(nodes['Cube008'] as THREE.Mesh).geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={(nodes['Cube008_1'] as THREE.Mesh).geometry}
          />
          <mesh geometry={(nodes['Cube008_2'] as THREE.Mesh).geometry}></mesh>
          {/* Drei's HTML component can "hide behind" canvas geometry */}
          <Html
            scale={1.1}
            rotation-x={-Math.PI / 2}
            position={[0, 0.04, -0.09]}
            transform
            occlude
          >
            <iframe src="https://www.shadertoy.com/embed/l3KSWh?gui=false&t=10&paused=false&muted=false"></iframe>
          </Html>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={(nodes.keyboard as THREE.Mesh).geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={(nodes['Cube002'] as THREE.Mesh).geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={(nodes['Cube002_1'] as THREE.Mesh).geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={(nodes.touchbar as THREE.Mesh).geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

export const Desktop = () => {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
    </>
  );
};
