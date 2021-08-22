import {
  FC, useContext,
  useRef,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import ProjectSelector from 'components/Project/ProjectSelector';
import Spinner from 'components/common/Spinner';
import Menu from './Menu';

const LocalHome: FC = () => {
  const { loading, isLoggedIn, isLoaded } = useContext(AuthContext);
  console.log("loading: ", loading);
  console.log("isLoaded: ", isLoaded);

  if (isLoggedIn && isLoaded) {
    return <Page />;
  } else if (!isLoaded) {
    return <div className='loading'><p>...Loading</p><Spinner /></div>;
  } else {
    return <main><h1 className='hi-people'>Hi People!!</h1></main>;
  }
}

const Page: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { project } = useContext(ProjectContext)
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const [isEmptyProject, setIsEmptyProject] = useState<boolean>(true);
  const ebKey = useRef(0);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.displayName);
    }
    if (project) {
      setIsEmptyProject(false); 
    }
  }, [currentUser, project])

  if (user) {
    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <main className='user-home'>
          <header className='user-home-header'>
            <h1 className='visuallyhidden'>Sasa-box UserHome</h1>
            {isEmptyProject && <div className='info'><p className='red'>プロジェクト選択してください</p></div>}
          </header>
          <ErrorBoundary key={`eb_1_${ebKey.current}`}>
            <Suspense fallback={<Spinner />}>
              <ProjectSelector />
            </Suspense>
          </ErrorBoundary>
            {!isEmptyProject && <Menu />}
        </main>
      </>
    );
  }

  return <Spinner />;
}

export default LocalHome;
