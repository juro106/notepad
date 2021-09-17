import { useQuery } from 'react-query';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { keyItems } from 'constants/my-queries';
import { ImageFile } from 'models/image-file'
import getImages from 'services/get-images';
import { useProject } from 'hooks/useProject';
import { setImages } from 'ducks/image/actions';

export const useFetchImages = (): ImageFile[] | undefined => {
  const project = useProject();
  const { imagesAll } = keyItems;
  // まずは store のデータを見に行く。
  const storeData: ImageFile[] = useSelector(state => state.image.imageFiles.list);
  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(
    [imagesAll, project],
    () => getImages(project));
  // // storeにデータがない && DB のデータがあるなら store へ dispatch 
  const dispatch = useDispatch();
  if ((!storeData || storeData.length === 0) && data) {
    dispatch(setImages(data));
    console.log('dispatch setImages')
  }

  if (storeData && storeData.length > 0) { // 2回目以降
    return storeData;
  } else if (data && data.length > 0) { // 初回
    return data;
  }
}

