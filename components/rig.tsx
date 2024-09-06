import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { ModelSceneContext } from '@/hooks/context';

export const Rig = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const { model } = useContext(ModelSceneContext);
  useEffect(() => {
    const active = scene.getObjectByName(model ?? '');
    if (active) {
      active.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active.parent?.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  useEffect(() => {
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, []);
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
};
