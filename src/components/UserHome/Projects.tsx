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

const Projects: FC<Props> = ({ refer, changeState }) => {
  const { data } = useQuery(['projects'], () => getProjects());

  return (
    <div className='projects-block'>
      <h2 className='menu-heading'>あなたのプロジェクト一覧</h2>
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
    changeState && changeState(true); // flg=ture <-再読込 & setIsEmptyProject=false <-自明なので問答無用で処理
  }

  if (data) {
    return (
      <ul className='project-list'>
        {data.map((v, k) => (
          <li className='project-item' onClick={() => handleClick(v)} key={k}>
            {refer
              ? <Link className='project-link' to={`/${refer}`}>{v}</Link>
              : <Link className='project-link' to={`/local/${v}/`}>{v}</Link>
            }
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <p>プロジェクトがありません。</p>
      <Link className='menu-sub-link' to='/newproject'>＋ 新規プロジェクト作成</Link>
    </div>
  );
}

export default Projects;

