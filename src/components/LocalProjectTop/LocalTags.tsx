import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagNum } from 'models/content';
import ContentsListHeader from 'components/common/ContentsListHeader';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import { useLayout } from 'hooks/useLayout';
import { useFetchTags } from 'hooks/useFetchTags';
import { useDeleteTags } from 'hooks/useDeleteTags';
import TrashAndCancel from 'components/Button/TrashAndCancel';

const LocalTags: FC = memo(() => {
  const title = 'タグ一覧';
  const data = useFetchTags();

  return (
    <LocalPageOuter title={title} suspense={true}>
      <main>
        <Visuallyhidden children={title} />
        <ContentsListHeader />
        {/* <Fetch />*/}
        {data && <List list={data} />}
      </main>
    </LocalPageOuter>
  );
});

const List: FC<{ list: TagNum[] }> = memo(({ list }) => {
  const { grid } = useLayout();

  if (list && list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {list.map(tag => (
          <Item key={`${tag.name}`} tag={tag} />
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
});

const Item: FC<{ tag: TagNum }> = memo(({ tag }) => {
  const { grid } = useLayout();
  const [isCancel, setIsCancel] = useState(false);
  const deleteItem = useDeleteTags();

  return (
    <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
      <Link to={`/local/${tag.project}/${tag.name}`} className={grid ? 'grid-item-link-tag' : "edit-item-link-tag"}>
        <div className="edit-list-tag-title">{tag.name}</div>
        <div className="edit-list-tag-number">({tag.number})</div>
      </Link>
      {tag.number === 0 &&
        <>
          {isCancel && <MiniToastWarning slug={tag.name} deleteFunc={deleteItem} />}
          <TrashAndCancel isCancel={isCancel} setIsCancel={setIsCancel} />
        </>
      }
    </li>
  );
});

export default LocalTags;

