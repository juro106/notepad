import { FC, useRef, Suspense, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const LocalHome: FC = () => {
  const ebKey = useRef(0);
  const { currentUser, uid } = useContext(AuthContext);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [flg, setFlg] = useState(false);

  useEffect(() => {
    const data = uid && currentUser ? uid : '';
    setUser(data);
    setFlg(true);
  }, [uid, flg, currentUser])

  if (flg && user) {
    return (
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<div className="spinner"></div>}>
          <HelmetProvider>
            <Helmet>
              <title>Home</title>
              {uid ? <meta name='robots' content='noindex nofollow' /> : ''}
            </Helmet>
          </HelmetProvider>
          <main>
            <div className="related-contents">
              <ContentsList uid={user} />
            </div>
          </main>
        </Suspense>
      </ErrorBoundary>
    );
  } else {
    return <div className='spinner'></div>
  }
}

const ContentsList: FC<{ uid: string }> = ({ uid }) => {
  const { data } = useQuery([uid], () => getContentsAll( uid ));

  if (data && data.length > 0) {
    return (
      <ul className="item-list">
        {data.map((v, k) => (
          v.content.length > 0
            ?
            <li key={`p_${k}`} className='item'>
              <Link to={`/local/${v.slug.trim()}`} className="item-link">
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
    )
  }
  return <>まだメモがありません。</>
}

export default LocalHome;

