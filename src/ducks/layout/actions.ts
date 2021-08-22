// import { LayoutType } from './types';

// layout アクションタイプの定数
export const ACTION_TYPE = {
  SWITCH_LAYOUT: 'SWITCH_LAYOUT',
  TOGGLE_LAYOUT: 'TOGGLE_LAYOUT'
} as const;

export const switchLayout = () => ({
  type: ACTION_TYPE.SWITCH_LAYOUT,
});

export const toggleLayout = () => ({
  type: ACTION_TYPE.TOGGLE_LAYOUT,

});

