import {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import { ImgSelectContext, useImgSelectContext } from 'contexts/imgSelectContext';
import postContent from 'services/post-content';
import { generateUuid } from 'services/functions';
import ImageComponent from 'components/Image/ImageComponent';
import ImageSelector from 'components/Image/ImageSelector';
import ImageUploader from 'components/Image/ImageUploader';

const Main: FC<{ setTagsState: (arg: string[]) => void }> = ({ setTagsState }) => {
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const { uid } = useContext(AuthContext);
  const { project } = useContext(ProjectContext)
  const { ctxImgURL } = useContext(ImgSelectContext)
  const [uuid, setUuid] = useState<string>('');
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  const ctx = useImgSelectContext();
  const navigate = useNavigate();

  useEffect(() => {
    setUuid(generateUuid());
    // ctx.setCurrentImgURL('');
    window.scrollTo(0, 0);
  }, [])

    // upload or select で画像をセット
    useEffect(() => {
      ctxImgURL !== '' && setImgURL(ctxImgURL)
    },[ctxImgURL]);

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
      if (refTitle.current.innerText.length === 0) return; // タイトルが入力されていなければ登録しない
      // console.log(refTitle.current.innerText)
      // console.log(refBody.current.innerText)
      const data = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', ''),
        slug: uuid, // <- ここが通常のページと違う
        project: project,
        tags: refTags.current.innerText.replaceAll(' ', '').split(","),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
        image: ctxImgURL,
      };
      console.log('content data', data);
      // console.log('uuid', uuid);

      await postContent(data);
      navigate(`/local/${project}/${data.slug}`);
    }
  }

  const DeleteImage = () => {
    const input = document.getElementById('upload-image') as HTMLInputElement;
    const imgTag = document.getElementById('preview') as HTMLImageElement;
    input.value = '';
    imgTag.src = '';
    ctx.setCurrentImgURL('');
    setImgURL(undefined);
    window.scrollTo(0, 0);
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
        <ImageComponent imgURL={imgURL} DeleteImage={DeleteImage} />
        <div className='editable-option'>
          <ImageUploader isSetter={true} />
          <ImageSelector />
          <button className="save" onClick={setPost}>save</button>
        </div>
      </main>
    </div>
  );
}

export default Main;

