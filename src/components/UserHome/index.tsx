import {
  FC, useContext,
  useRef,
  useState,
  useEffect,
  Suspense,
} from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import Projects from './Projects';

const UserHome: FC = () => {
  const { loading, isLoggedIn, isLoaded } = useContext(AuthContext);
  console.log("loading: ", loading);
  console.log("isLoaded: ", isLoaded);

  // プロジェクト一覧の読み込み
  if (isLoggedIn && isLoaded) {
    return <Page />;
  } else if (!isLoaded) {
    return <div className='spinner'></div>;
  }

  return <main><h1>Hi People!!</h1></main>;
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
      <main>
        <p>こんにちは！ {user}さん。ようこそ！</p>

        <ErrorBoundary key={`eb_1_${ebKey.current}`}>
          <Suspense fallback={<div className='spinner'></div>}>
            <Projects />
          </Suspense>
        </ErrorBoundary>
      </main>
    );
  }

  return <div className='spinner'></div>;
}

export default UserHome;
