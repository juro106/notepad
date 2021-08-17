import {
  FC, useRef, Suspense
  // , useContext, useState, useEffect 
} from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from 'contexts/authContext';
import getContentsAll from 'services/get-contents-all';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

const PublicHome: FC = () => {
  const ebKey = useRef(0);
  const user = `${process.env.REACT_APP_DEFAULT_USER}`;

  if (user) {
    return (
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<div className="spinner"></div>}>
          <main>
            <div className="related-contents">
              <ContentsList />
            </div>
          </main>
        </Suspense>
      </ErrorBoundary>
    );
  } else {
    return <div className='spinner'></div>
  }
}

// const ContentsList: FC<{ uid: string }> = ({ uid }) => {
const ContentsList: FC = () => {
  const { data } = useQuery(['publicHome'], () => getContentsAll('public', true));

  if (data && data.length > 0) {
    return (
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
    )
  }
  return <>まだメモがありません。</>
}

export default PublicHome;

