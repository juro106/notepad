import { useQuery } from 'react-query';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { keyItems } from 'constants/my-queries';
import { TagNum } from 'models/content'
import getTags from 'services/get-tags';
import { useProject } from 'hooks/useProject';
import { setTags } from 'ducks/tags/actions';

export const useFetchTags = (): TagNum[] | undefined => {
  const project = useProject();
  const { tagsAll, name, ASC } = keyItems;

  // まずは store のデータを見に行く。
  const storeData: TagNum[] = useSelector(state => state.tags.list);
  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(
    [tagsAll, project, { sort_by: name, order_by: ASC }],
    () => getTags(project));
  // // storeにデータがない && DB のデータがあるなら store へ dispatch 
  const dispatch = useDispatch();
  if ((!storeData || storeData.length === 0) && data) {
    dispatch(setTags(data));
    console.log('dispatch setTags')
  }

  if (storeData && storeData.length > 0) { // 2回目以降
    return storeData;
  } else if (data && data.length > 0) { // 初回
    return data;
  }
}

