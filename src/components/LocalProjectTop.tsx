import {
  FC,
  useRef,
  Suspense,
  useContext,
  useState,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext, useProjectContext } from 'contexts/projectContext';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TimeOut from 'components/TimeOut';

const LocalProjectTop: FC = () => {
  const [param, setParam] = useState<string | undefined>(undefined);
  const ebKey = useRef(0);
  const { currentUser } = useContext(AuthContext);
  const ctx = useProjectContext();
  const { project } = useContext(ProjectContext);
  const { projectName } = useParams();

  // const param = project ? project : projectName;
  // 直接アクセスした場合、URLのパラメーターからカレントプロジェクトを設定する
  useEffect(() => {
    if (!project) {
      ctx.setCurrentProject(projectName);
    }
    setParam(projectName);
  }, [project, ctx, projectName, param])

  if (currentUser && param) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>{param}</title>
          <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <ErrorBoundary key={ebKey.current}>
          <Suspense fallback={<div className="spinner"></div>}>
            <main>
              <ContentsList param={param} />
            </main>
          </Suspense>
        </ErrorBoundary>
      </HelmetProvider>
    );
  } else {
    return <TimeOut />
  }
}

const ContentsList: FC<{ param: string }> = ({ param }) => {
  // console.log(param);
  const { data } = useQuery([param], () => getContentsAll(param));

  if (data && data.length > 0) {
    return (
      <div className="related-contents">
        <ul className="item-list">
          {data.map((v, k) => (
            v.content.length > 0
              ?
              <li key={`p_${k}`} className='item'>
                <Link to={`/local/${param}/${v.slug.trim()}`} className="item-link">
                  <div className="item-title">{v.title}</div>
                  <div className="item-dscr">
                    {v.updated_at ? `${v.updated_at}: ` : ''}
                    {v.content.slice(0, 80)}
                  </div>
                </Link>
              </li>
              : ''
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }
}

export default LocalProjectTop;

