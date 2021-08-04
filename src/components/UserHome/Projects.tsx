import {
  FC,
  Suspense,
} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import getProjects from 'services/get-projects';

const Projects: FC = () => {

  const { data } = useQuery(['projects'], () => getProjects());

  return (
    <>
      <h1>テーブル一覧</h1>
      <Link to='/newproject'>テーブル新規作成</Link>
      <Suspense fallback={<div className="spinner"></div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}

const List: FC<{ data: string[] | undefined }> = ({ data }) => {
  if (data) {
    return (
      <ul>
        {data.map((v, k)=> (
          <li key={k}>{v}</li>
        ))}
      </ul>
    );
  }
  return <div>テーブルがありません</div>
}

export default Projects;

