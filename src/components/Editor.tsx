import { FC, useState, useContext } from 'react';
import { Editor, EditorState } from 'draft-js';
import { AuthContext } from 'context/authContext';

const MyEditor: FC = () => {
  const { currentUser: user } = useContext(AuthContext);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  return (
    <div className='wrapper'>
      <h3>編集可能です。</h3>
      <main tabIndex={0} style={{ width: "48em", margin: "0 auto", padding: "20px", textAlign: "left", border: "1px solid #ccc" }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          readOnly={user !== null ? false : true} // ログインユーザーのみ編集可能
        />
      </main>
    </div>
  );
}

export default MyEditor;
