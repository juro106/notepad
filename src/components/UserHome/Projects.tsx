import {
  FC,
  Suspense,
} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import getProjects from 'services/get-projects';
import { useProjectContext } from 'contexts/projectContext';

const Projects: FC = () => {

  const { data } = useQuery(['projects'], () => getProjects());

  return (
    <>
      <h1>プロジェクト一覧</h1>
      <Link to='/newproject'>＋ プロジェクト新規作成</Link>
      <Suspense fallback={<div className="spinner"></div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}

const List: FC<{ data: string[] | undefined }> = ({ data }) => {
  const ctx = useProjectContext();
  const handleClick = (arg: string) => {
    ctx.setCurrentProject(arg); // Context(現在のProject)の値を更新
  }
  if (data) {
    return (
      <ul className='project-list'>
        {data.map((v, k)=> (
          <li className='project-item' onClick={() => handleClick(v)} key={k}>
            <Link className='project-link' to={`/${v}/`}>{v}</Link>
          </li>
        ))}
      </ul>
    );
  }
  return <div>プロジェクトがありません</div>
}

export default Projects;

