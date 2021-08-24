import { FC, Suspense, useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom'
import { Content } from 'models/content';
import { useQuery } from 'react-query';
import { queryClient } from 'index';
import { useProject } from 'hooks/useProject';
import { useEmbedDateToArray } from 'hooks/useEmbedDateToArray';
import deleteContent from 'services/delete-content';
import getContentsAll from 'services/get-contents-all';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import ContentsListHeader from 'components/common/ContentsListHeader';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import Spinner from 'components/common/Spinner';
import { useLayout } from 'hooks/useLayout';

const OrderByDate: FC = () => {
  const project = useProject();
  const title = 'コンテンツ一覧（日付順）';

  return (
    <LocalPageOuter title={title} suspense={true}>
      <main>
        <Visuallyhidden children={title} />
        <ContentsListHeader />
        <Suspense fallback={<Spinner />}>
          <Fetch project={project} />
        </Suspense>
      </main>
    </LocalPageOuter>
  );
}

const Fetch: FC<{ project: string }> = ({ project }) => {
  const { data } = useQuery(
    ['contents-all', project, { sort_by: 'created_at', order_by: 'DESC' }],
    () => getContentsAll(project, true, '?sort_by=created_at')
  );

  if (data) {
    return <ListFilter project={project} data={data} />
  }

  return <></>
}

const ListFilter: FC<{ data: Content[], project: string }> = memo(({ data, project }) => {
  const embedDateToArray = useEmbedDateToArray(data, project);
  const queryKey = ['contents-all', project, { sort_by: 'created_at', order_by: 'DESC', embed: 'date' }]
  const oldArray = queryClient.getQueryData(queryKey);
  // キャッシュがなければ配列作成
  const memoArray = oldArray ? oldArray as Content[] : embedDateToArray();

  queryClient.setQueryData(queryKey, memoArray);
  // const memoArray = useMemo(() => newArray, [newArray]);
  // const dammy =  [{ user: '', title: '', content: '', project: '', slug: '', created_at: '' }]

  const [list, setList] = useState<Content[]>(memoArray);

  useEffect(() => {
    setList(memoArray);
  }, [memoArray])

  // console.log(param);
  const deleteItem = useCallback(async (slug: string) => {
    console.log('deleteItem!!!!');
    setList(list.filter(item => item.slug !== slug));
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }, [list, setList, project]);

  return <List list={list} deleteItem={deleteItem} />
});

const List: FC<{ list: Content[], deleteItem: (arg: string) => void }> = ({ list, deleteItem }) => {
  const { grid } = useLayout();

  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "edit-list"}>
        {list.map(v => (
          <Item key={v.slug} v={v} deleteItem={deleteItem} />
        ))}
        <li className='splitter'></li>
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
  const { title, slug, created_at, tags, content, project } = v;
  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  if (tags && tags.length > 0) {
    return (
      <li key={`p_${slug}`} className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className="item-title">{title}</div>
          <div className="item-dscr">
            {created_at ? `${created_at.slice(0, 10)}: ` : ''}
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
        <div className={isToast ? 'hidden' : grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsToast(true)}>
          <TrashIcon />
        </div>
      </li>
    );
  } else if (content === 'date') {
    return <li className='bydate'><h2>{title}</h2></li>
  }

  return <></>;
}

export default OrderByDate;

