import { FC, useRef, Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

const Home: FC = () => {
  const ebKey = useRef(0);
  const { uid } = useContext(AuthContext);

  if (uid) {
    return (
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<p>...loding</p>}>
            <main>
              <ContentsList uid={uid}/>
            </main>
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <></>
}

const ContentsList: FC<{uid: string}> = ({ uid }) => {
  const { data } = useQuery(['home'], () => getContentsAll({uid}));

  if (data && data.length > 0) {
    return (
      <ul className="item-list">
        {data.map((v, k) => (
          v.content.length > 0 
          ?
          <li key={`p_${k}`} className='item'>
            <Link to={`/${v.slug.trim()}`} className="item-link">
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

export default Home;

