import {
  FC,
  // useState, 
  useContext,
  // useEffect,
  useRef,
  Suspense,
} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'context/authContext';
// import sendContent from 'services/send-content'
import getContent from 'services/get-content';
// import { Content } from 'models/content';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

import { useParams } from 'react-router';

const GetC: FC = () => {
  const { currentUser: user } = useContext(AuthContext);
  // const refTitle = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  // console.log(results);
  const { slug } = useParams(); // バケツリレー不要。必要なところで呼び出せば良い。
  // let location = useLocation();
  // const slug2 = location.pathname.slice(1).replace('demo2/', '');
  // console.log(slug);
  const { data } = useQuery(['page', slug], () => getContent(slug))
  // keepPreviousData: true,
  // });
  const fff = () => {
    console.log(data);
  }
  return (
    <>
      <h2>
        {data && data.title}
      </h2>
      <div className="tags">
        {data && data.tags ? data.tags.map((v, k) => (
          <Link key={`t_${k}`} to={`/demo2/${v}`}><span className='tags'>{v.trim()}</span></Link>
        )) : ''}
      </div>
      <div className='content-body'
        contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
        suppressContentEditableWarning={true}
        spellCheck={false}
        ref={refBody}
      >
        {data && data.content}
      </div>
      <h3>getData</h3>
      <button onClick={fff}>getText</button>
    </>
  )
}


const Demo2: FC = () => {
  // console.log(data);
  const ebKey = useRef(0);

  return (
    <ErrorBoundary key={ebKey.current}>
      <Suspense fallback={<p>...loading</p>}>
        <div className='wrapper'>
          <GetC />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Demo2;

