import { FC, useRef, Suspense, } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import getTags from 'services/get-tags';
import ListSwitcher from 'components/Common/ListSwitcher';
import ErrorBoundary from 'ErrorBoundary';

const PublicTags: FC = () => {
  const ebKey = useRef(0);

  return (
    <>
      <Helmet>
        <title>タグ一覧 - Sasa-Box</title>
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/tags/`} />
      </Helmet>
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<div className="spinner"></div>}>
          <main>
            <ListSwitcher production={true} />
            <h1>タグ一覧</h1>
            <ContentsList />
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const ContentsList: FC = () => {
  const { data } = useQuery(['tags'], () => getTags('', true));

  if (data) {
    return (
      <ul className="item-list">
        {data.map((tag, k) => (
          <li key={`p_${k}`} className='edit-list-item'>
            <Link to={`/${tag.name}`} className="edit-item-link-tag">
              <div className="edit-list-tag-title">{tag.name}</div>
              <div className="edit-list-tag-number">({tag.number})</div>
            </Link>
          </li>
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
}

export default PublicTags;

