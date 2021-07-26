import { FC, useContext, useRef } from 'react';
import { AuthContext } from 'context/authContext';
import postContent from 'services/post-content'
import { Content } from 'models/content';

const Main: FC<{ data: Content | undefined, changeState: (flg: boolean) => void }> = ({ data, changeState }) => {
  const { currentUser: user } = useContext(AuthContext);
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);

  const Enter2Tab = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && refBody.current) {
      e.preventDefault();
      refBody.current.focus();
    }
  }

  const getText = async () => {
    if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && user) {
      const data = {
        user: user.uid,
        title: refTitle.current.innerText.trim(),
        slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', '_'),
        tags: refTags.current.innerText.replaceAll(' ', '').split(",").filter(v => v !== ''),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
      };
     
      console.log('tags:', data.tags);
      await postContent(data);
      await changeState(true);
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
            onKeyPress={(e) => Enter2Tab(e)}
            data-text="Title"
          >
            {data && data.title}
          </div>
          <div className='content-body'
            contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refTags}
            onKeyPress={(e) => Enter2Tab(e)}
            data-text="Tags"
          >
            {data && data.tags ? data.tags.map((v, k) => (
              data.tags !== undefined ?
                data.tags.slice(-1)[0] === v ? `${v}` : `${v},`
                : ''
            )) : ''}
          </div>
          <div className='content-body'
            contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refBody}
            data-text="Content"
          >
            {data && data.content}
          </div>
        </main>
        <button className="save" onClick={() => getText()}>save</button>
      </>
    )

  return <></>
}

export default Main;

