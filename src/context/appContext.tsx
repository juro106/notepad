import { FC, createContext, useState, useContext, useEffect } from 'react';
// import { Content } from 'models/content';

type UpdateProps = {
  flg:  boolean;
}

const AppContext = createContext<UpdateProps>({ flg: false });

export const useAppContext = () => {
  return useContext(AppContext);
}

const flgOn = false; 

const AppProvider: FC = ({ children }) => {
  const [flg, setFlg] = useState<boolean>(false);

  useEffect(() => {
      setFlg(flgOn);
  }, []);

      console.log("flg:", flg)
  // 下層コンポーネントをラップする
  return <AppContext.Provider value={{ flg: flg }}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider }; 
