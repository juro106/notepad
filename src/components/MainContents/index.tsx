import {
  FC, useRef, Suspense,
  useState, useEffect,
} from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { useParams } from 'react-router';
import Page from './Page';

const MainContents: FC = () => {
  const { slug } = useParams();
  const ebKey = useRef(0);
  const [user, setUser] = useState('');
  const [flg, setFlg] = useState(false);

  useEffect(() => {
    const u = process.env.REACT_APP_DEFAULT_USER;
    if (u) {
      setUser(u);
      setFlg(true);
    }
  }, [flg]);

  if (flg && user !== undefined && user !== '') {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<p>...Loading</p>}>
          <Page slug={slug} uid={user} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <div className='spinner'></div>
}

export default MainContents;

