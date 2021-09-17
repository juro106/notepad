import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSetProject } from 'hooks/useSetProject';
import { useResetData } from 'hooks/useResetData';
import { removeProject as removeProjectAction, } from 'ducks/project/actions';
import deleteProject from 'services/delete-project';

export const useDeleteProject = () => {
  const dispatch = useDispatch();
  const setCurrentProject = useSetProject();
  const resetData = useResetData();

  const removeProject = useCallback(async (name: string) => {
    dispatch(removeProjectAction(name));
    const res = await deleteProject(name);
    console.log(res);
    resetData();
    setCurrentProject('');

  }, [dispatch, resetData, setCurrentProject])

  return removeProject;
}

