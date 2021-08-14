import { FC, useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import getTags from 'services/get-tags';
import { ProjectContext } from 'contexts/projectContext';
import ListSwitcher from 'components/ListSwitcher';
import LocalPageOuter from 'components/LocalPageOuter';

const Tags: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <LocalPageOuter title={'タグ一覧'}>
      <main>
        <ListSwitcher />
        <h1>タグ一覧</h1>
        <ContentsList project={project} />
      </main>
    </LocalPageOuter>
  );
}

const ContentsList: FC<{ project: string }> = ({ project }) => {
  const { data } = useQuery(['tags'], () => getTags(project));

  if (data && data.length > 0) {
    return (
        <ul className="item-list">
          {data.map((tag, k) => (
            <li key={`p_${k}`} className='edit-list-item'>
              <Link to={`/local/${project}/${tag.name}`} className="edit-item-link-tag">
                <div className="edit-list-tag-title">{tag.name}</div>
                <div className="edit-list-tag-number">({tag.number})</div>
              </Link>
            </li>
          ))}
        </ul>
    )
  } else {
    return (
      <div className='info-nocontent'>
        <p>タグがありません</p>
      </div>
    );
  }
}

export default Tags;

