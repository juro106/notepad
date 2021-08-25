import { Content } from 'models/content';
// Actions
export const SET_CONTENTS = 'SET_IMAGE'  as const;
export const INIT_CONTENTS = 'INIT_CONTENTS'  as const;
export const DELETE_CONTENTS = 'DELETE_CONTENTS'  as const;

// Action Creators
export const setContents = (contents: Content[]) => ({
  type: SET_CONTENTS,
  payload: {
    contents,
  } 
});

export const initContents = (contents: Content[]) => ({
  type: INIT_CONTENTS,
  payload: {
    contents,
  } 
});

export const deleteContents = (slug: string) => ({
  type: DELETE_CONTENTS,
  payload: {
    slug,
  } 
});

export type Actions = ReturnType<typeof setContents | typeof initContents | typeof deleteContents>;

