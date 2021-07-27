import { FC, useContext, useRef } from 'react';
import { AuthContext } from 'context/authContext';
import postContent from 'services/post-content'
import { Content } from 'models/content';
import { Message } from 'models/message';

const Main: FC<{
  data: Content | undefined,
  changeState: (flg: boolean) => void,
  setResMsg: (arg: Message) => void,
}> = ({
  data,
  changeState,
  setResMsg,
}) => {
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

    const KeyBinding = (e: React.KeyboardEvent) => {
      if (e.code === 'Enter' && e.altKey) {
        update();
      }
    }

    const slug = data ? data.slug : '';
    console.log('slug:', slug);

    const update = async () => {
      if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && user) {
        const data = {
          user: user.uid,
          title: refTitle.current.innerText.trim(),
          // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', '_'),
          slug: slug,
          tags: refTags.current.innerText.replaceAll(' ', '').split(",").filter(v => v !== ''),
          content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
        };

        console.log('tags:', data.tags);
        const res = await postContent(data);
        changeState(true);
        setResMsg(res);
        // console.log(res);
      }
    }

    if (data)
      return (
        <>
          <main className="editable"
              onKeyDown={(e) => KeyBinding(e)}
          >
            <div className='content-title'
              contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTitle}
              onKeyDown={(e) => Enter2Tab(e)}
              data-text="Title"
            >
              {data && data.title}
            </div>
            <div className='content-tags'
              contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTags}
              onKeyDown={(e) => Enter2Tab(e)}
              data-text="[ Tags ]"
              onBlur={update}
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
              tabIndex={0}
            >
              {data && data.content}
            </div>
          </main>
          <div className="info">
            <button className="save" onClick={update}>save</button>
          </div>
        </>
      )

    return <></>
  }

export default Main;

