import { 
  FC, 
  useRef, 
  useState,
  useEffect,
  Suspense,
} from 'react';

import ErrorBoundary from 'ErrorBoundary';
import getContentsAll from 'services/get-contents-all';
import { Content } from 'models/content';
import Page from './Page';

const Edit: FC = () => {
  const [data, setData] = useState<Content[] | undefined>(undefined)
  const [flg, setFlg] = useState<boolean>(false)
  const ebKey = useRef(0);

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }

  useEffect(() => {
    const fetch = async () => {
      const d = await getContentsAll()
      setData(d);
    }
    fetch();
  },[])

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      const d = await getContentsAll()
      setData(d);
    }
    if (flg) {
      fetch();
    }
    return () => {
      setFlg(false);
      abortCtrl.abort();
    }
  },[flg])

  return (
    <ErrorBoundary key={ebKey.current}>
      <Suspense fallback={<p>...loding</p>}>
        <Page data={data} changeState={changeState} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Edit;
