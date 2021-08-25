import { FC, useState, memo, Suspense } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { Content } from 'models/content';
import getContentsAll from 'services/get-contents-all';
import { useLayout } from 'hooks/useLayout';
import { useProject } from 'hooks/useProject';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';

import ContentsListHeader from 'components/common/ContentsListHeader';
import Spinner from 'components/common/Spinner';

// additional
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { initContents } from 'ducks/contents/actions';
import { useDeleteItem } from 'hooks/useDeleteItem';


/* 
 * なるべく redux でやろうというかバケツリレー回避によるメンテナンスのしやすさを求めるている版
 * 
*/
const TestReduxContentsList: FC = memo(() => {
  return (
    <main>
      <ContentsListHeader />
      <Suspense fallback={<Spinner />}>
        <ContentsList />
      </Suspense>
    </main>
  );
});

const ContentsList: FC = () => {
  const project = useProject();
  // const [list, setList] = useState<Content[] | undefined>(undefined);
  //
  // まずは store のデータを見に行く。
  const initData: Content[] = useSelector(state => state.contents.contents);

  // DB の取得もする（1回取得すればキャッシュしてくれる）
  const { data } = useQuery(['contents-all----', project], () => getContentsAll(project, true));

  // storeにデータがない && DB のデータがあるなら store へ dispatch 
  const dispatch = useDispatch();
  if (initData.length < 1 && data) dispatch(initContents(data));

  console.log('dispatch, initContents');
  console.log('select, initData');

  if (initData && initData.length > 0) {
    console.log('use store data.');
    return <List list={initData} />
  } else if (data) {
    return <List list={data} />
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

  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  // 自分が消すボタンに変身すれば良い。
  // deletefuncも 子が slug さえ貰えば良い話なので、ここで親から渡す必要はない？
  const deleteItem = useDeleteItem(slug);

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
        {isToast && <MiniToastWarning slug={slug} closeToast={closeToast} deleteFunc={deleteItem} />}
        <div className={isToast ? 'hidden' : grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsToast(true)}>
          <TrashIcon />
        </div>
      </li>
    );
  }

  return <></>;
}

export default TestReduxContentsList;

