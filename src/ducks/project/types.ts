import { ACTION_TYPE } from './actions';

// store の state の型
export type RootStateType = {
  project: ProjectType['state']
}

// project の型をまとめた型
export type ProjectType = {
  state: ProjectState
  action: ProjectAction
}
// project の state の型
export type ProjectState = {
  project: string;
  item: string;
  list: string[];
}

// project の action の型
export type ProjectAction = {
  type: keyof typeof ACTION_TYPE;
  payload: ProjectState; // ProjectState {project: string}
}

