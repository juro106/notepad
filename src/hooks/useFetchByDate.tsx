import { useQuery } from 'react-query';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { keyItems } from 'constants/my-queries';
import { Content } from 'models/content'
import getContentsAll from 'services/get-contents-all';
import { useProject } from 'hooks/useProject';
import { setContentsByDate } from 'ducks/contents/actions';

export const useFetchByDate = (): Content[] | undefined => {
  const project = useProject();
  const { contentsAll, created_at, DESC, date } = keyItems;

  // まずは store のデータを見に行く。
  const storeData: Content[] = useSelector(state => state.contents.list_bydate);
  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(
    [contentsAll, project, { sort_by: created_at, order_by: DESC, embed: date }],
    () => getContentsAll(project, true, '?sort_by=created_at')
  );
  // // storeにデータがない && DB のデータがあるなら store へ dispatch 
  const dispatch = useDispatch();
  if ((!storeData || storeData.length === 0) && data) {
    dispatch(setContentsByDate(data));
    console.log('dispatch setContents ByDate')
  }

  if (storeData && storeData.length > 0) { // 2回目以降
    return storeData;
  } else if (data && data.length > 0) { // 初回
    return data;
  }
}

