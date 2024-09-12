import { BackSide, Vector3 } from 'three';
import { atmosphereFragmentShader, atmosphereVertexShader } from './shaders';
import { useRef } from 'react';
import { earthRadius } from '@/components/constant';

const verteces = Math.pow(2, 9);

export const Atmosphere = () => {
  const lightDirectionRef = useRef<Vector3>(new Vector3(2, 0, 0));
  return (
    <mesh>
      <sphereGeometry args={[earthRadius + 0.2, verteces, verteces]} />
      <shaderMaterial
        side={BackSide}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        transparent
        uniforms={{
          lightDirection: { value: lightDirectionRef.current },
        }}
      />
    </mesh>
  );
};
