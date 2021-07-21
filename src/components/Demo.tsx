import {
  FC,
  // useState, 
  useContext,
  useRef,
} from 'react';
import { AuthContext } from 'context/authContext';
import sendContent from 'services/send-content'

const Demo: FC = () => {
  const { currentUser: user } = useContext(AuthContext);
  const refTitle = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);

  const forceTab = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && refBody.current) {
      e.preventDefault();
      refBody.current.focus();
    }
  }
  const getText = () => {
    if (refBody && refBody.current && refTitle && refTitle.current && user) {
      console.log(refTitle.current.innerText)
      console.log(refBody.current.innerText)
      const data = {
        user: user.uid,
        title: refTitle.current.innerText,
        content: refBody.current.innerText,
      };
      console.log(data);
      sendContent(data);
    }
  }

  return (
    <div className='wrapper'>
      <h3>※Demo 編集可能です。</h3>
      <main className="editable">
        <div className='content-title'
          contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTitle}
          onKeyPress={(e) => forceTab(e)}
        ></div>
        <div className='content-body'
          tabIndex={0}
          contentEditable={user !== null ? true : false} // ログインユーザーのみ編集可能
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refBody}
        ></div>
      </main>
      <button onClick={getText}>getText</button>
    </div>
  );
}

export default Demo;

