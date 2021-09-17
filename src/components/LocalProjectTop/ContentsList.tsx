import { FC, useState } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import { useLayout } from 'hooks/useLayout';
import { useFetch } from 'hooks/useFetch';
import { useProject } from 'hooks/useProject';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import { useDeleteContentsOnList } from 'hooks/useDeleteContentsOnList';
import TrashAndCancel from 'components/Button/TrashAndCancel';

const ContentsList: FC = () => {
  const list = useFetch('contents-all');

  if (list) {
    return <List list={list} />
  }

  return <></>
}

const List: FC<{ list: Content[] }> = ({ list }) => {
  const { grid } = useLayout();

  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {list.map(v => (
          <Item key={v.slug} data={v} />
        ))}
      </ul>
    )
  } else if (list.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/local/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <></>
}

const Item: FC<{ data: Content }> = ({ data }) => {
  const { title, slug, updated_at, tags, project, content } = data;
  const { grid } = useLayout();
  const currentProject = useProject();
  const projectDir = project ? project : currentProject;

  const [isCancel, setIsCancel] = useState(false);
  const deleteItem = useDeleteContentsOnList();

  if (tags && tags.length > 0) {
    return (
      <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${projectDir}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className={grid ? 'item-content-grid' : 'item-content'}>
            <div className="item-title">{title}</div>
            <ul className="tag-list">
              {tags.map((tag, tkey) => (
                <li key={`tag_${tkey}`} className="tag-item">{tag}</li>
              ))}
            </ul>
            <div className="item-dscr">
              {updated_at && `${updated_at.slice(0, 10)}: `}
              {content.slice(0, 80)}
            </div>
          </div>
        </Link>
        {isCancel && <MiniToastWarning slug={slug} deleteFunc={deleteItem} />}
        <TrashAndCancel isCancel={isCancel} setIsCancel={setIsCancel} />
      </li>
    );
  }

  return <></>;
}

export default ContentsList;

