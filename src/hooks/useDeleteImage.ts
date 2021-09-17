import { useCallback } from 'react';
import { useProject } from 'hooks/useProject';
import { useDispatch } from 'react-redux';
import deleteImage from 'services/delete-image';
import { removeImage } from 'ducks/image/actions';
import { queryClient } from 'index';
import { keyItems } from 'constants/my-queries';

export const useDeleteImage = () => {
  const project = useProject();
  const dispatch = useDispatch();
  const {imagesAll} = keyItems;
  // const query4rm = [contentsAllByDate, project]; // 全コンテンツソート＋日付加工済
  
  const dispatchDelete = useCallback(async (source: string) => {
    console.log(`delete: ${source}`);
    dispatch(removeImage(source)); // store data 更新
    const msg = await deleteImage(source); // db から削除
    queryClient.removeQueries([imagesAll, project]); // キャッシュクリア
    console.log(msg);
  }, [project, dispatch, imagesAll]);

  return dispatchDelete;
}

