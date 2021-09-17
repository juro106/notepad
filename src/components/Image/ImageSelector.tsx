import { FC } from 'react';
import { useQuery } from 'react-query';
import { useProject } from 'hooks/useProject';
import { useSetImage } from 'hooks/useSetImage';
import { useImageSelector } from 'hooks/useImageSelector';
import { usePushState } from 'hooks/usePushState';
import { useCloseModal } from 'hooks/useCloseModal';
import getImages from 'services/get-images';
import Overlay from 'components/Modal/Overlay';
import ModalContents from 'components/Modal/ModalContents';
// import ImagePreview from 'components/ImagePreview';
import { ImImages } from 'react-icons/im'
import { ImageFile } from 'models/image-file'
import PageTitle from 'components/Heading/PageTitle';
import Spinner from 'components/common/Spinner';

const ImageSelector: FC = () => {
  const { selectorState, openImageSelector, closeImageSelector } = useImageSelector();
  // ブラウザバックで閉じる
  usePushState(closeImageSelector, selectorState);

  return (
    <>
      <div
        className='image-selector-icon'
        role='button'
        onClick={() =>openImageSelector()}
        data-html={true}
        data-tooltip='select an image&#13;&#10;画像を選択'>
        <ImImages size={30} color={'#666'} />
      </div>
      {selectorState && <Contents />}
    </>
  );
}

const Contents: FC = () => {
  const { selectorState, closeImageSelector } = useImageSelector();
  const project = useProject();

  const { elementRef, closeModal } = useCloseModal(closeImageSelector);

  const { data } = useQuery(['images-all', project], () => getImages(project));
  // console.log(data);
  if (selectorState) {
    return (
      <Overlay id='image-selector-wrapper' onClose={closeModal}>
        <ModalContents id='image-selector-contents' elRef={elementRef}>
          <PageTitle>画像を選択</PageTitle>
          <Images data={data} />
          <div className="image-selector-button-close" onClick={closeImageSelector}>close</div>
        </ModalContents>
      </Overlay>
    );
  }

  return <></>
}

const Images: FC<{ data: ImageFile[] | undefined }> = ({ data }) => {
  const setImage = useSetImage();
  const { closeImageSelector } = useImageSelector();

  const setImageSrc = (arg: string) => {
    setImage(arg);
    closeImageSelector();
  }

  // const [url, setUrl] = useState<string>('');
  // const [isPreview, setIsPreview] = useState(false);
  // const showPreview = (arg: string) => {
  //   setIsPreview(true);
  //   setUrl(arg)
  // }
  // const setPreviewState = () => {
  //   setIsPreview(false);
  // }

  if (data) {
    return (
      <>
        <ul className='image-list'>
          {data.map((v, k) => (
            <li key={`img_${k}`} className='image-list-item'>
              <div className="image-item-box" onClick={() => setImageSrc(v.name)}>
                <img src={v.name} alt={v.name} title={v.name} decoding='async' className='image-item' />
              </div>
              {/* プレビューは不要だと感じたので消去 2021/08/10
              <div className="image-list-menu">
                <div className="image-list-menu-button" onClick={() => setImage(v)}>set image</div>
              </div>
              */}
            </li>
          ))}
        </ul>
        {/* プレビューは不要だと感じたので消去 2021/08/10
          <ImagePreview url={url} isPreview={isPreview} closePreview={setPreviewState} />*/}
      </>
    );
  }

  return <Spinner />
}

export default ImageSelector;

