import { FC, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useSetProject } from 'hooks/useSetProject';
import { useWarning } from 'hooks/useWarning';
import { useFetchProjects } from 'hooks/useFetchProjects';
import { useDeleteProject } from 'hooks/useDeleteProject';
import TrashIcon from 'components/Button/TrashIcon';
import Spinner from 'components/common/Spinner';
import ToastWarning from 'components/Local/ToastWarning';

const ProjectManager: FC = () => {
  const data = useFetchProjects();

  return (
    <div className='projects-block'>
      <h1>プロジェクト管理</h1>
      <p>プロジェクトの作成、削除を行います</p>
      <Link to='/local/new-project'>＋ 新規プロジェクト作成</Link>
      <h2 className='project-manager-h2'>プロジェクト一覧</h2>
      <Suspense fallback={<Spinner />}>
        <List data={data} />
      </Suspense>
    </div>
  );
}

const List: FC<{ data: string[] | undefined }> = ({ data }) => {
  const { source, isOpen } = useWarning();
  const deleteProject = useDeleteProject();
  const caption = '※プロジェクト内のすべてのコンテンツが消去されます。'
  if (data) {
    return (
      <>
        <ul className='project-list'>
          {data.map((v, k) => (
            <ListItem key={k} v={v} />
          ))}
        </ul>
        {isOpen && <ToastWarning itemName={source} deleteFunc={deleteProject} caption={caption} />}
      </>
    );
  }
  return <div>プロジェクトがありません</div>
}

const ListItem: FC<{ v: string }> = ({ v }) => {
  const setCurrentProject = useSetProject();
  const { dispatchOpen } = useWarning();

  return (
    <li className='project-item'>
      <Link className='project-link' onClick={() => setCurrentProject(v)} to={`/local/${v}/`}>{v}</Link>
      <div className="delete-button" onClick={() => dispatchOpen(v)}>
        <TrashIcon />
      </div>
    </li>
  );
}

export default ProjectManager;

