import { Content } from 'models/content';
import { Actions, SET_CONTENTS, INIT_CONTENTS, DELETE_CONTENTS } from './actions';

interface content {
  slug: string,
  data: Content,
}

interface contentsState {
  // contents: content[],
  contents: Content[],
}

const initialState: contentsState = {
  contents: [],
}

const createNewContents = (list: Content[]): content[] => {
  const newList = list.map(v => ({
    slug: v.slug,
    data: v,
  }));

  return newList;
}

export const contentsObj = (list: Content[]) => {
  const obj = list.reduce((list, data) => ({...list, [data.slug]: data}), {});
  return obj;
}

const filterContents = (list: Content[], slug: string) => list.filter(item => item.slug !== slug);

const contentsReducer = (state: contentsState = initialState, action: Actions) => {
  switch (action.type) {
    case SET_CONTENTS:
      const newContents = createNewContents(action.payload.contents);
      return Object.assign({}, state, {
        contents: newContents,
      });
    case INIT_CONTENTS:
      // const newObj = contentsObj(action.payload.contents);
      return Object.assign({}, state, {
        // contents: newObj,
        contents: action.payload.contents
      });
    case DELETE_CONTENTS:
      const filteredContents = filterContents(state.contents, action.payload.slug);
      return Object.assign({}, state, {
        contents: filteredContents,
      });

    default:
      return state;
  }
}

export default contentsReducer;

