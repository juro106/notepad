import { useQuery } from 'react-query';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useSelectDataType } from 'hooks/useSelectDataType';

export const useFetch = (dataType: string) => {
  const { query, action, func } = useSelectDataType(dataType);
  const dispatch = useDispatch();

  // まずは store のデータを見に行く。
  const storeData = useSelector(state => state.contents.list);

  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(query, () => func);

  // // storeにデータがない && DB のデータがあるなら store へ dispatch 
  if (!storeData || storeData.length === 0) {
    if (data) {
      dispatch(action(data));
    }
  }

  if (storeData && storeData.length > 0) { // 2回目以降
    return storeData;
  } else if (data && data.length > 0) { // 初回
    return data;
  }
}

