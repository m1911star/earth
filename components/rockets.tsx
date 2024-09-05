import { useFBX } from '@react-three/drei';

export const Rockets: React.FC = () => {
  const all = useFBX('/all.fbx');
  return <primitive object={all} dispose={null} scale={0.02} />;
};
