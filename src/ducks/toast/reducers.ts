import { Actions, OPEN_TOAST, CLOSE_TOAST, TOGGLE_TOAST } from './actions';

interface toastState {
  isOpen: boolean,
  source: string,
}

const initialState: toastState = {
  isOpen: false,
  source: '',
}


const toastReducer = (state: toastState = initialState, action: Actions) => {
  switch (action.type) {
    case TOGGLE_TOAST:
      return Object.assign({}, state, {
        isOpen: !state.isOpen,
      });
    case OPEN_TOAST:
      return Object.assign({}, state, {
        isOpen: true,
        source: action.payload.source,
      });
    case CLOSE_TOAST:
      return Object.assign({}, state, {
        isOpen: false,
        source: '',
      });

    default:
      return state;
  }
}

export default toastReducer;

