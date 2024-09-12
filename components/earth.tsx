import * as THREE from 'three';
import { Sphere } from '@react-three/drei';
import { earthRadius } from '@/components/constant';
import { useLoader } from '@react-three/fiber';

export const Earth = () => {
  const earthTextureUrl = '/earth.jpg';
  const displacementMapUrl = '/gray.png';
  const [texture, displacementMap] = useLoader(THREE.TextureLoader, [
    earthTextureUrl,
    displacementMapUrl,
  ]);

  return (
    <Sphere args={[earthRadius, 256, 256]}>
      <meshStandardMaterial
        attach="material"
        map={texture}
        displacementMap={displacementMap}
        displacementScale={0.1}
      />
    </Sphere>
  );
};
