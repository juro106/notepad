import {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from 'context/authContext';
import postContent from 'services/post-content';
import { generateUuid } from 'services/functions';

const Main: FC<{ setTagsState: (arg: string[]) => void }> = ({ setTagsState }) => {
  const { currentUser: user } = useContext(AuthContext);
  const [uuid, setUuid] = useState<string>('');
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  const forceTab = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && refBody.current) {
      e.preventDefault();
      refBody.current.focus();
    }
  }

  const setTags = () => {
    if (refTags && refTags.current) {
      console.log('setTags start');
      const tags = refTags.current.innerText.replaceAll(' ', '').split(',');
      console.log(tags);

      setTagsState(tags);
    }
  }

  // 初回投稿のみ使われる
  const firstPost = async () => {
    if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && user) {
      console.log(refTitle.current.innerText)
      console.log(refBody.current.innerText)
      const data = {
        user: user.uid,
        title: refTitle.current.innerText.trim(),
        // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', ''),
        slug: uuid, // <- ここが通常のページと違う
        tags: refTags.current.innerText.replaceAll(' ', '').split(","),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
      };
      console.log('content data', data);
      console.log('uuid', uuid);

      await postContent(data);
      navigate(`/v1/${data.slug}`);
    }
  }

  return (
    <div className='content'>
      <main className="editable">
        <div className='content-title'
          contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTitle}
          data-text="Title"
          onKeyPress={(e) => forceTab(e)}
        ></div>
        <div className='content-tags'
          contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTags}
          data-text="[ Tags ]"
          onKeyPress={(e) => forceTab(e)}
          onBlur={setTags}
        ></div>
        <div className='content-body'
          tabIndex={0}
          contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refBody}
          data-text="Content"
        ></div>
      </main>
      <div className="info">
        <button className="save" onClick={firstPost}>save</button>
      </div>
    </div>
  );
}

export default Main;

