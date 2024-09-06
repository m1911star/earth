import { ModelScene, ModelSceneContext } from '@/hooks/context';
import { useContext } from 'react';

const RocketTips = () => {
  return (
    <div
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="opacity-80 absolute bottom-4 left-4 flex flex-col gap-2 text-sm text-black-500 w-[300px] overflow-y-auto bg-transparent backdrop-blur-md border-2 border-gray-500 border-opacity-20 rounded-md p-4"
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
  );
};

const GalleryTips = () => {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2 text-sm text-black-500 w-[300px] overflow-y-auto bg-transparent backdrop-blur-md border-2 border-gray-500 border-opacity-20 rounded-md p-4">
      <h1 className="text-2xl font-bold mb-2">长征系列运载火箭</h1>
      <div className="">
        长征系列运载火箭是中华人民共和国自行研制的运载火箭，是中国运载火箭中最为知名的一个系列。长征火箭从1965年开始研制，1970年“长征一号”运载火箭首次发射“东方红一号”卫星成功。目前，长征火箭有：长征一号、长征二号、长征三号、长征四号、长征五号、长征六号、长征七号、长征八号[1]和长征十一号9个系列，其中长征一号系列已全部退役。长征系列各轨道最大发射能力分别是：近地轨道25吨，太阳同步轨道15吨，地球同步转移轨道14吨。
        长征系列火箭承接了中国航天大部分发射任务，也在国际商业卫星发射市场上占了一席之地。截至2023年12月30日，长征系列火箭共发射505次[2]。
      </div>
    </div>
  );
};

export const Tips = () => {
  const { model } = useContext(ModelSceneContext);

  switch (model) {
    case ModelScene.ROCKET:
      return <RocketTips />;
    case ModelScene.GALLERY:
      return <GalleryTips />;
    default:
      return null;
  }
};
