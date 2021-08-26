import { useCallback } from 'react';
import { useProject } from 'hooks/useProject';
// import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import deleteContent from 'services/delete-content';
import { deleteTags } from 'ducks/tags/actions';
  // console.log(param);
export const useDeleteTags = () => {
  const project = useProject();
  const dispatch = useDispatch();
  
  const deleteItem = useCallback(async (slug: string) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteTags(slug))
    // initData.filter(item => item.slug !== slug);
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }, [project, dispatch]);

  return deleteItem;
}

