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
  // const [titleText, setTitleText] = useState<string>('');
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  // const [isPostable, setIsPostable] = useState<boolean>(false);
  const { uid } = useContext(AuthContext);
  const { project } = useContext(ProjectContext)
  const { ctxImgURL } = useContext(ImgSelectContext)
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  const ctx = useImgSelectContext();
  const navigate = useNavigate();

  useEffect(() => {
    // ctx.setCurrentImgURL('');
    window.scrollTo(0, 0);
  }, [])

  // upload or select で画像をセット
  useEffect(() => {
    ctxImgURL !== '' && setImgURL(ctxImgURL)
  }, [ctxImgURL]);

  // タイトルの文字数が0の場合、セーブボタンをoffにする
  // useEffect(() => {
  //   titleText.length > 0
  //     ? setIsPostable(true)
  //     : setIsPostable(false);
  // }, [titleText]);

  const KeyBinding = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && e.altKey) {
      setPost();
    }
  }

  const setTags = () => {
    if (refTags && refTags.current && refTags.current.innerText.length > 0) {
      const tags = refTags.current.innerText.replaceAll(' ', '').split(',');
      setTagsState(tags);
    }
  }

  // const characterCount = (e: React.ChangeEvent<HTMLDivElement>) => {
  //   // console.log(e.target);
  //   setTitleText(e.target.innerText);
  // }
  // 初回投稿のみ使われる
  const setPost = async () => {
    if (refTitle && refTitle.current && refBody && refBody.current && refTags && refTags.current && uid) {
      if (refTitle.current.innerText.length === 0) return; // タイトルが入力されていなければ登録しない

      const tagText = refTags.current.innerText.replaceAll(' ', '');

      const data = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        slug: generateUuid(), // <- ここが通常のページと違う
        project: project,
        tags: tagText.length === 0 ? ['_notag'] : tagText.split(",").filter(v => v !== ''),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
        image: ctxImgURL,
      };

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
      <main className="editable" onKeyDown={(e) => KeyBinding(e)} >
        <div className='content-title'
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTitle}
          data-text="Title"
        // onInput={characterCount}
        ></div>
        <div className='content-tags'
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTags}
          data-text="[ Tags ]"
          onBlur={setTags}
        ></div>
        <div className='content-body-new'
          tabIndex={0}
          contentEditable={true}
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
        </div>
      </main>
    </div>
  );
}

export default Main;

