import { FC, useContext, useState, useEffect, Suspense } from 'react';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { useQuery } from 'react-query';
import getImages from 'services/get-images';
import deleteImage from 'services/delete-image';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';
import Projcets from 'components/UserHome/Projects';
import ImageUploader from 'components/ImageUploader';

const ImageManager: FC = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<string[] | undefined>(undefined);
  const [flg, setFlg] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [isEmptyProject, setIsEmptyProject] = useState<boolean>(false);
  const { project } = useContext(ProjectContext)
  // const { data } = useQuery(['images'], () => getImages(project));

  const changeState = (arg: boolean) => {
    setFlg(arg);
    setIsEmptyProject(false);
  }

  // 初回
  useEffect(() => {
    const fetch = async () => {
      if (project !== '') {
        const res = await getImages(project);
        setData(res);
      } else {
        setIsEmptyProject(true)
      }
    }
    fetch();
    setLoad(true);
  }, [project, isEmptyProject])


  // 2回目移行（消去して変化があったとき）
  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      const res = await getImages(project);
      setData(res);
    }
    if (flg) {
      fetch();
    }
    return () => {
      setFlg(false);
      abortCtrl.abort();
    }
  }, [flg, project])


  if (isLoggedIn) {
    return (
      <HelmetProvider>
        <Helmet>
          {load &&
            <>
              <title>Image Manager</title>
              <meta name='robots' content='noindex nofollow' />
            </>
          }
        </Helmet>
        {isEmptyProject
          ?
          <Suspense fallback={<div className="spinner"></div>}>
            <div className='info'><p className='red'>プロジェクト選択してください</p></div>
            <Projcets refer={'image-manager'} changeState={changeState} />
          </Suspense>
          :
          <Suspense fallback={<div className="spinner"></div>}>
            <div id="image-manager-wrapper">
              <main id='image-manager-inner'>
                <h1>画像を管理</h1>
                <ImageUploader changeState={changeState} />
                <p>画像クリックで原寸大表示</p>
                <Images data={data} changeState={changeState} />
              </main>
            </div>
          </Suspense>
        }
      </HelmetProvider>
    );
  }

  return <></>
}

const Images: FC<{ data: string[] | undefined, changeState: (arg: boolean) => void }> = ({ data, changeState }) => {
  const [url, setUrl] = useState<string>('');
  const [on, setOn] = useState(false);
  const showPreview = (arg: string) => {
    setOn(true);
    setUrl(arg)
  }
  const setPreviewState = () => {
    setOn(false);
  }

  const DeleteImage = async (arg: string) => {
    const res = await deleteImage(arg);
    console.log(res);
    changeState(true);
  }

  if (data) {
    return (
      <>
        <ul className='image-list'>
          {data.map((v, k) => (
            <li key={`img_${k}`} className='image-list-item'>
              <div className="image-item-box" onClick={() => showPreview(v)}>
                <img src={v} alt={v} decoding='async' className='image-item' />
              </div>
              <div className="image-list-menu">
                <div className="image-list-menu-button" onClick={() => DeleteImage(v)}>delete</div>
              </div>
            </li>
          ))}
        </ul>
        <Preview url={url} on={on} setPreviewState={setPreviewState} />
      </>
    );
  }

  return <div className="spinner"></div>
}

const Preview: FC<{ url: string, on: boolean, setPreviewState: () => void }> = ({ url, on, setPreviewState }) => {

  const { elementRef, closeModal } = useCloseModal(setPreviewState);

  if (on) {
    return (
      <Overlay id='modal-preview-wrapper' onClose={closeModal}>
        <ModalContents id='modal-preview-inner' elRef={elementRef}>
          <div id="modal-preview-img-outer">
            <img id='modal-preview-img' src={url && url} alt='' />
          </div>
          <div className="button-preview-close" onClick={() => setPreviewState()}>close</div>
        </ModalContents>
      </Overlay>
    );
  }

  return <></>;
}

export default ImageManager;

