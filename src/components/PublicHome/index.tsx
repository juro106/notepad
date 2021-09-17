import { FC, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import { useLayout } from 'hooks/useLayout';
import ErrorBoundary from 'ErrorBoundary';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import ContentsListHeader from 'components/common/ContentsListHeader';
import Spinner from 'components/common/Spinner';

const PublicHome: FC = () => {
  const ebKey = useRef(0);
  const title = 'Sasa-Box コンテンツ一覧';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/`} />
      </Helmet>
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<Spinner />}>
          <Visuallyhidden children={title} />
          <main>
            <ContentsListHeader />
            <ContentsList />
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const ContentsList: FC = () => {
  const { data } = useQuery(["contents-all", "public"], () => getContentsAll('', false));
  const { grid } = useLayout();

  if (data && data.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {data.map((v, k) => (
          v.content.length > 0
            ?
            <li key={`p_${k}`} className={grid ? 'grid-list-item' : 'item'}>
              <Link to={`/${v.slug.trim()}`} className={grid ? 'grid-item-link' : "item-link"}>
                <div className={grid ? 'item-content-grid' : 'item-content'}>
                  <div className="item-title">{v.title}</div>
                  <div className="item-dscr">
                    {v.updated_at ? `${v.updated_at.slice(0, 10)}: ` : ''}
                    {v.content.slice(0, 80)}
                  </div>
                </div>
              </Link>
            </li>
            : ''
        ))}
      </ul>
    )
  } else {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }
}

export default PublicHome;

