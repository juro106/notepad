import { FC, useContext, useRef, useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import { ImgSelectContext, useImgSelectContext } from 'contexts/imgSelectContext';
import postContent from 'services/post-content'
import { Content } from 'models/content';
// import { Message } from 'models/message';
import ImageComponent from 'components/Image/ImageComponent';
import ImageUploader from 'components/Image/ImageUploader';
import ImageSelector from 'components/Image/ImageSelector';
// import ResponseMessage from './ResponseMessage';
import deleteContent from 'services/delete-content';
import ToastWarning from 'components/Local/ToastWarning';
import TrashIcon from 'components/Button/TrashIcon'

const Main: FC<{
  data: Content | undefined,
  setTagsState: (tags: string[]) => void,
  // setResMsg?: (arg: Message) => void,
}> = memo(({
  data,
  setTagsState,
  // setResMsg,
}) => {
  // const [titleText, setTitleText] = useState<string>('');
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  // const [isPostable, setIsPostable] = useState<boolean>(false);
  const [isToast, setIsToast] = useState(false);
  // const [message, setMessage] = useState<Message | undefined>(undefined);
  // const [saved, setSaved] = useState<boolean>(false);
  const { uid } = useContext(AuthContext);
  const { project } = useContext(ProjectContext)
  const { ctxImgURL } = useContext(ImgSelectContext)
  const refTitle = useRef<HTMLDivElement>(null);
  const refTags = useRef<HTMLDivElement>(null);
  const refBody = useRef<HTMLDivElement>(null);
  const ctx = useImgSelectContext();
  const slug = data ? data.slug : '';
  // const isTag = data ? data.tags === [] ? true : false : false;

  const KeyBinding = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && e.altKey) {
      update();
    }
  }

  // 初回 画像セット
  useEffect(() => {
    data && setImgURL(data.image);
    // data && setTitleText(data.title);
  }, [data]);

  // upload image or select image で画像をセット
  useEffect(() => {
    ctxImgURL !== '' && setImgURL(ctxImgURL)
  }, [ctxImgURL])

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

  // const characterCount = (e: React.ChangeEvent<HTMLDivElement>) => {

  //   setTitleText(e.target.innerText);
  // }
  const update = async () => {
    if (refTitle && refTitle.current && refBody && refBody.current && uid && project) {
      if (refTitle.current.innerText.length === 0) return; // タイトルがなければ登録しない

      const tagText = refTags && refTags.current ? refTags.current.innerText.replaceAll(' ', '') : '_istag';

      const data: Content = {
        user: uid,
        title: refTitle.current.innerText.trim(),
        slug: slug,
        project: project,
        tags: tagText === '_istag' ? [] : tagText.length === 0 ? ['_notag'] : tagText.split(",").filter(v => v !== ''),
        content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
        image: imgURL,
      };

      // setSaved(false);
      // setMessage(undefined);
      const res = await postContent(data);
      // changeState(true);
      console.log(res);
      // setResMsg(res);
      // setMessage(res);
      // setSaved(true);
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
    ctx.setCurrentImgURL('');
    setImgURL(undefined);
    window.scrollTo(0, 0);
  }

  const closeToast = () => {
    setIsToast(false);
  }

  // <div className="button-save-box">
  //   <div role='button' className={isPostable ? 'save_isActive' : 'save_isNotActive'} onClick={update} tabIndex={0}>save</div>
  // </div>
  if (data) {
    return (
      <>
        <Helmet>
          <title>{data.title}</title>
          <meta name='robots' content='noindex nofollow' />
          <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${slug}`} />
        </Helmet>
        <main className="editable" onKeyDown={(e) => KeyBinding(e)}>
          <h1 className='content-title'
            contentEditable={true}
            suppressContentEditableWarning={true}
            spellCheck={false}
            ref={refTitle}
            data-text="Title"
            // onInput={characterCount}
            onBlur={update}
          >
            {data.title}
          </h1>
          {data.tags && data.tags.length > 0
            ?
            <div className='content-tags'
              contentEditable={true}
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTags}
              data-text="[ Tags ]"
              onBlur={setTags}
            >
              {data.tags.map((v, k) => (
                data.tags !== undefined ?
                  data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
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
            {data.content}
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
              itemName={data && data.title}
              isToast={isToast}
              closeToast={closeToast}
              deleteFunc2={deleteContent}
            />
            {/*saved && <div className='toast-saved'>saved</div>*/}
          </div>
        </main>
      </>
    )
  }

  return <></>
});

export default Main;

