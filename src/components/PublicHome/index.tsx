import { FC, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

const PublicHome: FC = () => {
  const ebKey = useRef(0);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sasa-Box</title>
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/`} />
      </Helmet>
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<div className="spinner"></div>}>
          <main>
            <h1>一覧</h1>
            <ContentsList />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

const ContentsList: FC = () => {
  const { data } = useQuery(["all"], () => getContentsAll('', true));

  if (data && data.length > 0) {
    return (
      <div className="related-contents">
        <ul className="item-list">
          {data.map((v, k) => (
            v.content.length > 0
              ?
              <li key={`p_${k}`} className='item'>
                <Link to={`/${v.slug.trim()}`} className="item-link">
                  <div className="item-title">{v.title}</div>
                  <div className="item-dscr">
                    {v.updated_at ? `${v.updated_at}: ` : ''}
                    {v.content.slice(0, 80)}
                  </div>
                </Link>
              </li>
              : ''
          ))}
        </ul>
      </div>
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

