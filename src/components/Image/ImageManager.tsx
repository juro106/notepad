import { FC, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ImageFile } from 'models/image-file';
import { useWarning } from 'hooks/useWarning';
import { useFetchImages } from 'hooks/useFetchImages';
import { useDeleteImage } from 'hooks/useDeleteImage';
import { useImagePreview } from 'hooks/useImagePreview';
import ImageUploader from './ImageUploader';
import ImagePreviewer from './ImagePreviewer';
import ToastWarning from 'components/Local/ToastWarning';
import PageTitle from 'components/Heading/PageTitle';
import Spinner from 'components/common/Spinner';

const ImageManager: FC = () => {
  const data = useFetchImages();

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
            <ImageUploader />
            <p>画像クリックで原寸大表示</p>
            <Images data={data} />
          </main>
        </div>
      </Suspense>
    </>
  );
}

const Images: FC<{ data: ImageFile[] | undefined }> = ({ data }) => {
  const { isPreview, openPreview } = useImagePreview();
  const { source, isOpen, dispatchOpen } = useWarning();
  const delFunc = useDeleteImage();

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
                <div className="image-list-menu-button-delete" onClick={() => dispatchOpen(v.name)}>☓ delete</div>
              </div>
            </li>
          ))}
        </ul>
        {isPreview && <ImagePreviewer />}
        {isOpen && <ToastWarning itemName={source} deleteFunc={delFunc} />}
      </>
    );
  }

  return <Spinner />
}

export default ImageManager;

