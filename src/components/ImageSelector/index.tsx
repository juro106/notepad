import { FC, useContext, useState } from 'react';
import { ImgSelectContext, useImgSelectContext } from 'contexts/imgSelectContext';
import { ProjectContext } from 'contexts/projectContext';
import { useQuery } from 'react-query';
import getImages from 'services/get-images';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';

type Props = {
  show?: boolean;
}

const ImageSelector: FC<Props> = (props) => {
  const ctx = useImgSelectContext();
  const { show } = useContext(ImgSelectContext);

  const openSelector = () => {
    ctx.setCurrentState(true);
  }
  return (
    <>
      <div className='image-selector-button-open' onClick={openSelector}>select image</div>
      {show && <Contents />}
    </>
  );

}

const Contents: FC = () => {
  const { show } = useContext(ImgSelectContext);
  const { project } = useContext(ProjectContext)
  // console.log(show);
  const ctx = useImgSelectContext();

  const closeSelector = () => {
    ctx.setCurrentState(false);
  }

  const { elementRef, closeModal } = useCloseModal(closeSelector);

  const { data } = useQuery(['images'], () => getImages(project));
  // console.log(data);


  if (show) {
    return (
      <Overlay id='image-selector-wrapper' onClose={closeModal}>
        <ModalContents id='image-selector-contents' elRef={elementRef}>
          <h1>画像を選択</h1>
          <Images data={data} />
          <div className="image-selector-button-close" onClick={closeSelector}>close</div>
        </ModalContents>
      </Overlay>
    );
  }

  return <></>
}


const Images: FC<{ data: string[] | undefined }> = ({ data }) => {
  const ctx = useImgSelectContext();
  const setImage = (arg: string) => {
    ctx.setCurrentImgURL(arg);
    ctx.setCurrentState(false);
  }

  const [url, setUrl] = useState<string>('');
  const [on, setOn] = useState(false);
  const showPreview = (arg: string) => {
    setOn(true);
    setUrl(arg)
  }
  const setPreviewState = () => {
    setOn(false);
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
                <div className="image-list-menu-button" onClick={() => setImage(v)}>set image</div>
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

export default ImageSelector;

