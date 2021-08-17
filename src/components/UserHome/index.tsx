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
import Menu from 'components/Menu';

const UserHome: FC = () => {
  const { loading, isLoggedIn, isLoaded } = useContext(AuthContext);
  console.log("loading: ", loading);
  console.log("isLoaded: ", isLoaded);

  if (isLoggedIn && isLoaded) {
    return <Page />;
  } else if (!isLoaded) {
    return <div className='loading'>...Loading<div className='spinner'></div></div>;
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
            <Suspense fallback={<div className='spinner'></div>}>
              <ProjectSelector />
            </Suspense>
          </ErrorBoundary>
            {!isEmptyProject && <Menu />}
        </main>
      </>
    );
  }

  return <div className='spinner'></div>;
}

export default UserHome;
