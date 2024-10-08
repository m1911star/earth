import { createContext } from 'react';

export enum ModelScene {
  EARTH = 'earth',
  GALLERY = 'gallery',
  ROCKET = 'rocket',
  SOLAR = 'solar',
}

export const ModelSceneContext = createContext<{
  model: ModelScene | null;
  setModel: (model: ModelScene | null) => void;
}>({
  model: null,
  setModel: () => {},
});
