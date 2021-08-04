import {
  FC, useRef, useContext, Suspense,
  useState, useEffect,
} from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { useParams } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import Page from './Page';

const MainContents: FC = () => {
  const { slug } = useParams();
  const { uid } = useContext(AuthContext);
  const ebKey = useRef(0);
  const [user, setUser] = useState('');
  const [flg, setFlg] = useState(false);

  useEffect(() => {
    // const data = uid ? uid : '';
    setUser(uid);
    setFlg(true);
  }, [uid, flg]);

  if (flg && user !== undefined && user !== '') {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<div className="spinner"></div>}>
          <Page slug={slug} uid={user} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <TimeOut />
}


const TimeOut: FC = () => {
  const [flg, setFlg] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlg(true);     
    }, 3000);
    return () => clearTimeout(timer);
  },[])

  if (flg) {
    return <div className='center'>閲覧にはログインが必要です。</div>
  }

  return <div className='spinner'></div>
}

export default MainContents;
