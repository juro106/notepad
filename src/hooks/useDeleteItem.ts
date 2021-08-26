import { useCallback } from 'react';
import { useProject } from 'hooks/useProject';
import { useDispatch } from 'react-redux';
import deleteContent from 'services/delete-content';
import { deleteContents } from 'ducks/contents/actions';

export const useDeleteItem = () => {
  const project = useProject();
  const dispatch = useDispatch();
  
  const deleteItem = useCallback(async (slug: string) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteContents(slug))
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }, [project, dispatch]);

  return deleteItem;
}

