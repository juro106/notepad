import { Content } from 'models/content';
// Actions
export const SET_CONTENTS = 'SET_CONTENTS'  as const;
export const INIT_CONTENTS = 'INIT_CONTENTS'  as const;
export const SET_CONTENTS_BYDATE = 'SET_CONTENTS_BYDATE'  as const;
export const INIT_CONTENTS_BYDATE = 'INIT_CONTENTS_BYDATE'  as const;
export const DELETE_CONTENTS = 'DELETE_CONTENTS'  as const;

// Action Creators
export const initContents = () => ({
  type: INIT_CONTENTS,
});

export const setContents = (contents: Content[]) => ({
  type: SET_CONTENTS,
  payload: {
    contents,
  } 
});

export const initContentsByDate = () => ({
  type: INIT_CONTENTS_BYDATE,
});

export const setContentsByDate = (contents: Content[]) => ({
  type: SET_CONTENTS_BYDATE,
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

export type Actions = ReturnType<
  typeof initContents
  | typeof setContents 
  | typeof initContentsByDate
  | typeof setContentsByDate 
  | typeof deleteContents
  >;

