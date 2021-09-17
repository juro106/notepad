import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setProject } from 'ducks/project/actions';
import { useResetData } from 'hooks/useResetData';

export const useSetProject = (): (arg: string)=>void => {
  const dispatch = useDispatch();
  const dispatchReset = useResetData();

  const setCurrentProject = useCallback((arg: string) => {
    dispatch(setProject(arg));
    dispatchReset();

  }, [dispatch, dispatchReset]);

  return setCurrentProject 
}

