import { ImageFile } from 'models/image-file';

// Actions
export const SET_IMAGES = 'SET_IMAGES' as const;
export const INIT_IMAGES = 'INIT_IMAGE' as const;
export const REMOVE_IMAGE = 'REMOVE_IMAGE' as const;
export const SET_IMAGE_SOURCE = 'SET_IMAGE_SOURCE' as const;
export const OPEN_SELECTOR = 'OPEN_SELECTOR' as const;
export const CLOSE_SELECTOR = 'CLOSE_SELECTOR' as const;
export const OPEN_PREVIEW = 'OPEN_PREVIEW' as const;
export const CLOSE_PREVIEW = 'CLOSE_PREVIEW' as const;

// Action Creators
export const setImages = (images: ImageFile[]) => ({
  type: SET_IMAGES,
  payload: {
    images
  }
});
export const initImages = () => ({
  type: INIT_IMAGES,
});
export const removeImage = (source: string) => ({
  type: REMOVE_IMAGE,
  payload: {
    source
  }
});

export const setImageSource = (source: string) => ({
  type: SET_IMAGE_SOURCE,
  payload: {
    source,
  }
});

// selector
export const openSelector = () => ({
  type: OPEN_SELECTOR,
  payload: {
    selector: true,
  }
});

export const closeSelector = () => ({
  type: CLOSE_SELECTOR,
  payload: {
    selector: false,
  }
});

// previewer
export const openPreview = (source: string) => ({
  type: OPEN_PREVIEW,
  payload: {
    source: source,
  }
});

export const closePreview = () => ({
  type: CLOSE_PREVIEW,
});


export type ImageActions = ReturnType<typeof setImages
  | typeof initImages
  | typeof removeImage
  | typeof setImageSource
  | typeof openSelector
  | typeof closeSelector
  | typeof openPreview
  | typeof closePreview
  >

