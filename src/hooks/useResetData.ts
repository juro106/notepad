import { useDispatch } from 'react-redux';
import { initContents } from 'ducks/contents/actions';
import { initTags } from 'ducks/tags/actions';
import { removeQueries } from 'services/removeQueries';
import { useProject } from 'hooks/useProject';

export const useResetData = () => {
  const project = useProject();
  const dispatch = useDispatch();

  const dispatchReset = (slug?: string) => {
    const slugText = slug ? slug : '';

    dispatch(initContents());
    dispatch(initTags());
    console.log('resetQueries');
    removeQueries(project, slugText);
  }

  return dispatchReset;
}

