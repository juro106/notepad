import { useQuery } from 'react-query';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { keyItems } from 'constants/my-queries';
import getProjects from 'services/get-projects';
import { useProject } from 'hooks/useProject';
import { setProjects } from 'ducks/project/actions';

export const useFetchProjects = (): string[] | undefined => {
  const project = useProject();
  const { projectsAll } = keyItems;
  // まずは store のデータを見に行く。
  const storeData: string[] = useSelector(state => state.project.list);
  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(
    [projectsAll, project], // 第2引数に project を指定する理由は project を変更したら勝手に re-fetch させたいため。
    () => getProjects()); // ログイン状態でのみ成立する fetch 
  // // storeにデータがない && DB のデータがあるなら store へ dispatch 
  const dispatch = useDispatch();
  if ((!storeData || storeData.length === 0) && data) {
    dispatch(setProjects(data));
    console.log('dispatch setProjects')
  }

  if (storeData && storeData.length > 0) { // 2回目以降
    return storeData;
  } else if (data && data.length > 0) { // 初回
    return data;
  }
}


