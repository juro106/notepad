import { ProjectState, ProjectType } from './types';
import { ACTION_TYPE } from './actions';

const initialState: ProjectState = {
  project: '',
  item: '',
  list: []
}

const addItem = (array: string[], item: string) => (Array.from(new Set([...array, item])));

const removeItem = (array: string[], item: string) => (array.filter(v => v !== item));

const projectReducer = (state: ProjectState = initialState, action: ProjectType['action']) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PROJECT:
      const { project } = action.payload;
      return { ...state, project: project, }
    case ACTION_TYPE.INIT_PROJECTS:
      return { ...state, list: [], }
    case ACTION_TYPE.SET_PROJECTS:
      const { list } = action.payload;
      return { ...state, list: list, }
    case ACTION_TYPE.ADD_PROJECT:
      return { ...state, list: addItem(state.list, action.payload.item) }
    case ACTION_TYPE.REMOVE_PROJECT:
      return { ...state, list: removeItem(state.list, action.payload.item) }

    default:
      return state;
  }
}

export default projectReducer;

