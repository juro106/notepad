import { ImageActions } from './actions';

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

export type ImageSelectorState = {
  selector: boolean;
}

// project の action の型
export type ImageAction = {
  type: keyof ImageActions;
  payload: ImageState; // ProjectState {project: string}
}

