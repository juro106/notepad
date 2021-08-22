import { combineReducers } from 'redux';
import layoutReducer from './layout';
import projectReducer from './project';

const fugaState = {
  msg: 'fuga! fuag! fuga!'
}

const fugaReducer = (state = fugaState) => {
  return state;
}

export const reducers = combineReducers({
  hoge: fugaReducer,
  layout: layoutReducer,
  project: projectReducer,
});

