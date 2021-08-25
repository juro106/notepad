import { combineReducers } from 'redux';
import layoutReducer from './layout';
import projectReducer from './project';
import modalReducer from './modal';
import imageReducers from './image';
import toastReducers from './toast';
import contentsReducers from './contents';

const fugaState = {
  msg: 'Hello world State'
}

const fugaReducer = (state = fugaState) => {
  return state;
}

export const reducers = combineReducers({
  fuga: fugaReducer,
  layout: layoutReducer,
  project: projectReducer,
  modal: modalReducer,
  image: imageReducers,
  toast: toastReducers,
  contents: contentsReducers,
});

