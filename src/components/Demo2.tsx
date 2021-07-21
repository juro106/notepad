import {
  FC,
  // useState, 
  // useContext,
  // useEffect,
  useRef,
  Suspense,
} from 'react';
// import { AuthContext } from 'context/authContext';
// import sendContent from 'services/send-content'
import getContent from 'services/get-content';
// import { Content } from 'models/content';
import { useQuery } from 'react-query';
import ErrorBoundary from 'ErrorBoundary';

import { useParams } from 'react-router';

const GetC: FC = () => {


  // const { currentUser: user } = useContext(AuthContext);
  // const refTitle = useRef<HTMLDivElement>(null);
  // const refBody = useRef<HTMLDivElement>(null);
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
      <pre>
        {data && data.content}
      </pre>
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
      <Suspense fallback={<p>...loding</p>}>
        <div className='wrapper'>
          <GetC />
          <h3>※Demo 編集可能です。</h3>
          <main className="editable">
            <div className='content-title'></div>
            <div className='content-body'></div>
          </main>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Demo2;

