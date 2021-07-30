import {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import postContent from 'services/post-content';
import { generateUuid } from 'services/functions';

const Main: FC<{ setTagsState: (arg: string[]) => void }> = ({ setTagsState }) => {
  const { uid } = useContext(AuthContext);
  const [uuid, setUuid] = useState<string>('');
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  // const forceTab = (e: React.KeyboardEvent) => {
  //   if (e.code === 'Enter' && refBody.current) {
  //     e.preventDefault();
  //     refBody.current.focus();
  //   }
  // }
  const KeyBinding = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && e.altKey) {
      setPost();
    }
  }

  const setTags = () => {
    if (refTags && refTags.current) {
      // console.log('setTags start');
      const tags = refTags.current.innerText.replaceAll(' ', '').split(',');
      // console.log(tags);

      setTagsState(tags);
    }
  }

  // 初回投稿のみ使われる
  const setPost = async () => {
    if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && uid) {
      // console.log(refTitle.current.innerText)
      // console.log(refBody.current.innerText)
      const data = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', ''),
        slug: uuid, // <- ここが通常のページと違う
        tags: refTags.current.innerText.replaceAll(' ', '').split(","),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
      };
      // console.log('content data', data);
      // console.log('uuid', uuid);

      await postContent(data);
      navigate(`/${data.slug}`);
    }
  }

  return (
    <div className='content'>
      <main className="editable"
      onKeyDown={(e) => KeyBinding(e)}
      >
        <div className='content-title'
          contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTitle}
          data-text="Title"
        ></div>
        <div className='content-tags'
          contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTags}
          data-text="[ Tags ]"
          onBlur={setTags}
        ></div>
        <div className='content-body'
          tabIndex={0}
          contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refBody}
          data-text="Content"
          onBlur={setPost}
        ></div>
      </main>
      <button className="save" onClick={setPost}>save</button>
    </div>
  );
}

export default Main;

