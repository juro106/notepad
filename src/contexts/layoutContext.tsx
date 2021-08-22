import { FC, createContext, useState, useContext, useCallback } from 'react';

export type LayoutProps = {
  grid: boolean;
  switchLayout: () => void;
}

// default
const LayoutContext = createContext<LayoutProps>({
  grid: false,
  switchLayout: () => { },
});

export const useLayoutContext = () => {
  return useContext(LayoutContext);
}

export const useLayout = (): LayoutProps => {
  // state名 LayoutContex type のプロパティに合わせる
  const [grid, setGrid] = useState<boolean>(false);
  // 関数名は LayoutContext type のプロパティに合わせる
  const switchLayout = useCallback((): void => {
    setGrid(grid ? false : true);
  }, [grid]);
  return {
    grid,
    switchLayout,
  }
}

const LayoutProvider: FC = ({ children }) => {
  const ctx = useLayout();
  // 下層コンポーネントをラップする
  return <LayoutContext.Provider value={ctx}>{children}</LayoutContext.Provider>;
}

export { LayoutContext, LayoutProvider };

