import { ImageState, ImageSelectorState } from './types';
import { Actions, SET_IMAGE, OPEN_SELECTOR, CLOSE_SELECTOR } from './actions';
import { combineReducers } from 'redux'

const initialState: ImageState = {
  path: '',
}

const initialStateSelector: ImageSelectorState = {
  selector: false,
}

const imageStateReducer = (state: ImageState = initialState, action: Actions) => {
  switch (action.type) {
    case SET_IMAGE:
      const { path } = action.payload;
      return { ...state, path: path, }

    default:
      return state;
  }
}

const imageSelectorReducer = (state: ImageSelectorState = initialStateSelector, action: Actions) => {
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

