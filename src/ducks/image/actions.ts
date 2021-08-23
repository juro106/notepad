// Actions
export const SET_IMAGE = 'SET_IMAGE'  as const;
export const OPEN_SELECTOR = 'OPEN_SELECTOR'  as const;
export const CLOSE_SELECTOR = 'CLOSE_SELECTOR'  as const;

// Action Creators
export const setImage = (path: string) => ({
  type: SET_IMAGE,
  payload: {
    path,
    selector: false,
  } 
});

export const openSelector = () => ({
  type: OPEN_SELECTOR,
  payload: {
    selector: true,
  } 
});

export const closeSelector = () => ({
  type: CLOSE_SELECTOR,
  payload: {
    selector: false,
  } 
});

export type Actions = ReturnType<typeof setImage | typeof openSelector | typeof closeSelector>

