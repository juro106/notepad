import { FC, createContext, useState, useContext, useCallback } from 'react';
// import { Content } from 'models/content';

type ImgSelectProps = {
  show: boolean;
  setCurrentState: (show: boolean) => void;
  ctxImgURL: string;
  setCurrentImgURL: (url: string) => void;
}

// default initialProps
const ImgSelectContext = createContext<ImgSelectProps>({
  show: false,
  setCurrentState: () => {},
  ctxImgURL: '',
  setCurrentImgURL: () => {},
});

export const useImgSelectContext = () => {
  return useContext(ImgSelectContext);
}

export const useImgSelector = (): ImgSelectProps => {
  // state名 ProjectContex type のプロパティに合わせる
  const [show, setShow] = useState(false);
  const [ctxImgURL, setCtxImgURL] = useState<string>('');
  // 関数名は ProjectContexy type のプロパティに合わせる
  const setCurrentState = useCallback((curState: boolean): void => {
    setShow(curState);
  }, []);
  const setCurrentImgURL = useCallback((curImgURL: string): void => {
    setCtxImgURL(curImgURL);
  }, []);
  return {
    show,
    setCurrentState,
    ctxImgURL,
    setCurrentImgURL,
  }
}

const ImgSelectProvider: FC = ({ children }) => {
  const ctx = useImgSelector();
  // 下層コンポーネントをラップする
  return <ImgSelectContext.Provider value={ctx}>{children}</ImgSelectContext.Provider>;
}

export { ImgSelectContext, ImgSelectProvider }; 

