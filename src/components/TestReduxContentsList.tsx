import { FC, useState, memo, Suspense } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import { useLayout } from 'hooks/useLayout';
import { useProject } from 'hooks/useProject';
import MiniToastWarning from 'components/Local/MiniToastWarning';

import ContentsListHeader from 'components/common/ContentsListHeader';
import Spinner from 'components/common/Spinner';

// additional
import { useDeleteItem } from 'hooks/useDeleteItem';
import TrashAndCancel from 'components/Button/TrashAndCancel';
import { useFetch } from 'hooks/useFetch';


/* 
 * なるべく redux でやろうというかバケツリレー回避によるメンテナンスのしやすさを求めるている版
 * 
*/
const TestReduxContentsList: FC = memo(() => {
  const data = useFetch('contentsAll');

  return (
    <main>
      <ContentsListHeader />
      <Suspense fallback={<Spinner />}>
       {data && <List list={data} />}
      </Suspense>
    </main>
  );
});

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

  // 自分が消すボタンに変身すれば良い。
  // deletefuncも 子が slug さえ貰えば良い話なので、ここで親から渡す必要はない？ まだ必要
  const deleteItem = useDeleteItem();

  if (tags && tags.length > 0) {
    return (
      <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${projectDir}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className="item-title">{title}</div>
          <ul className="tag-list">
            {tags.map((tag, tkey) => (
              <li key={`tag_${tkey}`} className="tag-item">{tag}</li>
            ))}
          </ul>
          <div className="item-dscr">
            {updated_at ? `${updated_at.slice(0, 10)}: ` : ''}
            {content.slice(0, 80)}
          </div>
        </Link>
        {isCancel && <MiniToastWarning slug={slug} deleteFunc={deleteItem} />}
        <TrashAndCancel isCancel={isCancel} setIsCancel={setIsCancel} />
      </li>
    );
  }

  return <></>;
}
// <div className={isToast ? 'hidden' : grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsToast(!isToast)}>

export default TestReduxContentsList;

