import {
  FC, useContext,
  useRef,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import Projects from './Projects';
import Menu from 'components/Menu';

const UserHome: FC = () => {
  const { loading, isLoggedIn, isLoaded } = useContext(AuthContext);
  console.log("loading: ", loading);
  console.log("isLoaded: ", isLoaded);

  if (isLoggedIn && isLoaded) {
    return <Page />;
  } else if (!isLoaded) {
    return <div className='spinner'></div>;
  } else {
    return <main><h1 className='hi-people'>Hi People!!</h1></main>;
  }
}

const Page: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const ebKey = useRef(0);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.displayName);
    }
  }, [currentUser])

  if (user) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
          <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <main className='user-home'>
          <header className='user-home-header'>
          <h1 id='page-title'>Welcome!!!</h1>
          <p>こんにちは！ {user}さん。</p>
          <p>まずはプロジェクトを選択してください。</p>
          </header>
          <ErrorBoundary key={`eb_1_${ebKey.current}`}>
            <Suspense fallback={<div className='spinner'></div>}>
              <Projects />
            </Suspense>
          </ErrorBoundary>
          <Menu />
        </main>
      </HelmetProvider>
    );
  }

  return <div className='spinner'></div>;
}

export default UserHome;
