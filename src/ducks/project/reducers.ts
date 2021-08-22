import { ProjectState, ProjectType } from './types';
import { ACTION_TYPE } from './actions';

const initialState: ProjectState = {
    project: 'fugaProject',
}

const projectReducer = (state: ProjectState = initialState, action: ProjectType['action']) => {
    switch (action.type) {
        case ACTION_TYPE.SET_PROJECT:
            const { project } = action.payload;
            return { ...state, project: project, }

        default:
            return state;
    }
}

export default projectReducer;

