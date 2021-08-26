import { FC, useContext, useRef, useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import { useProject } from 'hooks/useProject';
import { useSetMeta } from 'hooks/useSetMeta';
import { useImage } from 'hooks/useImage';
import { useSetImage } from 'hooks/useSetImage';
import postContent from 'services/post-content'
import deleteContent from 'services/delete-content';
import { useResetData } from 'hooks/useResetData';
import { Content, ContentForUpload } from 'models/content';
// import { Message } from 'models/message';
import ImageComponent from 'components/Image/ImageComponent';
import ImageUploader from 'components/Image/ImageUploader';
import ImageSelector from 'components/Image/ImageSelector';
// import ResponseMessage from './ResponseMessage';
import ToastWarning from 'components/Local/ToastWarning';
import TrashIcon from 'components/Button/TrashIcon'

const Main: FC<{ data: Content, setTagsState: (tags: string[]) => void, }> = memo(({ data, setTagsState }) => {
  const { title, tags, content, slug, created_at, updated_at, image } = data;
  const [imgURL, setImgURL] = useState<string | undefined>(image);
  const [isToast, setIsToast] = useState(false);
  const { uid } = useContext(AuthContext);
  const project = useProject();
  const setImage = useSetImage();
  const imagePath = useImage();
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);

  const KeyBinding = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && e.altKey) {
      update();
    }
  }

  useSetMeta(title, slug);

  // 初回 画像セット
  useEffect(() => {
    setImgURL(image);
  }, [image]);

  // upload image or select image で画像をセット
  useEffect(() => {
    if (imagePath !== '') {
      setImgURL(imagePath)
      setImage('');
    }
  }, [imagePath, setImage]);

  // unmount のときに fetch キャンセル、message off
  useEffect(() => {
    let abortCtrl = new AbortController();
    window.scrollTo(0, 0);
    // setMessage(undefined)
    return () => {
      abortCtrl.abort();
      // setMessage(undefined)
    }
  }, [slug]);

  const dispatchReset = useResetData();
  const update = async () => {
    if (refTitle && refTitle.current && refBody && refBody.current && uid && project) {
      if (refTitle.current.innerText.length === 0) return; // タイトルがなければ登録しない

      const tagText = refTags && refTags.current ? refTags.current.innerText.replaceAll(' ', '') : '_istag';

      const data: ContentForUpload = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        slug: slug,
        project: project,
        tags: tagText === '_istag' ? [] : tagText.length === 0 ? ['_notag'] : tagText.split(",").filter(v => v !== ''),
        content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
        image: imgURL,
      };

      const res = await postContent(data);
      dispatchReset(slug);
      console.log(res);
    }
  }

  const setTags = () => {
    let tags: string[];
    if (refTags && refTags.current) {
      if (refTags.current.innerText.length > 0) {
        tags = refTags.current.innerText.replaceAll(' ', '').split(',');
      } else {
        tags = ['_notag']
      }
      setTagsState(tags);
      update();
    }
  }

  const DeleteImage = () => {
    setImgURL(undefined);
    setImage('');
    window.scrollTo(0, 0);
  }

  const closeToast = () => {
    setIsToast(false);
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='robots' content='noindex nofollow' />
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${slug}`} />
      </Helmet>
      <main className="editable" onKeyDown={(e) => KeyBinding(e)}>
        <div className='time'>
          {created_at ? <time dateTime={created_at}>{created_at.slice(0, 10)}</time> : ''}
          {updated_at ? <time dateTime={updated_at} className='time-updated_at'>↺ {updated_at.slice(0, 10)}</time> : ''}
        </div>
        <h1 className='content-title'
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refTitle}
          data-text="Title"
          onBlur={update}
        >
          {title}
        </h1>
        {tags && tags.length > 0
          ?
          <div className='content-tags'
            contentEditable={true}
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refTags}
            data-text="[ Tags ]"
            onBlur={setTags}
          >
            {tags.map((v, k) => (
              tags !== undefined ?
                tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                : ''
            ))}
          </div> : ''}
        <div className='content-body'
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={false}
          ref={refBody}
          data-text="Content"
          tabIndex={0}
          onBlur={update}
        >
          {content}
        </div>
        <ImageComponent imgURL={imgURL} DeleteImage={DeleteImage} />
        <div className='editable-option'>
          <ImageUploader isSetter={true} />
          <ImageSelector />
          {/*message && <ResponseMessage data={message} />*/}
          <div role='button' className='content-edit-trash-icon' onClick={() => setIsToast(true)}>
            <TrashIcon />
          </div>
          <ToastWarning
            mode={'content'}
            project={project}
            slug={slug}
            itemName={title}
            isToast={isToast}
            closeToast={closeToast}
            deleteFunc2={deleteContent}
          />
          {/*saved && <div className='toast-saved'>saved</div>*/}
        </div>
      </main>
    </>
  )
});

export default Main;

