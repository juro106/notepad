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
import { ContentForUpload } from 'models/content';
import { useProject } from 'hooks/useProject';
import { useImage } from 'hooks/useImage';
import { useSetImage } from 'hooks/useSetImage';
import { useResetData } from 'hooks/useResetData';
import postContent from 'services/post-content';
import { generateUuid } from 'services/functions';

import ImageComponent from 'components/Image/ImageComponent';
import ImageSelector from 'components/Image/ImageSelector';
import ImageUploader from 'components/Image/ImageUploader';
import Editable from 'components/Local/Editable';

const Main: FC<{ setTagsState: (arg: string[]) => void }> = memo(({ setTagsState }) => {
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const { uid } = useContext(AuthContext);
  const project = useProject();
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const imagePath = useImage();
  const setImage = useSetImage();
  const dispatchReset = useResetData();

  useEffect(() => {
    window.scrollTo(0, 0);
    refTitle.current && refTitle.current.focus(); // マウントされたらタイトルにフォーカス
  }, [])

  // upload or select で画像をセット
  useEffect(() => {
    if (imagePath !== '') {
      setImgURL(imagePath)
      setImage('');
    }
    // 画像がセットされたら保存してしまう。
    if (refBody.current && imgURL) {
      refBody.current.focus();
      refBody.current.blur();
    }
  }, [imagePath, setImage, imgURL]);

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
        content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
        image: imagePath,
      };

      await postContent(data);
      dispatchReset();
      navigate(`/local/${project}/${data.slug}`);
    }
  }

  const DeleteImage = () => {
    setImgURL(undefined);
    setImage('');
    window.scrollTo(0, 0);
  }

  return (
    <div className='content'>
      <main className="editable" onKeyDown={(e) => KeyBinding(e)} >
        <Editable className='content-title'
          ref={refTitle}
          dataText="Title"
        // onInput={characterCount}
        />
        <Editable className='content-tags'
          ref={refTags}
          dataText="[ Tags ]"
          onBlur={setTags}
        />
        <Editable className={imgURL ? 'content-body' : 'content-body-new'}
          ref={refBody}
          dataText={'Content'}
          onBlur={setPost}
          tabIndex={0}
        />
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

