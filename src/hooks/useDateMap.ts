import { useCallback } from 'react';
import { Content } from 'models/content';

export const useDateMap = (data: Content[], project: string) => {
  // 2段階 これが望んでいた動作になっているっぽい。出力する際にリストへ挿入した順番で表示される
  const newArray = useCallback(() => {

    let dayMap = new Map<string, Content[]>();
    type MonthMap = { [key: string]: Content[] }
    let monthMap = new Map<string, MonthMap>();

    data.forEach(v => {
      const YYYYmm = v.created_at.slice(0, 7);
      const YYYYmmdd = v.created_at.slice(0, 10);
      const dayArray: Content[] | undefined = dayMap.get(YYYYmmdd);
      const monthArray: MonthMap | undefined = monthMap.get(YYYYmm);

      if (!dayArray) { // 新規 
        dayMap.set(YYYYmmdd, [v]);
      } else { // 追加
        dayArray.push(v);
      }

      if (!monthArray && !dayArray) { // 新規
        monthMap.set(YYYYmm, { [YYYYmmdd]: [v] })
      } else if (!monthArray && dayArray) { // 日毎はあるが月毎がない
        monthMap.set(YYYYmm, { [YYYYmmdd]: dayArray })
      } else if (monthArray && dayArray) { // 追加
        monthArray[YYYYmmdd] = dayArray;
      }
    });

    return monthMap
  }, [data]);

  return newArray;
}

