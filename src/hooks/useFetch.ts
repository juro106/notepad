import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ProjectContext } from 'contexts/projectContext';
import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';

const useFetch = async() => {
  const { project } = useContext(ProjectContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { data } = await useQuery(['contents-all', project, isLoggedIn ? "local" : 'public'], () => getContentsAll(project, !isLoggedIn ));

  return data;
}

export default useFetch;

