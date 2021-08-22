// Actions
export const SET_IMAGE = 'SET_IMAGE'  as const;

// Action Creators
export const setImage = (path: string) => ({
  type: SET_IMAGE,
  payload: {
    path,
  } 
});

export type Actions = ReturnType<typeof setImage>

