// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState, useContext } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
} from '@react-three/drei';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { ModelSceneContext } from '@/hooks/context';
extend(geometry);
// @ts-ignore
const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
// @ts-ignore
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

export function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) {
  const portal = useRef();
  const { setModel, model } = useContext(ModelSceneContext);
  console.log(model, 'model');
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