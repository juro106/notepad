import { TagNum } from 'models/content';
// Actions
export const SET_TAGS = 'SET_TAGS'  as const;
export const INIT_TAGS = 'INIT_TAGS'  as const;
export const DELETE_TAGS = 'DELETE_TAGS'  as const;

// Action Creators
export const initTags = () => ({
  type: INIT_TAGS,
});

export const setTags = (list: TagNum[]) => ({
  type: SET_TAGS,
  payload: {
    list,
  } 
});

export const deleteTags = (name: string) => ({
  type: DELETE_TAGS,
  payload: {
    name,
  } 
});

export type Actions = ReturnType<typeof setTags | typeof initTags | typeof deleteTags>;

