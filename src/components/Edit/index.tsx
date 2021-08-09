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
import { ProjectContext } from 'contexts/projectContext';
import ErrorBoundary from 'ErrorBoundary';
import getContentsAll from 'services/get-contents-all';
import { Content } from 'models/content';
import Page from './Page';
import Projcets from 'components/UserHome/Projects';

const Edit: FC = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<Content[] | undefined>(undefined);
  const [flg, setFlg] = useState<boolean>(false);
  const [isEmptyProject, setIsEmptyProject] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  const ebKey = useRef(0);

  const changeState = (arg: boolean) => {
    setFlg(arg);
    setIsEmptyProject(false);
  }

  // 初回
  useEffect(() => {
    const fetch = async () => {
      if (project !== '') {
        const d = await getContentsAll(project);
        setData(d);
      } else {
        setIsEmptyProject(true)
      }
    }
    fetch();
    setLoad(true);
  }, [project, isEmptyProject])

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
    window.scrollTo(0, 0);
    console.log('scroll');
  }, [])

  if (isLoggedIn) {
    return (
      <HelmetProvider>
        <Helmet>
          {load &&
            <>
              <title>Edit</title>
              <meta name='robots' content='noindex nofollow' />
            </>
          }
        </Helmet>
        <ErrorBoundary key={ebKey.current}>
          {isEmptyProject
            ?
            <Suspense fallback={<div className="spinner"></div>}>
              <div className='info'><p className='red'>プロジェクト選択してください</p></div>
              <Projcets refer={'edit'} changeState={changeState} />
            </Suspense>
            :
            <Suspense fallback={<div className="spinner"></div>}>
              <Page data={data} project={project} changeState={changeState} />
            </Suspense>
          }
        </ErrorBoundary>
      </HelmetProvider>
    );
  }
  return <></>
}

export default Edit;
