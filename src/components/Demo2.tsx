import {
  FC,
  // useState, 
  useContext,
  // useEffect,
  useRef,
  Suspense,
} from 'react';
// import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
// import postContent from 'services/post-content'
import getContent from 'services/get-content';
// import { Content } from 'models/content';
import ErrorBoundary from 'ErrorBoundary';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
// import Related from 'components/Related';

type Taglist = string[] | undefined;
let taglist: Taglist = [];;
const GetC: FC = () => {
  const { currentUser: user, uid } = useContext(AuthContext);
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  // console.log(results);
  const { projectName, slug } = useParams(); // バケツリレー不要。必要なところで呼び出せば良い。
  // let location = useLocation();
  // const slug2 = location.pathname.slice(1).replace('demo2/', '');
  // console.log(slug);
  const query = { slug, uid };
  console.log(query);
  const { data } = useQuery(['page', slug], () => getContent(projectName, slug));
  // keepPreviousData: true,
  // });
  if (data) {
    taglist = data.tags;
  }
  const forceTab = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && refBody.current) {
      e.preventDefault();
      refBody.current.focus();
    }
  }
  const getText = () => {
    if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && user) {
      console.log(refTitle.current.innerText)
      console.log(refBody.current.innerText)
      const data = {
        user: user.uid,
        title: refTitle.current.innerText.trim(),
        slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', ''),
        tags: refTags.current.innerText.split(" "),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
      };
      taglist = refTags.current.innerText.split(" ");
      console.log(data);
      // postContent(data);
    }
  }
  if (data)
    return (
      <>
        <main className="editable">
          <div className='content-title'
            contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refTitle}
            onKeyPress={(e) => forceTab(e)}
          >
            {data && data.title}
          </div>
          <div className='content-body'
            contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refTags}
            onKeyPress={(e) => forceTab(e)}
          >
            {data && data.tags ? data.tags.map((v, k) => (
              data.tags !== undefined ?
                data.tags.slice(-1)[0] === v ? `${v}` : `${v} `
                : ''
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
        </main>
        <button onClick={getText}>getText</button>
      </>
    )

  return <></>
}


const Demo2: FC = () => {
  console.log("taglist", taglist);
  const ebKey = useRef(0);

  return (
    <>
      <ErrorBoundary key={ebKey.current}>
        <Suspense fallback={<div className="spinner"></div>}>
          <div className='wrapper'>
            <GetC />
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Demo2;

