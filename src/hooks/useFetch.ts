import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useProject } from 'hooks/useProject';
import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';

const useFetch = async() => {
  const project = useProject();
  const { isLoggedIn } = useContext(AuthContext);
  const { data } = await useQuery(['contents-all', project, isLoggedIn ? "local" : 'public'], () => getContentsAll(project, !isLoggedIn ));

  return data;
}

export default useFetch;

