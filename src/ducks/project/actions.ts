// project アクションタイプの定数
export const ACTION_TYPE = {
  SET_PROJECT: 'SET_PROJECT',
} as const;

export const setProject = (project: string) => ({
  type: ACTION_TYPE.SET_PROJECT,
  payload: {
    project
  } 
});

