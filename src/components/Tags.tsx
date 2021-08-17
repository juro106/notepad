import { FC, useState, useEffect, useContext, Suspense } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import getTags from 'services/get-tags';
import deleteContent from 'services/delete-content';
import { TagNum } from 'models/content';
import { ProjectContext } from 'contexts/projectContext';
import ListSwitcher from 'components/ListSwitcher';
import LocalPageOuter from 'components/LocalPageOuter';
import TrashIcon from 'components/Button/TrashIcon';

const Tags: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <LocalPageOuter title={'タグ一覧'}>
      <main>
        <ListSwitcher />
        <h1>タグ一覧</h1>
        <Suspense fallback={<div className="spinner"></div>}>
          <ContentsList project={project} />
        </Suspense>
      </main>
    </LocalPageOuter>
  );
}

const ContentsList: FC<{ project: string }> = ({ project }) => {
  const [list, setList] = useState<TagNum[] | undefined>(undefined);
  const { data } = useQuery(['tags'], () => getTags(project));

  useEffect(() => {
    setList(data);
  }, [data])

  const deleteItem = async (slug: string) => {
    console.log('deleteItem!!!!');
    list && setList(list.filter(item => item.name !== slug));
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }

  if (list && list.length > 0) {
    return (
      <ul className="item-list">
        {list.map((tag, k) => (
          <li key={`p_${k}`} className='edit-list-item'>
            <Link to={`/local/${project}/${tag.name}`} className="edit-item-link-tag">
              <div className="edit-list-tag-title">{tag.name}</div>
              <div className="edit-list-tag-number">({tag.number})</div>
            </Link>
            {tag.number === 0 &&
              <div className='delete-button' onClick={() => deleteItem(tag.name)}>
                <TrashIcon />
              </div>
            }
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

