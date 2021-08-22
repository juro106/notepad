import { ImageState } from './types';
import { Actions, SET_IMAGE } from './actions';

const initialState: ImageState = {
    path: '',
}

const imageReducer = (state: ImageState = initialState, action: Actions) => {
    switch (action.type) {
      case SET_IMAGE:
            const { path } = action.payload;
            return { ...state, path: path, }

        default:
            return state;
    }
}

export default imageReducer;

