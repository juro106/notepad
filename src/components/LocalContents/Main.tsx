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

const Main: FC<{
  data: Content | undefined,
  changeState: (flg: boolean) => void,
  setResMsg: (arg: Message) => void,
}> = ({
  data,
  changeState,
  setResMsg,
}) => {
    const [imgURL, setImgURL] = useState<string | undefined>(undefined);
    const { uid } = useContext(AuthContext);
    const { project } = useContext(ProjectContext)
    const { ctxImgURL } = useContext(ImgSelectContext)
    const refTitle = useRef<HTMLDivElement>(null);
    const refTags = useRef<HTMLDivElement>(null);
    const refBody = useRef<HTMLDivElement>(null);
    const ctx = useImgSelectContext();

    const KeyBinding = (e: React.KeyboardEvent) => {
      if (e.code === 'Enter' && e.altKey) {
        update();
      }
    }

    // 初回読み込み時
    useEffect(() => {
      data && data.image
        ? setImgURL(data.image) // 既に画像があるならそれをセットする
        : setImgURL(undefined); // 別なページに移動したときに画像が残らないようにするため
    }, [data])

    // upload or select で画像をセット
    useEffect(() => {
      ctxImgURL !== '' && setImgURL(ctxImgURL)
    }, [ctxImgURL])

    const slug = data ? data.slug : '';
    // const presetImg = data && data.image;
    // console.log('slug:', slug);

    const update = async () => {
      if (refBody && refBody.current && refTitle && refTitle.current && refTags && refTags.current && uid && project) {
        if (refTitle.current.innerText.length === 0) return; // タイトルがなければ登録しない
        const data: Content = {
          user: uid,
          title: refTitle.current.innerText.trim(),
          // slug: refTitle.current.innerText.trim().replaceAll(' ', '_').replaceAll('　', '_'),
          slug: slug,
          project: project,
          tags: refTags.current.innerText.replaceAll(' ', '').split(",").filter(v => v !== ''),
          content: refBody.current.innerText.replaceAll('\n\n\n', '\n\n'),
          image: imgURL,
        };

        // console.log('tags:', data.tags);

        const res = await postContent(data);
        changeState(true);
        setResMsg(res);
        // setImgURL(undefined);
        // console.log(res);
      }
    }

    useEffect(() => {
      window.scrollTo(0, 0);
      console.log('scroll', slug);
    }, [slug])

    const DeleteImage = () => {
      const input = document.getElementById('upload-image') as HTMLInputElement;
      const imgTag = document.getElementById('preview') as HTMLImageElement;
      input.value = '';
      imgTag.src = '';
      ctx.setCurrentImgURL('');
      setImgURL(undefined);
      window.scrollTo(0, 0);
    }

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
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTitle}
              data-text="Title"
              onBlur={update}
            >
              {data && data.title}
            </h1>
            <div className='content-tags'
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refTags}
              data-text="[ Tags ]"
              onBlur={update}
            >
              {data && data.tags ? data.tags.map((v, k) => (
                data.tags !== undefined ?
                  data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                  : ''
              )) : ''}
            </div>
            <div className='content-body'
              contentEditable={uid !== '' ? true : false} // ログインユーザーのみ編集可能
              suppressContentEditableWarning={true}
              spellCheck={false}
              ref={refBody}
              data-text="Content"
              tabIndex={0}
              onBlur={update}
            >
              {data && data.content}
            </div>
            <ImageComponent imgURL={imgURL} DeleteImage={DeleteImage} />
            <div className='editable-option'>
              <ImageUploader isSetter={true} />
              <ImageSelector />
              <button className="save" onClick={update}>save</button>
            </div>
          </main>
        </HelmetProvider>
      )
    }

    return <></>
  }

export default Main;

