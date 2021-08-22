import { createStore, compose } from 'redux';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';
import { reducers } from 'ducks';

// useSelector を store(このファイル) から インポートして使う
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

// devtools
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare const window: ExtendedWindow;
const composeReduxDevToolsEnhancers = 
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducers,
  composeReduxDevToolsEnhancers()
);

export default store;

