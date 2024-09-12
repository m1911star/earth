import * as THREE from 'three';
import { useRef, useState, useContext } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, Text } from '@react-three/drei';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { ModelScene, ModelSceneContext } from '@/hooks/context';
extend(geometry);
// @ts-ignore
const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
// @ts-ignore
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

interface FrameProps {
  id: ModelScene;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
}
export function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}: FrameProps) {
  const portal = useRef(null);
  const { setModel, model } = useContext(ModelSceneContext);
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current!, 'blend', model === id ? 1 : 0, 0.2, dt)
  );
  return (
    <group {...props}>
      <Text
        // @ts-ignore
        font={suspend(medium).default}
        fontSize={0.1}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <mesh
        name={id}
        onClick={(e) => {
          e.stopPropagation();
          setModel(id);
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/* @ts-ignore */}
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={model === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
