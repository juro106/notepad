import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { initContents } from 'ducks/contents/actions';
import { initContentsByDate } from 'ducks/contents/actions';
import { initTags } from 'ducks/tags/actions';
import { initImages } from 'ducks/image/actions';
import { removeQueries } from 'services/removeQueries';
import { useProject } from 'hooks/useProject';

export const useResetData = () => {
  const project = useProject();
  const dispatch = useDispatch();

  const dispatchReset = useCallback((slug?: string) => {
    const slugText = slug ? slug : undefined;

    dispatch(initContents());
    dispatch(initTags());
    dispatch(initContentsByDate());
    dispatch(initImages());
    console.log('resetQueries');
    removeQueries(project, slugText);
  },[dispatch, project]);

  return dispatchReset;
}

