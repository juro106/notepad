import { FC, useState, useContext, useEffect } from 'react';
import { Editor, EditorState, RichUtils, DraftEditorCommand } from 'draft-js';
import { AuthContext } from 'context/authContext';

const MyEditor: FC = () => {
  const { currentUser: user } = useContext(AuthContext);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };
  useEffect(() => {
    console.log(editorState);
  }, [editorState])

  return (
    <div className='wrapper'>
      <main className='editable'>
        <h3>編集可能です。</h3>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          readOnly={user !== null ? false : true} // ログインユーザーのみ編集可能
        />
      </main>
    </div>
  );
}

export default MyEditor;
