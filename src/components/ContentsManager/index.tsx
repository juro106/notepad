import {
  FC,
  useRef,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useProject } from 'hooks/useProject';
import ErrorBoundary from 'ErrorBoundary';
import getContentsAll from 'services/get-contents-all';
import { Content } from 'models/content';
import Page from './Page';
import PageTitle from 'components/Heading/PageTitle';
import Spinner from 'components/common/Spinner';

const ContentsManager: FC = () => {
  const [data, setData] = useState<Content[] | undefined>(undefined);
  const [flg, setFlg] = useState<boolean>(false);
  const project = useProject();
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
          <Suspense fallback={<Spinner />}>
            <PageTitle>メモを編集</PageTitle>
            <Page data={data} project={project} changeState={changeState} />
          </Suspense>
        </main>
      </ErrorBoundary>
    </>
  );
}

export default ContentsManager;

