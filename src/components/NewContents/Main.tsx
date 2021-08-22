import {
  FC,
  memo,
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
import { removeQueries } from 'services/removeQueries'
import { ContentForUpload } from 'models/content';

import ImageComponent from 'components/Image/ImageComponent';
import ImageSelector from 'components/Image/ImageSelector';
import ImageUploader from 'components/Image/ImageUploader';

const Main: FC<{ setTagsState: (arg: string[]) => void }> = memo(({ setTagsState }) => {
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
    window.scrollTo(0, 0);
    refTitle.current && refTitle.current.focus(); // マウントされたらタイトルにフォーカス
  }, [])

  // upload or select で画像をセット
  useEffect(() => {
    ctxImgURL !== '' && setImgURL(ctxImgURL)
    // 画像がセットされたら保存してしまう。
    if (refBody.current && imgURL) {
      refBody.current.focus();
      refBody.current.blur();
    }
  }, [ctxImgURL, imgURL]);

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

  // 初回投稿のみ使われる
  const setPost = async () => {
    if (refTitle && refTitle.current && refBody && refBody.current && refTags && refTags.current && uid) {
      if (refTitle.current.innerText.length === 0) return; // タイトルが入力されていなければ登録しない

      const tagText = refTags.current.innerText.replaceAll(' ', '');
      const tagSlug = tagText === '_istag' && refTitle.current.innerText.trim();

      const data: ContentForUpload = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        slug: tagSlug ? tagSlug : generateUuid(), // <- ここが通常のページと違う
        project: project,
        tags: tagText === '_istag' ? [] : tagText.length === 0 ? ['_notag'] : tagText.split(",").filter(v => v !== ''),
        content: refBody.current.innerText.replaceAll('\n\n', '\n'),
        image: ctxImgURL,
      };

      await postContent(data);
      removeQueries(project);
      navigate(`/local/${project}/${data.slug}`);
    }
  }

  const DeleteImage = () => {
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
        <div className={imgURL ? 'content-body' : 'content-body-new'}
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
});

export default Main;

