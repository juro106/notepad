import {
  FC,
  memo,
  useContext,
  // Suspense,
} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { ProjectContext } from 'contexts/projectContext';
import { useProjectContext } from 'contexts/projectContext';
import getProjects from 'services/get-projects';

type Props = {
  data?: string[] | undefined;
  refer?: string;
  changeState?: (arg: boolean) => void;
}

const ProjectSelector: FC<Props> = memo(({ refer, changeState }) => {

  return (
    <div className='projects-block'>
      <ProjectList refer={refer} changeState={changeState} />
    </div>
  );
});

const ProjectList: FC<Props> = memo(({ refer, changeState }) => {
  const ctx = useProjectContext();
  const navigate = useNavigate();
  const { project } = useContext(ProjectContext)

  const { data } = useQuery(['projects'], () => getProjects());

  const handleClick = (arg: string) => {
    ctx.setCurrentProject(arg); // Context(現在のProject)の値を更新
    refer && navigate(`/${refer}`);
    changeState && changeState(true); // flg=ture <-再読込 & setIsEmptyProject=false <-自明なので問答無用で処理
  }

  if (data) {
    return (
      <ul className='project-list'>
        {data.map((v, k) => (
          <li className='project-item' onClick={() => handleClick(v)} key={k}>
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

