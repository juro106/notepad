import { FC, memo, useRef, useContext, Suspense,
  // useState, 
  useEffect,
} from 'react';
import { useParams } from 'react-router';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext, useProjectContext } from 'contexts/projectContext';
import { ImgSelectProvider } from 'contexts/imgSelectContext';
import TimeOut from 'components/Local/TimeOut';
// import { useImgSelectContext } from 'contexts/imgSelectContext';
import Page from './Page';
import Spinner from 'components/common/Spinner';

const MainContents: FC = memo(() => {
  const { slug, projectName } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  const ctx = useProjectContext();
  const ebKey = useRef(0);

  // 直接アクセスした場合、URLのパラメーターからカレントプロジェクトを設定する
  useEffect(() => {
    if (!project) {
      ctx.setCurrentProject(projectName);
    }
  }, [project, ctx, projectName])

  // useEffect(() => {
  //   let abortCtrl = new AbortController();
  //   return () => {
  //     abortCtrl.abort();
  //   }
  // }, [slug]);

  if (currentUser && slug && projectName) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<Spinner />}>
        <ImgSelectProvider>
          <Page slug={slug} project={projectName} />
        </ImgSelectProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <TimeOut />
});

export default MainContents;

