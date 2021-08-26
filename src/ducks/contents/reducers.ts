import { Content } from 'models/content';
import { Actions,
  SET_CONTENTS,
  INIT_CONTENTS,
  SET_CONTENTS_BYDATE,
  INIT_CONTENTS_BYDATE,
  DELETE_CONTENTS
} from './actions';

interface contentsState {
  // contents: content[],
  list: Content[],
  list_bydate: Content[],
}

const initialState: contentsState = {
  list: [],
  list_bydate: [],
}

const filterContents = (list: Content[], slug: string) => list.filter(item => item.slug !== slug);

const contentsReducer = (state: contentsState = initialState, action: Actions) => {
  switch (action.type) {
    case INIT_CONTENTS:
      return Object.assign({}, state, {
        list: []
      });
    case SET_CONTENTS:
      return Object.assign({}, state, {
        list: action.payload.contents,
      });
    case INIT_CONTENTS_BYDATE:
      return Object.assign({}, state, {
        list_bydate: []
      });
    case SET_CONTENTS_BYDATE:
      return Object.assign({}, state, {
        list_bydate: action.payload.contents,
      });
    case DELETE_CONTENTS:
      const filteredContents = filterContents(state.list, action.payload.slug);
      return Object.assign({}, state, {
        list: filteredContents,
      });

    default:
      return state;
  }
}

export default contentsReducer;

