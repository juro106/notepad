import { LayoutState, LayoutType } from './types';
import { ACTION_TYPE } from './actions';

const initialState: LayoutState = {
  grid: false,
}

// Object.assign({}, state, {
//   grid: !state.grid
// });
const layoutReducer = (state: LayoutState = initialState, action: LayoutType['action']) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_LAYOUT:
      // return Object.assign({}, state,  {grid: !state.grid });
      return {
        ...state,
        grid: !state.grid
      }
    default:
      return state;
  }
}

export default layoutReducer;

