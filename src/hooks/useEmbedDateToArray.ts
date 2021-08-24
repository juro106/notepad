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


  // const sampleArray = [
  //   {
  //     '2021-08': [
  //       {
  //         '2021-08-01':
  //           [
  //             { created_at: '2021-08-01', title: 'hoge' },
  //             { created_at: '2021-08-01', title: 'fuga' },
  //           ]
  //       },
  //       {
  //         '2021-08-02':
  //           [
  //             { created_at: '2021-08-02', title: 'deep impact' },
  //             { created_at: '2021-08-02', title: 'hearts cry' },
  //           ]
  //       },
  //     ]
  //   },
  //   {
  //     '2021-07': [
  //       {
  //         '2021-07-01':
  //           [
  //             { created_at: '2021-07-01', title: 'piyopiyo' },
  //             { created_at: '2021-07-01', title: 'hello world' },
  //           ]
  //       },
  //       {
  //         '2021-07-31':
  //           [
  //             { created_at: '2021-07-31', title: 'dance in the dark' },
  //             { created_at: '2021-07-31', title: 'special week' },
  //           ]
  //       },
  //     ]
  //   },
  // ];
  const dateArray = [
    { created_at: '2021-08-02', title: 'hearts cry' },
    { created_at: '2021-08-02', title: 'deep impact' },
    { created_at: '2021-08-01', title: 'hoge' },
    { created_at: '2021-08-01', title: 'fuga' },
    { created_at: '2021-07-31', title: 'special week' },
    { created_at: '2021-07-31', title: 'dance in the dark' },
    { created_at: '2021-07-01', title: 'piyopiyo' },
    { created_at: '2021-07-01', title: 'hello world' },
  ];

  type CContent = {
    created_at: string;
    title: string;
  }

  const New = () => { // 月毎
    let monthMap = new Map<string, CContent[]>();
    // let dadyMap = new Map<string, CContent[]>();

    dateArray.forEach((v) => {
      const YYYYmm = v.created_at.slice(0, 7);
      let monthArray: CContent[] | undefined = monthMap.get(YYYYmm);

      if (!monthArray) { // 
        monthMap.set(YYYYmm, [v]);
      } else {
        monthArray.push(v);
      }
    });
    return monthMap
  }

  const array = New();
  console.log('monthMap', array);
  array.forEach(v => {
    console.log(v);
  });

  const New2 = () => { // 2段階 これが望んでいた動作になっているっぽい。出力する際にリストへ挿入した順番で表示される
    let dayMap = new Map<string, CContent[]>();
    type monthGroup = { [key: string]: CContent[] }
    let monthMap = new Map<string, monthGroup>();

    dateArray.forEach(v => {
      const YYYYmm = v.created_at.slice(0, 7);
      const YYYYmmdd = v.created_at.slice(0, 10);
      let dayArray: CContent[] | undefined = dayMap.get(YYYYmmdd);
      let monthArray: monthGroup | undefined = monthMap.get(YYYYmm);

      if (!dayArray) { // 
        dayMap.set(YYYYmmdd, [v]);
      } else {
        dayArray.push(v);
      }

      if (monthArray && dayArray) {
        monthArray[YYYYmmdd] = dayArray;
      } else if (!monthArray && dayArray) {
        monthMap.set(YYYYmm, { [YYYYmmdd]: dayArray })
      }
    });

    return monthMap
  }

  const array2 = New2();
  console.log('monthMap2', array2);

  array2.forEach(v => {
    console.log('array2 forEach', v);
  });

  return newArray;
}

