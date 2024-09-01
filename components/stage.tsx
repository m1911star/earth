'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Cloud, Preload } from '@react-three/drei';
import { Earth } from './earth';
import { Atmosphere } from '@/components/atmosphere';
export const EarthStage = () => {
  const earthTextureUrl = '/earth.jpg';
  const displacementMapUrl = '/gray.png';
  return (
    <>
      <Canvas>
        <Stage adjustCamera={1}>
          <OrbitControls zoomSpeed={0.1} autoRotate maxZoom={3} />
          <Earth
            earthTextureUrl={earthTextureUrl}
            displacementMapUrl={displacementMapUrl}
          />
          <Atmosphere />
          <Preload all />
        </Stage>
      </Canvas>
      <div className="absolute top-4 left-4 bg-black-500 w-[300px] h-max backdrop-blur-md border-2 border-gray-100 rounded-md p-4">
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
