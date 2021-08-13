import { FC, createContext, useState, useContext, useCallback } from 'react';
// import { Content } from 'models/content';

type characterCounterProps = {
  isPostable: boolean;
  setCounterState: (arg: boolean) => void;
  pushed: boolean;
  setPushedState: (arg: boolean) => void;
}

// default initialProps
const CharacterCounterContext = createContext<characterCounterProps>({
  isPostable: false,
  setCounterState: () => { },
  pushed: false,
  setPushedState: () => { },
});

export const useCharacterCounterContext = () => {
  return useContext(CharacterCounterContext);
}

export const useCharacterCounter = (): characterCounterProps => {
  // state名 ProjectContex type のプロパティに合わせる
  const [isPostable, setIsPostable] = useState(false);
  // 関数名は ProjectContexy type のプロパティに合わせる
  const setCounterState = useCallback((arg: boolean): void => {
    setIsPostable(arg);
  }, []);

  const [pushed, setPushed] = useState(false);
  const setPushedState = useCallback((arg: boolean): void => {
    setPushed(arg)

  }, []);
  return {
    isPostable,
    setCounterState,
    pushed,
    setPushedState,
  }
}

const CharacterCounterProvider: FC = ({ children }) => {
  const ctx = useCharacterCounter();
  // 下層コンポーネントをラップする
  return <CharacterCounterContext.Provider value={ctx}>{children}</CharacterCounterContext.Provider>;
}

export { CharacterCounterContext, CharacterCounterProvider };

