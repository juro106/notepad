import { combineReducers } from 'redux';
import layoutReducer from './layout';
import projectReducer from './project';
import modalReducer from './modal';
import imageReducers from './image';
import toastReducers from './toast';
import contentsReducers from './contents';
import tagsReducers from './tags';

const fugaState = {
  msg: 'Hello world State'
}

const fugaReducer = (state = fugaState) => {
  return state;
}

export const reducers = combineReducers({
  project: projectReducer,
  layout: layoutReducer,
  contents: contentsReducers,
  tags: tagsReducers,
  image: imageReducers,
  modal: modalReducer,
  toast: toastReducers,
  fuga: fugaReducer,
});

