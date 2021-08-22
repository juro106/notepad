import { ACTION_TYPE } from './actions';

// const SWITCH_LAYOUT = 'SWITCH_LAYOUT';
// const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';

// store の state の型
export type RootStateType = {
  layout: LayoutType['state']
}

// layout の型をまとめた型
export type LayoutType = {
  state: LayoutState
  action: LayoutAction
}
// layout の state の型
export type LayoutState = {
  grid: boolean;
}

// layout の action の型
export type LayoutAction = {
  type: keyof typeof ACTION_TYPE;
  payload: LayoutState;
}

