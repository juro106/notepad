import {
  FC,
  useRef,
  Suspense,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext, useProjectContext } from 'contexts/projectContext';
import ErrorBoundary from 'ErrorBoundary';
import TimeOut from 'components/TimeOut';

// ローカルページ共通部分
type Props = {
  title: string;
  children: React.ReactElement;
}

const LocalPageOuter: FC<Props> = ({ title, children }) => {
  const [projectAfter, setProjectAfter] = useState<string | undefined>(undefined);
  const ebKey = useRef(0);
  const { currentUser } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  const ctx = useProjectContext();
  const { projectName } = useParams(); // App.tsx で設定している url :xxxx の部分。ここでは projectName

  // 直接アクセスした場合、URLのパラメーターからカレントプロジェクトを設定する
  useEffect(() => {
    if (!project) {
      ctx.setCurrentProject(projectName);
    }
    setProjectAfter(projectName);
    window.scrollTo(0, 0);
  }, [project, ctx, projectName, projectAfter])

  if (currentUser && projectAfter) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <ErrorBoundary key={ebKey.current}>
          <Suspense fallback={<div className="spinner"></div>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </HelmetProvider>
    );
  } else {
    return <TimeOut />
  }
}

export default LocalPageOuter;

