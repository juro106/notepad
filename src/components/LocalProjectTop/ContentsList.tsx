import { FC, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import { useQuery } from 'react-query';
import deleteContent from 'services/delete-content';
import getContentsAll from 'services/get-contents-all';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import { useLayout } from 'hooks/useLayout';
// import { useSelector } from 'store';

const ContentsList: FC<{ project: string }> = ({ project }) => {
  const [list, setList] = useState<Content[] | undefined>(undefined);
  const { data } = useQuery(['contents-all', project], () => getContentsAll(project, true));

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
    return <List list={list} deleteItem={deleteItem} />
  }

  return <></>
}

const List: FC<{ list: Content[], deleteItem: (arg: string) => void }> = ({ list, deleteItem }) => {
  const { grid } = useLayout();
  // const grid = useSelector(state=>state.layout.grid);

  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {list.map(v => (
          <Item key={v.slug} v={v} deleteItem={deleteItem} />
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

const Item: FC<{ v: Content, deleteItem: (arg: string) => void }> = ({ v, deleteItem }) => {
  const { grid } = useLayout();
  // const grid = useSelector(state=>state.layout.grid);
  const { title, slug, updated_at, tags, project, content } = v;
  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  if (tags && tags.length > 0) {
    return (
      <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className="item-title">{title}</div>
          <div className="item-dscr">
            {updated_at ? `${updated_at.slice(0, 10)}: ` : ''}
            {content.slice(0, 80)}
          </div>
        </Link>
        <MiniToastWarning
          itemName={title}
          slug={slug}
          isToast={isToast}
          closeToast={closeToast}
          deleteFunc={deleteItem}
          grid={grid}
        />
        <div className={isToast ? 'hidden' : grid ? 'delete-button-grid': 'delete-button'} onClick={() => setIsToast(true)}>
          <TrashIcon />
        </div>
      </li>
    );
  }

  return <></>;
}

export default ContentsList;

