import { FC, useContext } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import ProjectSelector from 'components/Project/ProjectSelector';
import { useLocation } from 'react-router'

const ProjectFilter: FC = ({ children }) => {
  const { project } = useContext(ProjectContext);
  const pathname = useLocation().pathname;
  const pathArray = pathname.split('/');

  // if (pathArray[1] === "" // <- domain top /public/home
  if (pathArray[1] !== 'local' // not local
    || pathname === '/local/new-project' // no need to select a project
    || pathname === '/local/home'
    || pathArray.length > 3 // main contents url will be split into four or more parts  
  ) return <>{children}</>;

  if (!project) {
    return (
      <>
        <div className='info'><p className='red'>プロジェクト選択してください</p></div>
        <ProjectSelector refer={pathname} />
      </>
    );
  }

  return <>{children}</>;
}

export default ProjectFilter;

