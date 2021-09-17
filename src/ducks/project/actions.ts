// project アクションタイプの定数
export const ACTION_TYPE = {
  SET_PROJECT: 'SET_PROJECT',
  INIT_PROJECTS: 'INIT_PROJECTS',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT',
} as const;

export const setProject = (project: string) => ({
  type: ACTION_TYPE.SET_PROJECT,
  payload: {
    project
  } 
});

export const initProjects = () => ({
  type: ACTION_TYPE.INIT_PROJECTS,
});

export const setProjects = (list: string[]) => ({
  type: ACTION_TYPE.SET_PROJECTS,
  payload: {
    list
  } 
});

export const addProject = (item: string) => ({
  type: ACTION_TYPE.ADD_PROJECT,
  payload: {
    item
  } 
});

export const removeProject = (item: string) => ({
  type: ACTION_TYPE.REMOVE_PROJECT,
  payload: {
    item
  } 
});

