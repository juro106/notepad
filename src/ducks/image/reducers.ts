import { ImageFile } from 'models/image-file';
import { ImageFilesState, ImageSourceState, ImageSelectorState, ImagePreviewState } from './types';
import { ImageActions, INIT_IMAGES, SET_IMAGES, REMOVE_IMAGE, SET_IMAGE_SOURCE, OPEN_SELECTOR, CLOSE_SELECTOR, OPEN_PREVIEW, CLOSE_PREVIEW } from './actions';
import { combineReducers } from 'redux'

const initialStateFiles: ImageFilesState = {
  list: [],
}
const initialStateSource: ImageSourceState = {
  source: '',
}

const initialStateSelector: ImageSelectorState = {
  selector: false,
}

const initialStatePreview: ImagePreviewState = {
  source: '',
  isPreview: false,
}

const filterImages = (list: ImageFile[], name: string) => list.filter(item => item.name !== name);

const imageFilesReducer = (state: ImageFilesState = initialStateFiles, action: ImageActions) => {
  switch (action.type) {
    case INIT_IMAGES:
      return Object.assign({}, state, {
        list: [],
      });
    case SET_IMAGES:
      return Object.assign({}, state, {
        list: action.payload.images,
      });
    case REMOVE_IMAGE:
      const filteredContents = filterImages(state.list, action.payload.source);
      return Object.assign({}, state, {
        list: filteredContents,
      });
    default:
      return state;
  }
}
const imageSourceReducer = (state: ImageSourceState = initialStateSource, action: ImageActions) => {
  switch (action.type) {
    case SET_IMAGE_SOURCE:
      return Object.assign({}, state, {
        source: action.payload.source,
      });
    default:
      return state;
  }
}

const imageSelectorReducer = (state: ImageSelectorState = initialStateSelector, action: ImageActions) => {
  switch (action.type) {
    case OPEN_SELECTOR:
      return Object.assign({}, state, {
        selector: true
      });
    case CLOSE_SELECTOR:
      return Object.assign({}, state, {
        selector: false
      });
    default:
      return state;
  }
}

const imagePreviewReducer = (state: ImagePreviewState = initialStatePreview, action: ImageActions) => {
  switch (action.type) {
    case OPEN_PREVIEW:
      return Object.assign({}, state, {
        source: action.payload.source,
        isPreview: true
      });
    case CLOSE_PREVIEW:
      return Object.assign({}, state, {
        source: '',
        isPreview: false
      });
    default:
      return state;
  }
}

const imageReducers = combineReducers({
  imageFiles: imageFilesReducer,
  imageSource: imageSourceReducer,
  imageSelector: imageSelectorReducer,
  imagePreview: imagePreviewReducer,
});

export default imageReducers;

