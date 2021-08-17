import { FC, useContext, Suspense } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import ProjectSelector from 'components/Project/ProjectSelector';
import { useLocation } from 'react-router'

const ProjectFilter: FC = ({ children }) => {
  const { project } = useContext(ProjectContext);
  const pathname = useLocation().pathname;
  const pathArray = pathname.split('/');

  if (pathArray[0] === "" || pathArray[1] !== 'local') return <>{children}</>;

  if (pathname === '/local/new-project' || pathname === '/local/home' || pathArray.length > 3) return <>{children}</>;



  if (!project) {
    return (
      <>
        <div className='info'><p className='red'>プロジェクト選択してください</p></div>
        <Suspense fallback={<div className="spinner"></div>}>
          <ProjectSelector refer={pathname} />
        </Suspense>
      </>
    );
  }

  return <>{children}</>;
}

export default ProjectFilter;

