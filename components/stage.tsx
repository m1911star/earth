'use client';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Stage,
  Cloud,
  Preload,
  useGLTF,
  Environment,
  useFBX,
} from '@react-three/drei';
import { Earth } from './earth';
import { Atmosphere } from '@/components/atmosphere';

export const EarthStage = () => {
  // add
  const earthTextureUrl = '/earth.jpg';
  const displacementMapUrl = '/gray.png';
  return (
    <>
      <Canvas>
        <Stage adjustCamera={1}>
          <OrbitControls zoomSpeed={0.1} />
          <Earth
            earthTextureUrl={earthTextureUrl}
            displacementMapUrl={displacementMapUrl}
          />
          <Atmosphere />
          <Preload all />
        </Stage>
        <Environment
          background={true} // can be true, false or "only" (which only sets the background) (default: false)
          backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
          backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
          backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
          environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
          environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
          files={['universe.jpg']}
          path="/"
          scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
          encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
        />
      </Canvas>
      <div
        style={{
          textShadow: '0px 0px 10px #00c2cb, -2px -1px 20px #fff',
          boxShadow: '0px 0px 10px #00c2cb, -2px -1px 20px #fff',
          color: '#00c2cb',
        }}
        className="absolute top-4 left-4 bg-black-500 w-[300px] h-max backdrop-blur-md border-2 border-gray-100 rounded-md p-4"
      >
        <h1 className="text-2xl font-bold mb-2">地球</h1>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">远日点</label>
          <p className="flex-1">152,100,000 km（94,500,000 mi）</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">近日点</label>
          <p className="flex-1">147,095,000 km（91,401,000 mi）</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">半长轴</label>
          <p className="flex-1">149,598,023 km（92,955,902 mi）</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">离心率</label>
          <p className="flex-1">0.0167086</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">周长</label>
          <p className="flex-1">
            40,075.017 km（24,901.461 mi）赤道 [8] 40,007.86 km（24,859.73 mi）
          </p>
        </div>
      </div>
    </>
  );
};
