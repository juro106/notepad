import { FC, memo, } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useProject } from 'hooks/useProject';
import { useSetProject } from 'hooks/useSetProject';
import { useResetData } from 'hooks/useResetData';
import getProjects from 'services/get-projects';

type Props = {
  data?: string[] | undefined;
  refer?: string;
}

const ProjectSelector: FC<Props> = memo(({ refer }) => {
  const { data } = useQuery(['projects'], () => getProjects());

  return (
    <div className='projects-block'>
      <ProjectList data={data} refer={refer} />
    </div>
  );
});

const ProjectList: FC<Props> = memo(({ data, refer }) => {
  const project = useProject();
  const setCurrentProject = useSetProject();
  const navigate = useNavigate();
  const dispatchReset = useResetData();

  const handleClick = (arg: string) => {
    setCurrentProject(arg); // redux (現在のProject)の値を更新
    refer && navigate(`/${refer}`);
    dispatchReset();
  }

  if (data && data.length > 0) {
    return (
      <ul className='project-list'>
        {data.map((v, k) => (
          <li key={k} className='project-item' onClick={() => handleClick(v)}>
            <Link
              className={project === v ? 'project-link-current' : 'project-link'}
              to={refer ? `/${refer}` : `/local/${v}/`}
            >
              {v}
            </Link>
          </li>
        ))}
        <li className='menu-sub-item'>
          <Link className='menu-sub-link' to='/local/new-project'>＋ 新規プロジェクト作成</Link>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <p>プロジェクトがありません。</p>
      <Link className='menu-sub-link' to='/local/new-project'>＋ 新規プロジェクト作成</Link>
    </div>
  );
});

export default ProjectSelector;

