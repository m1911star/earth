import * as THREE from 'three';
import { latLongToVector3 } from '@/utils/utils';
import { Sphere } from '@react-three/drei';
import { earthRadius } from "@/components/constant";
interface EarthProps {
  earthTextureUrl: string;
  displacementMapUrl: string;
}

const Point = (props: { lat: number, lon: number }) => {
  return (
    <mesh position={latLongToVector3(props.lat, props.lon, earthRadius)}>
      <sphereGeometry args={[0.05, 256, 256]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export const Earth = (props: EarthProps) => {
  const { earthTextureUrl, displacementMapUrl } = props;
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
      <Point lat={39.90} lon={116.40} />
    </Sphere>
  );
};
