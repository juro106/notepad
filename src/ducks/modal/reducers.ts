import { Actions, TOGGLE_MODAL } from './actions';

export type ModalState = {
  modal: boolean;
}

const initialState: ModalState = {
  modal: false,
}

const modalReducer = (state: ModalState = initialState, action: Actions) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal
      }

    default:
      return state;
  }
}

export default modalReducer;

