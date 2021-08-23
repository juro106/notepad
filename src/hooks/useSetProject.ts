import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setProject } from 'ducks/project/actions';

export const useSetProject = (): (arg: string)=>void => {
  const dispatch = useDispatch();

  const setCurrentProject = useCallback((arg: string) => {
    dispatch(setProject(arg));
  }, [dispatch]);

  return setCurrentProject 
}

