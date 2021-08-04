import {
  FC,
  useRef,
  useContext,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import ErrorBoundary from 'ErrorBoundary';
import getContentsAll from 'services/get-contents-all';
import { Content } from 'models/content';
import Page from './Page';

const Edit: FC = () => {
  const [data, setData] = useState<Content[] | undefined>(undefined)
  const [flg, setFlg] = useState<boolean>(false)
  const { uid } = useContext(AuthContext);
  const ebKey = useRef(0);

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }


  useEffect(() => {
    const fetch = async () => {
      if (uid !== '') {
        const d = await getContentsAll({ uid })
        setData(d);
      }
    }
    fetch();
  }, [uid])

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      const d = await getContentsAll({ uid })
      setData(d);
    }
    if (flg) {
      fetch();
    }
    return () => {
      setFlg(false);
      abortCtrl.abort();
    }
  }, [flg, uid])

  return (
    <ErrorBoundary key={ebKey.current}>
      <Suspense fallback={<div className="spinner"></div>}>
        <HelmetProvider>
          <Helmet>
            {uid ? <meta name='robots' content='noindex nofollow' /> : ''}
          </Helmet>
        </HelmetProvider>
        <Page data={data} uid={uid} changeState={changeState} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Edit;
