import { FC, useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const MyEditor: FC = () => { 
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  return (
    <div className='wrapper'>
    <Editor 
      editorState={editorState}
        onChange={setEditorState}
    />
    </div>
  );
}

export default MyEditor;
