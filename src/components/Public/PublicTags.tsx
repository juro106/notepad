import { FC, useRef, Suspense, } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useLayout } from 'hooks/useLayout';
import getTags from 'services/get-tags';
import ErrorBoundary from 'ErrorBoundary';
import ContentsListHeader from 'components/common/ContentsListHeader';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import Spinner from 'components/common/Spinner';

const PublicTags: FC = () => {
  const ebKey = useRef(0);
  const title = 'タグ一覧 - Sasa-Box';

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
            <ContentsList />
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const ContentsList: FC = () => {
  const { data } = useQuery(['tags'], () => getTags('', true));
  const { grid } = useLayout();

  if (data) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {data.map((tag, k) => (
          <li key={`p_${k}`} className={grid ? 'grid-list-item' : 'edit-list-item'}>
            <Link to={`/${tag.name}`} className={grid ? "grid-item-link-tag" : "edit-item-link-tag"}>
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

