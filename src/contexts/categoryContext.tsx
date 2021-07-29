import { FC, createContext, useState, useContext, useEffect } from 'react';
// import { Content } from 'models/content';

type categoryProps = {
  category: string;
}

const CategoryContext = createContext<categoryProps>({ category: '' });

export const useCategoryContext = () => {
  return useContext(CategoryContext);
}

const CategoryProvider: FC = ({ children }) => {
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
      setCategory('cat');
  }, [category]);

  // 下層コンポーネントをラップする
  return <CategoryContext.Provider value={{ category: category }}>{children}</CategoryContext.Provider>;
}

export { CategoryContext, CategoryProvider }; 

