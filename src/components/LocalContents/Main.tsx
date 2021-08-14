import { FC, useContext, useRef, useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import { ImgSelectContext, useImgSelectContext } from 'contexts/imgSelectContext';
import postContent from 'services/post-content'
import { Content } from 'models/content';
import { Message } from 'models/message';
import ImageComponent from 'components/Image/ImageComponent';
import ImageUploader from 'components/Image/ImageUploader';
import ImageSelector from 'components/Image/ImageSelector';
import ResponseMessage from './ResponseMessage';
import deleteContent from 'services/delete-content';
import ToastWarning from 'components/ToastWarning';
import { HiOutlineTrash } from 'react-icons/hi'

const Main: FC<{
  data: Content | undefined,
  changeState: (flg: boolean) => void,
  setResMsg?: (arg: Message) => void,
}> = ({
  data,
  changeState,
  // setResMsg,
}) => {
    // const [titleText, setTitleText] = useState<string>('');
    const [imgURL, setImgURL] = useState<string | undefined>(undefined);
    // const [isPostable, setIsPostable] = useState<boolean>(false);
    const [isToast, setIsToast] = useState(false);
    const [message, setMessage] = useState<Message | undefined>(undefined);
    // const [saved, setSaved] = useState<boolean>(false);
    const { uid } = useContext(AuthContext);
    const { project } = useContext(ProjectContext)
    const { ctxImgURL } = useContext(ImgSelectContext)
    const refTitle = useRef<HTMLDivElement>(null);
    const refTags = useRef<HTMLDivElement>(null);
    const refBody = useRef<HTMLDivElement>(null);
    const ctx = useImgSelectContext();
    const slug = data ? data.slug : '';

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

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [slug])

    // upload or select で画像をセット
    useEffect(() => {
      ctxImgURL !== '' && setImgURL(ctxImgURL)
    }, [ctxImgURL])

    // タイトルの文字数が0の場合、セーブボタンをoffにする
    // useEffect(() => {
    //   titleText.length > 0
    //     ? setIsPostable(true)
    //     : setIsPostable(false);
    // }, [titleText]);

    // unmount のときに fetch をキャンセル
    useEffect(() => {
      let abortCtrl = new AbortController();
      return () => {
        abortCtrl.abort();
      }
    }, []);

    // const characterCount = (e: React.ChangeEvent<HTMLDivElement>) => {
    //   setTitleText(e.target.innerText);
    // }

    const update = async () => {
      if (refTitle && refTitle.current && refBody && refBody.current && refTags && refTags.current && uid && project) {
        if (refTitle.current.innerText.length === 0) return; // タイトルがなければ登録しない
        const data: Content = {
          user: uid,
          title: refTitle.current.innerText.trim(),
          slug: slug,
          project: project,
          tags: refTags.current.innerText.replaceAll(' ', '').split(",").filter(v => v !== ''),
          content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
          image: imgURL,
        };

        // setSaved(false);
        setMessage(undefined);
        const res = await postContent(data);
        changeState(true);
        // setResMsg(res);
        setMessage(res);
        // setSaved(true);
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
    // const openToast = () => {
    //   setIsToast(true);
    // }
    const closeToast = () => {
      setIsToast(false);
    }

    // <div className="button-save-box">
    //   <div role='button' className={isPostable ? 'save_isActive' : 'save_isNotActive'} onClick={update} tabIndex={0}>save</div>
    // </div>
    if (data) {
      return (
        <HelmetProvider>
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
                onBlur={update}
              >
                {data.tags.map((v, k) => (
                data.tags !== undefined ?
                data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                : ''

                ))}
              </div> : '' }
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
              <div role='button' className='content-edit-trash-icon' onClick={() => setIsToast(true)}>
                <HiOutlineTrash size={26} color={'#f00'} />
              </div>
              <ToastWarning
                mode={'content'}
                project={project}
                slug={slug}
                itemName={data && data.title}
                isToast={isToast}
                changeState={changeState}
                closeToast={closeToast}
                deleteFunc2={deleteContent}
              />
              {/*saved && <div className='toast-saved'>saved</div>*/}
            </div>
          </main>
          <ResponseMessage data={message} />
        </HelmetProvider>
      )
    }

    return <></>
  }

export default Main;

