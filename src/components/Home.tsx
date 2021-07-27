import { FC, useRef, Suspense, } from 'react';
import { Link } from 'react-router-dom';

import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

const ContentsList: FC = () => {
  const { data } = useQuery(['home'], () => getContentsAll());

  if (data && data.length > 0) {
    return (
      <ul className="item-list">
        {data.map((v, k) => (
          v.content.length > 0 
          ?
          <li key={`p_${k}`} className='item'>
            <Link to={`/v1/${v.slug.trim()}`} className="item-link">
              <div className="item-title">{v.title}</div>
              <div className="item-dscr">{v.content.slice(0, 80)}</div>
            </Link>
          </li>
          : ''
        ))}
      </ul>
    )
  }
  return <>まだメモがありません。</>
}

const Home: FC = () => {
  const ebKey = useRef(0);

  return (
    <ErrorBoundary key={ebKey.current}>
      <Suspense fallback={<p>...loding</p>}>
          <main>
            <ContentsList />
          </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Home;

