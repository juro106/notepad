import { FC, useContext, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
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
    const { uid } = useContext(AuthContext);
    // const uid = user ? md5(user.uid) : '';
    const refTitle = useRef<HTMLDivElement>(null);
    const refTags = useRef<HTMLDivElement>(null);
    const refBody = useRef<HTMLDivElement>(null);

    // const Enter2Tab = (e: React.KeyboardEvent) => {
    //   if (e.code === 'Enter' && refBody.current) {
    //     e.preventDefault();
    //     refBody.current.focus();
    //   }
    // }

    const KeyBinding = (e: React.KeyboardEvent) => {
      if (e.code === 'Enter' && e.altKey) {
        update();
      }
    }

    const slug = data ? data.slug : '';
    // console.log('slug:', slug);

    const update = async () => {
      if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && uid) {
        const data = {
          user: uid, 
          title: refTitle.current.innerText.trim(),
          // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', '_'),
          slug: slug,
          tags: refTags.current.innerText.replaceAll(' ', '').split(",").filter(v => v !== ''),
          content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
        };

        // console.log('tags:', data.tags);

        const res = await postContent(data);
        changeState(true);
        setResMsg(res);
        // console.log(res);
      }
    }

    if (data)
      return (
        <HelmetProvider>
          <Helmet>
            <title>{data.title}</title>
            {uid ? <meta name='robots' content='noindex nofollow' /> : ''}
            <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${slug}`} />
          </Helmet>
          <main className="editable"
              onKeyDown={(e) => KeyBinding(e)}
          >
            <h1 className='content-title'
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTitle}
              data-text="Title"
              onBlur={update}
            >
              {data && data.title}
            </h1>
            <div className='content-tags'
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTags}
              data-text="[ Tags ]"
              onBlur={update}
            >
              {data && data.tags ? data.tags.map((v, k) => (
                data.tags !== undefined ?
                  data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                  : ''
              )) : ''}
            </div>
            <div className='content-body'
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refBody}
              data-text="Content"
              tabIndex={0}
              onBlur={update}
            >
              {data && data.content}
            </div>
          {uid !== '' &&
            <button className="save" onClick={update}>save</button>
          }
          </main>
        </HelmetProvider>
      )

    return <></>
  }

export default Main;

