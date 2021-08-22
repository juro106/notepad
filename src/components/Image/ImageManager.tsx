import { FC, useState, useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useQuery } from 'react-query';
import getImages from 'services/get-images';
import deleteImage from 'services/delete-image';
import { ImageFile } from 'models/image-file';
import { useProject } from 'hooks/useProject';
import ImageUploader from './ImageUploader';
import ImagePreviewer from './ImagePreviewer';
import ToastWarning from 'components/Local/ToastWarning';
import PageTitle from 'components/Heading/PageTitle';
import Spinner from 'components/common/Spinner';

const ImageManager: FC = () => {
  const [data, setData] = useState<ImageFile[] | undefined>(undefined);
  const [flg, setFlg] = useState<boolean>(false);
  const project = useProject();
  // const { data } = useQuery(['images'], () => getImages(project));

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }

  // 初回
  useEffect(() => {
    const fetch = async () => {
      const res = await getImages(project);
      setData(res);
    }
    fetch();
    window.scrollTo(0, 0);
  }, [project])

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

  return (
    <>
      <Helmet>
        <title>Image Manager</title>
        <meta name='robots' content='noindex nofollow' />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div id="image-manager-wrapper">
          <main id='image-manager-inner'>
            <PageTitle>画像を管理</PageTitle>
            <ImageUploader changeState={changeState} />
            <p>画像クリックで原寸大表示</p>
            <Images data={data} changeState={changeState} />
          </main>
        </div>
      </Suspense>
    </>
  );
}

const Images: FC<{ data: ImageFile[] | undefined, changeState: (arg: boolean) => void }> = ({ data, changeState }) => {
  const [url, setUrl] = useState<string>('');
  const [isPreview, setIsPreview] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const openPreview = (arg: string) => {
    setIsPreview(true);
    setUrl(arg);
  }

  const closePreview = () => {
    setIsPreview(false);
  }

  const openToast = (arg: string) => {
    setIsToast(true);
    setUrl(arg);
  }
  const closeToast = () => {
    setIsToast(false);
  }

  // const DeleteImage = async (arg: string) => {
  //   const res = await deleteImage(arg);
  //   console.log(res);
  //   changeState(true);
  // }
  //
  if (data) {
    return (
      <>
        <ul className='image-list'>
          {data.map((v, k) => (
            <li key={`img_${k}`} className='image-list-item'>
              {/*
              <a className="image-item-box" href={v} target='_blank' rel='noopenner noreferrer'>
                <img src={v} alt={v} decoding='async' className='image-item' />
              </a>
              */}
              <div className="image-item-box" onClick={() => openPreview(v.name)}>
                <img src={v.name} alt={v.name} title={v.name} decoding='async' className='image-item' />
              </div>
              <div className="image-list-menu">
                <div className="image-list-menu-button-delete" onClick={() => openToast(v.name)}>☓ delete</div>
              </div>
            </li>
          ))}
        </ul>
        <ImagePreviewer url={url} isPreview={isPreview} closePreview={closePreview} />
        <ToastWarning
          itemName={url}
          isToast={isToast}
          changeState={changeState}
          closeToast={closeToast}
          deleteFunc={deleteImage}
        />
      </>
    );
  }

  return <Spinner />
}

export default ImageManager;

