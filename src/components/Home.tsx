import { FC, useRef, Suspense, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

const Home: FC = () => {
  const ebKey = useRef(0);
  const { currentUser, uid } = useContext(AuthContext);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [flg, setFlg] = useState(false);
  useEffect(() => {
    const data = uid && currentUser ? uid : `${process.env.REACT_APP_DEFAULT_USER}`;
    setUser(data);
    setFlg(true);
  }, [uid, flg, currentUser])

  if (flg && user) {
    return (
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<p>...loding</p>}>
          <main>
            <div className="related-contents">
              <ContentsList uid={user} />
            </div>
          </main>
        </Suspense>
      </ErrorBoundary>
    );
  } else {
    return (
      <>..loading</>
    );
  }
}

const ContentsList: FC<{ uid: string }> = ({ uid }) => {
  const { data } = useQuery(['home'], () => getContentsAll({ uid }));

  if (data && data.length > 0) {
    return (
      <ul className="item-list">
        {data.map((v, k) => (
          v.content.length > 0
            ?
            <li key={`p_${k}`} className='item'>
              <Link to={`/${v.slug.trim()}`} className="item-link">
                <div className="item-title">{v.title}</div>
                <div className="item-updated_at">{v.updated_at ? `↺${v.updated_at}` : ''}</div>
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

