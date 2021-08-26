import { TagNum } from 'models/content';
import { Actions, INIT_TAGS, SET_TAGS, DELETE_TAGS } from './actions';

interface tagsState {
  // contents: content[],
  list: TagNum[],
}

const initialState: tagsState = {
  list: [],
}

const filterTags = (list: TagNum[], name: string) => list.filter(item => item.name !== name);

const tagsReducer = (state: tagsState = initialState, action: Actions) => {
  switch (action.type) {
    case INIT_TAGS:
      return Object.assign({}, state, {
        list: []
      });
    case SET_TAGS:
      return Object.assign({}, state, {
        list: action.payload.list
      });
    case DELETE_TAGS:
      const filteredTags = filterTags(state.list, action.payload.name);
      return Object.assign({}, state, {
        list: filteredTags,
      });

    default:
      return state;
  }
}

export default tagsReducer;

