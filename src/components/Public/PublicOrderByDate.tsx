import { FC, Suspense, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useLayout } from 'hooks/useLayout';
import { Content } from 'models/content';
import { queryClient } from 'index';
import { useEmbedDateToArray } from 'hooks/useEmbedDateToArray';
import getContentsAll from 'services/get-contents-all';
import ErrorBoundary from 'ErrorBoundary';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import ContentsListHeader from 'components/common/ContentsListHeader';
import Spinner from 'components/common/Spinner';


const PublicOrderByDate: FC = () => {
  const ebKey = useRef(0);
  const title = 'コンテンツ一覧（日付順） - Sasa-Box';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/tags/`} />
      </Helmet>
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<Spinner />}>
          <Visuallyhidden children={title} />
          <main>
            <ContentsListHeader />
            <Fetch />
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const Fetch: FC = () => {
  const { data } = useQuery(
    ['contents-all', 'public', { sort_by: 'created_at', order_by: 'DESC' }],
    () => getContentsAll('', false, '?sort_by=created_at')
  );

  if (data) {
    return <ListFilter data={data} />
  }

  return <></>
}

const ListFilter: FC<{ data: Content[] }> = ({ data }) => {
  const project = 'public';
  const embedDateToArray = useEmbedDateToArray(data, project);
  const queryKey = ['contents-all', project, { sort_by: 'created_at', order_by: 'DESC', embed: 'date' }]
  const oldArray = queryClient.getQueryData(queryKey);
  // キャッシュがなければ配列作成
  const memoArray = oldArray ? oldArray as Content[] : embedDateToArray();
  queryClient.setQueryData(queryKey, memoArray);

  const [list, setList] = useState<Content[]>(memoArray);

  useEffect(() => {
    setList(memoArray);
  }, [memoArray])

  return <List list={list} />

}

const List: FC<{ list: Content[] }> = ({ list }) => {
  const { grid } = useLayout();

  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "edit-list"}>
        {list.map(v => (
          <Item key={v.slug} v={v} />
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

const Item: FC<{ v: Content }> = ({ v }) => {
  const { title, slug, created_at, tags, content } = v;
  const { grid } = useLayout();

  if (tags && tags.length > 0) {
    return (
      <li key={`p_${slug}`} className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className={grid ? 'item-content-grid' : 'item-content'}>
            <div className="item-title">{title}</div>
            <div className="item-dscr">
              {created_at ? `${created_at.slice(0, 10)}: ` : ''}
              {content.slice(0, 80)}
            </div>
          </div>
        </Link>
      </li>
    );
  } else if (content === 'date') {
    return <li className='bydate'><h2>{title}</h2></li>
  }

  return <></>;
}

export default PublicOrderByDate;

