import { useCallback } from 'react';
import { useProject } from 'hooks/useProject';
import { useDispatch } from 'react-redux';
import { deleteContents } from 'ducks/contents/actions';
import { initTags } from 'ducks/tags/actions';
import deleteContent from 'services/delete-content';
import { queryClient } from 'index';
import { keyItems } from 'constants/my-queries';

/*
 * DBのデータとstore上のデータ、両方を削除する
 * 記事一覧から削除するとき
 */

export const useDeleteContentsOnList = () => {
  const project = useProject();
  const dispatch = useDispatch();
  const {contentsAllByDate, tagsAll, name, ASC} = keyItems;
  // const query4rm = [contentsAllByDate, project]; // 全コンテンツソート＋日付加工済

  const deleteFunc = useCallback(async (slug: string) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteContents(slug))
    dispatch(initTags());
    const msg = await deleteContent(project, slug);
    queryClient.removeQueries([contentsAllByDate, project]);
    queryClient.removeQueries([tagsAll, project, { sort_by: name, order_by: ASC }]);
    console.log(msg);
  }, [project, dispatch, contentsAllByDate, tagsAll, name, ASC]);

  return deleteFunc;
}

