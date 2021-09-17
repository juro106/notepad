import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSetProject } from 'hooks/useSetProject';
import {
  addProject as addProjectAction,
  removeProject as removeProjectAction,
  initProjects as initProjectsAction,
} from 'ducks/project/actions';

export const useHandleProject = () => {
  const dispatch = useDispatch();
  const setCurrentProject = useSetProject();

  const initProjects = useCallback(() => {
    dispatch(initProjectsAction());
  }, [dispatch])

  const addProject = useCallback((name: string) => {
    dispatch(addProjectAction(name));
  }, [dispatch])

  const removeProject = useCallback((name: string) => {
    dispatch(removeProjectAction(name));
    setCurrentProject('');
  }, [dispatch, setCurrentProject])

  return { addProject, removeProject, initProjects };
}
