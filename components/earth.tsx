import * as THREE from 'three';
import { latLongToVector3 } from '@/utils/utils';
import { Sphere } from '@react-three/drei';
import { earthRadius } from '@/components/constant';
interface EarthProps {
  earthTextureUrl: string;
  displacementMapUrl: string;
}

export const Earth = () => {
  const earthTextureUrl = '/earth.jpg';
  const displacementMapUrl = '/gray.png';
  const texture = new THREE.TextureLoader().load(earthTextureUrl);
  const displacementMap = new THREE.TextureLoader().load(displacementMapUrl);

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
