import { Actions, TOGGLE_TOAST } from './actions';

interface toastState {
  isToast: boolean,
  slug: string,
}

const initialState: toastState = {
  isToast: false,
  slug: '',
}

const toastReducer = (state: toastState = initialState, action: Actions) => {
  switch (action.type) {
    case TOGGLE_TOAST:
      // if (state.slug !== action.payload.slug) {
      //   return state
      // }
      return Object.assign({}, state, {
        isToast: !state.isToast,
        slug: action.payload.slug,
      });

    default:
      return state;
  }
}


export default toastReducer;

