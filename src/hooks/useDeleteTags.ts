import { useCallback } from 'react';
import { useProject } from 'hooks/useProject';
// import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { deleteTags } from 'ducks/tags/actions';
import { initContents, initContentsByDate } from 'ducks/contents/actions';
import { queryClient } from 'index';
import { keyItems } from 'constants/my-queries';
import deleteContent from 'services/delete-content';

// DB のデータ削除 & store の情報を更新  
export const useDeleteTags = () => {
  const project = useProject();
  const dispatch = useDispatch();
  const {contentsAll, contentsAllByDate} = keyItems;
  
  const deleteItem = useCallback(async (slug: string) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteTags(slug));
    dispatch(initContents());
    dispatch(initContentsByDate());
    // initData.filter(item => item.slug !== slug);
    const msg = await deleteContent(project, slug);
    console.log(msg);
    queryClient.removeQueries([contentsAllByDate, project]);
    queryClient.removeQueries([contentsAll, project]);
  }, [project, dispatch, contentsAll, contentsAllByDate]);

  return deleteItem;
}

