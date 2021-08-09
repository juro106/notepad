import {
  FC, useRef, useContext, Suspense,
  useState, useEffect,
} from 'react';
import { useParams } from 'react-router';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext, useProjectContext } from 'contexts/projectContext';
// import { useImgSelectContext } from 'contexts/imgSelectContext';
import Page from './Page';

const MainContents: FC = () => {
  const [param, setParam] = useState<string | undefined>(undefined);
  const { slug, projectName } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  const ctx = useProjectContext();
  const ebKey = useRef(0);
  // const imgCtx = useImgSelectContext();

  // useEffect(() => {
  //   imgCtx.setCurrentImgURL('');
  // }, [slug])
  // const history = window.history;
  // console.log(history.scrollRestoration);
  // useEffect(() => {
  //   if (history.scrollRestoration) {
  //     history.scrollRestoration = 'manual';
  //   }
  //   console.log('scroll!!!');
  // }, [history]);


  // 直接アクセスした場合、URLのパラメーターからカレントプロジェクトを設定する
  useEffect(() => {
    if (!project) {
      ctx.setCurrentProject(projectName);
    }
    setParam(projectName);
  }, [project, ctx, projectName, param])

  if (currentUser && param) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<div className="spinner"></div>}>
          <Page slug={slug} project={param} />
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
  }, [])

  if (flg) {
    return <div className='center'>閲覧にはログインが必要です。</div>
  }

  return <div className='spinner'></div>
}

export default MainContents;

