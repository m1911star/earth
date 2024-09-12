'use client';

import {
  Gltf,
  Html,
  OrbitControls,
  Preload,
  Sky,
  Stage,
  Stars,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDocumentTitle, useHotkeys } from '@mantine/hooks';

function LoadingIndicator() {
  const { active, progress } = useProgress();
  const progressPercentage = Math.round(progress * 100);
  if (!active) {
    return null;
  }
  return <Html center>{progressPercentage} % loaded</Html>;
}

const RocketModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  useHotkeys([['Space', () => setIsLaunched(!isLaunched)]]);
  useDocumentTitle('Rocket');
  const { camera } = useThree();
  useFrame(() => {
    if (isLaunched && modelRef.current) {
      modelRef.current.position.y += 0.02;
      if (camera.position.x < 1) {
        camera.position.x += 0.025;
      }
      camera.lookAt(modelRef?.current?.position || new THREE.Vector3(0, 0, 0));
    }
  });

  useEffect(() => {
    if (!isLaunched) {
      modelRef.current?.position.set(0, 0, 0);
      camera.lookAt(modelRef.current?.position || new THREE.Vector3(0, 0, 0));
    }
  }, [isLaunched]);

  return (
    <Suspense fallback={null}>
      <Gltf ref={modelRef} castShadow receiveShadow src="/rocket-2.glb" />
      <Preload all />
      <LoadingIndicator />
    </Suspense>
  );
};

export default function Rocket() {
  useDocumentTitle('Rocket');
  return (
    <>
      <Canvas>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={5}
          saturation={0}
          speed={3}
        />
        <Stage adjustCamera={true}>
          <Suspense fallback={null}>
            <RocketModel />
          </Suspense>
          {/* <Text
            position={[1, 2, 0]} // 调整位置
            fontSize={0.5}
            color="white"
          >
            火箭
            <MeshTransmissionMaterial
              thickness={0.3}
              roughness={0.5}
              transmission={1}
              ior={1.5}
              chromaticAberration={0.1}
            />
          </Text> */}
        </Stage>
        <OrbitControls makeDefault />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
      </Canvas>
      <div
        onWheel={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="opacity-80 absolute top-4 left-4 flex flex-col gap-2 text-sm text-black-500 w-[300px] overflow-y-auto bg-transparent backdrop-blur-md border-2 border-white border-opacity-50 rounded-md p-4"
      >
        <h1 className="text-2xl font-bold mb-2">长征二号F运载火箭</h1>
        <div className="flex flex-row gap-2 items-center justify-between">
          <label className="font-bold w-[80px]">用途</label>
          <p className="flex-1">不可重复使用之运载火箭</p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <label className="font-bold w-[80px]">制造者</label>
          <p className="flex-1">中国运载火箭技术研究院(CALT)</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">高度</label>
          <p className="flex-1">
            Y版本: 58.34米(191.4英尺)
            <br /> T版本: 52.03米(170.7英尺)
          </p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">直径</label>
          <p className="flex-1">
            芯级: 3.35米(11.0英尺)
            <br /> 助推器: 2.25米(7.4英尺)
          </p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">级数</label>
          <p className="flex-1">2级+4×助推器</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">发射场</label>
          <p className="flex-1">中国酒泉卫星发射中心921工位</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">总发射次数</label>
          <p className="flex-1">23次</p>
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-bold w-[80px]">成功次数</label>
          <p className="flex-1">23次</p>
        </div>
      </div>
    </>
  );
}
