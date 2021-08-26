import { Actions, TOGGLE_TOAST } from './actions';

interface toastState {
  slug: string,
  isToast: boolean,
}

interface toastList {
  toasts: {[key: string]: toastState,},
}

const initialState: toastList = {
  toasts: {},
}


const toastReducer = (state: toastList = initialState, action: Actions) => {
  switch (action.type) {
    case TOGGLE_TOAST:
      // if (state.slug !== action.payload.slug) {
      //   return state
      // }
      return Object.assign({}, state, {
        isToast: !state.toasts.slug.isToast,
        slug: action.payload.slug,
      });

    default:
      return state;
  }
}


export default toastReducer;

