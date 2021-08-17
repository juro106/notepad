import { FC, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import { useQuery } from 'react-query';
import deleteContent from 'services/delete-content';
import getContentsAll from 'services/get-contents-all';
import TrashIcon from 'components/Button/TrashIcon';

const ContentsList: FC<{ project: string }> = ({ project }) => {
  const [list, setList] = useState<Content[] | undefined>(undefined);
  const { data } = useQuery(['project-contents'], () => getContentsAll(project, false));

  useEffect(() => {
    setList(data);
  }, [data])

  // console.log(param);
  const deleteItem = useCallback(async (slug: string) => {
    console.log('deleteItem!!!!');
    list && setList(list.filter(item => item.slug !== slug));
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }, [list, setList, project]);

  if (list) {
    return <List list={list} project={project} deleteItem={deleteItem} />
  }

  return <></>
}

const List: FC<{ list: Content[], project: string, deleteItem: (arg: string) => void }> = ({ list, project, deleteItem }) => {

  if (list.length > 0) {
    return (
      <ul className="item-list">
        {list.map(v => (
          v.tags && v.tags.length > 0
            ?
            <li key={`p_${v.slug}`} className='edit-list-item'>
              <Link to={`/local/${project}/${v.slug.trim()}`} className="edit-item-link">
                <div className="item-title">{v.title}</div>
                <div className="item-dscr">
                  {v.updated_at ? `${v.updated_at}: ` : ''}
                  {v.content.slice(0, 80)}
                </div>
              </Link>
              <div className='delete-button' onClick={() => deleteItem(v.slug)}>
                <TrashIcon />
              </div>
            </li>
            : ''
        ))}
      </ul>
    )
  } else if (list.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <></>
}

export default ContentsList;

