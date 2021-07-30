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
    const data = uid ? uid : '';
    setUser(data);
    setFlg(true);
  },[uid, flg]);

  if (flg && user !== undefined) {
  // if (uid) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<p>...Loading</p>}>
          <Page slug={slug} uid={user} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <></>
}

export default MainContents;
