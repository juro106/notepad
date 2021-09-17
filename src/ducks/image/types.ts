import { ImageActions } from './actions';
import { ImageFile } from 'models/image-file';

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
export type ImageState = ImageFilesState | ImageSourceState | ImageSelectorState | ImagePreviewState;

export type ImageFilesState = {
  list: ImageFile[],
}

export type ImageSourceState = {
  source: string;
}

export type ImageSelectorState = {
  selector: boolean;
}

export type ImagePreviewState = {
  source: string;
  isPreview: boolean;
}

// project の action の型
export type ImageAction = {
  type: keyof ImageActions;
  payload: ImageState; // ProjectState {project: string}
}

