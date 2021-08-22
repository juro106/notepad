import { Actions } from './actions';

// store の state の型
export type RootStateType = {
  image: ImageType['state']
}

// image の型をまとめた型
export type ImageType = {
  state: ImageState
  action: ImageAction
}
// image の state の型
export type ImageState = {
  path: string;
}

// project の action の型
export type ImageAction = {
  type: keyof Actions;
  payload: ImageState; // ProjectState {project: string}
}

