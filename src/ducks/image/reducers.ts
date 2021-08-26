import { ImageState, ImageSelectorState } from './types';
import { ImageActions, SET_IMAGE, OPEN_SELECTOR, CLOSE_SELECTOR } from './actions';
import { combineReducers } from 'redux'

const initialState: ImageState = {
  path: '',
}

const initialStateSelector: ImageSelectorState = {
  selector: false,
}

const imageStateReducer = (state: ImageState = initialState, action: ImageActions) => {
  switch (action.type) {
    case SET_IMAGE:
      const { path } = action.payload;
      return { ...state, path: path, }
    default:
      return state;
  }
}

const imageSelectorReducer = (state: ImageSelectorState = initialStateSelector, action: ImageActions) => {
  switch (action.type) {
    case OPEN_SELECTOR:
      return { ...state, selector: true, }
    case CLOSE_SELECTOR:
      return { ...state, selector: false, }
    default:
      return state;
  }
}

const imageReducers = combineReducers({
  imageSrc: imageStateReducer,
  imageSelector: imageSelectorReducer,
});

export default imageReducers;

