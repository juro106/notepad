import {
  FC,
  Suspense,
} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import getProjects from 'services/get-projects';
import { useProjectContext } from 'contexts/projectContext';

type Props = {
  data?: string[] | undefined;
  refer?: string;
  changeState?: (arg: boolean) => void;
}

const Projects: FC<Props> = ({refer, changeState}) => {
  const { data } = useQuery(['projects'], () => getProjects());

  return (
    <div className='projects-block'>
      <h1>プロジェクト一覧</h1>
      <Link to='/newproject'>＋ 新規プロジェクト作成</Link>
      <Suspense fallback={<div className="spinner"></div>}>
        <List data={data} refer={refer} changeState={changeState} />
      </Suspense>
    </div>
  );
}

const List: FC<Props> = ({ data, refer, changeState }) => {
  const ctx = useProjectContext();
  const navigate = useNavigate();
  const handleClick = (arg: string) => {
    ctx.setCurrentProject(arg); // Context(現在のProject)の値を更新
    refer && navigate(`/${refer}`);
    changeState && changeState(true); // flg -> ture & setIsEmptyProject -> false
  }

  if (data) {
    return (
      <ul className='project-list'>
        {data.map((v, k)=> (
          <li className='project-item' onClick={() => handleClick(v)} key={k}>
            {refer
              ? <span className='project-link'>{v}</span>
              : <Link className='project-link' to={`/local/${v}/`}>{v}</Link>
            }
          </li>
        ))}
      </ul>
    );
  }
  return <div>プロジェクトがありません</div>
}

export default Projects;

