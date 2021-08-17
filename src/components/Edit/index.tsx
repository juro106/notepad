import {
  FC,
  useRef,
  useContext,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { ProjectContext } from 'contexts/projectContext';
import ErrorBoundary from 'ErrorBoundary';
import getContentsAll from 'services/get-contents-all';
import { Content } from 'models/content';
import Page from './Page';

const Edit: FC = () => {
  const [data, setData] = useState<Content[] | undefined>(undefined);
  const [flg, setFlg] = useState<boolean>(false);
  const { project } = useContext(ProjectContext);
  const ebKey = useRef(0);

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }

  // 初回
  useEffect(() => {
    const fetch = async () => {
      const d = await getContentsAll(project);
      setData(d);
    }
    fetch();
  }, [project])

  // 2回目移行（消去して変化があったとき）
  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      const d = await getContentsAll(project);
      setData(d);
    }
    if (flg) {
      fetch();
    }
    return () => {
      setFlg(false);
      abortCtrl.abort();
    }
  }, [flg, project])

  useEffect(() => {
    let abortCtrl = new AbortController();
    window.scrollTo(0, 0);
    return () => {
      abortCtrl.abort();
    }
  }, []);

    return (
      <>
        <Helmet>
              <title>Edit</title>
              <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <ErrorBoundary key={ebKey.current}>
          <main>
            <Suspense fallback={<div className="spinner"></div>}>
              <h1 id='page-title'>メモを編集</h1>
              <Page data={data} project={project} changeState={changeState} />
            </Suspense>
          </main>
        </ErrorBoundary>
      </>
    );
}

export default Edit;
