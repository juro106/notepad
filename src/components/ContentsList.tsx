import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import deleteContent from 'services/delete-content';
import { useQuery } from 'react-query';
import getContentsAll from 'services/get-contents-all';
import TrashIcon from 'components/TrashIcon';


const ContentsList: FC<{ project: string }> = ({ project }) => {
  const [list, setList] = useState<Content[] | undefined>(undefined);
  const { data } = useQuery(['project-contents'], () => getContentsAll(project));

  useEffect(() => {
    setList(data);
  }, [data])

  // console.log(param);
  const deleteItem = async (slug: string) => {
    console.log('deleteItem!!!!');
    list && setList(list.filter(item => item.slug !== slug));
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }

  if (list) {
    return (
      <ul className="item-list">
        {list.map(v => (
          v.content.length > 0
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
  }

  return (
    <div className='info-nocontent'>
      <p>メモがありません</p>
      <Link to='/home'>Homeへ戻る</Link>
    </div>
  );
}

export default ContentsList;

