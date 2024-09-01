'use client';

import { useDocumentTitle } from '@mantine/hooks';
import {
  Environment,
  OrbitControls,
  Sky,
  Stage,
  useFBX,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const Rockets: React.FC = () => {
  const all = useFBX('/all.fbx');
  return <primitive object={all} dispose={null} scale={0.02} />;
};

export default function Gallery() {
  useDocumentTitle('Gallery');
  // add shine effect to the info div
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.7} />
        <directionalLight />
        <Stage adjustCamera={1} intensity={0.2}>
          <Suspense fallback={null}>
            <Rockets />
          </Suspense>
        </Stage>
        <OrbitControls makeDefault />
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
        id="info"
        style={{
          textShadow: '0px 0px 10px #00c2cb, -2px -1px 20px #fff',
          boxShadow: '0px 0px 10px #00c2cb, -2px -1px 20px #fff',
          color: '#00c2cb',
        }}
        className="absolute top-4 left-4 flex flex-col gap-2 text-sm text-black-500 w-[300px] overflow-y-auto bg-transparent backdrop-blur-md rounded-md p-4"
      >
        <h1 className="text-2xl font-bold mb-2">长征系列运载火箭</h1>
        <div className="">
          长征系列运载火箭是中华人民共和国自行研制的运载火箭，是中国运载火箭中最为知名的一个系列。长征火箭从1965年开始研制，1970年“长征一号”运载火箭首次发射“东方红一号”卫星成功。目前，长征火箭有：长征一号、长征二号、长征三号、长征四号、长征五号、长征六号、长征七号、长征八号[1]和长征十一号9个系列，其中长征一号系列已全部退役。长征系列各轨道最大发射能力分别是：近地轨道25吨，太阳同步轨道15吨，地球同步转移轨道14吨。
          长征系列火箭承接了中国航天大部分发射任务，也在国际商业卫星发射市场上占了一席之地。截至2023年12月30日，长征系列火箭共发射505次[2]。
        </div>
      </div>
    </>
  );
}
