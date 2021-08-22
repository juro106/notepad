import { useCallback } from 'react';
import { Content } from 'models/content';

export const useEmbedDateToArray = (data: Content[], project: string) => {
  const newArray = useCallback(() => {
    return data.reduce((prev: Content[], current: Content, index: number, array: Content[]) => {
      const currentDate = current.created_at.substr(0, 7);
      const YYYYmm = `${currentDate.substr(0, 4)}年${currentDate.substr(5)}月`;
      const prevDate = index !== 0 ? array[index - 1].created_at.substr(0, 7) : '';
      if (prevDate !== currentDate) {
        prev.push({
          user: '',
          title: YYYYmm,
          content: 'date',
          project: project,
          slug: YYYYmm,
          created_at: YYYYmm
        });
      }
      prev.push(current);

      return prev;
    }, []);
  }, [data, project]);

  return newArray;
}

