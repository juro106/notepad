import { FC, useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from 'ErrorBoundary';
import Spinner from 'components/common/Spinner';

// ローカルページ共通部分
type Props = {
  title: string;
  children: React.ReactElement;
  suspense?: boolean
}

const LocalPageOuter: FC<Props> = ({ title, children, suspense }) => {
  const ebKey = useRef(0);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='robots' content='noindex nofollow' />
      </Helmet>
      {suspense
        ?
        <ErrorBoundary key={ebKey.current}>
          <Suspense fallback={<Spinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
        :
        children}
    </>
  );
}
// const LocalPageOuter: FC<Props> = ({ title, children, suspense }) => {
//   const [projectAfter, setProjectAfter] = useState<string | undefined>(undefined);
//   const ebKey = useRef(0);
//   const { currentUser } = useContext(AuthContext);
//   const  project  = useProject();
//   const  setCurrentProject = useSetProject();
//   const { projectName } = useParams(); // App.tsx のreact-routerで設定している url ':xxxx' の部分。ここでは projectName
//
//   // 直接アクセスした場合、URLのパラメーターからカレントプロジェクトを設定する
//   useEffect(() => {
//     if (!project) {
//       setCurrentProject(projectName);
//     }
//     setProjectAfter(projectName);
//     window.scrollTo(0, 0);
//   }, [project, projectName, projectAfter, setCurrentProject])
//
//   if (currentUser && projectAfter) {
//     return (
//       <>
//         <Helmet>
//           <title>{title}</title>
//           <meta name='robots' content='noindex nofollow' />
//         </Helmet>
//         {suspense ?
//           <ErrorBoundary key={ebKey.current}>
//             <Suspense fallback={<Spinner />}>
//               {children}
//             </Suspense>
//           </ErrorBoundary>
//           : children}
//       </>
//     );
//   } else {
//     return <TimeOut />
//   }
// }

export default LocalPageOuter;

