import {
  FC,
  useContext,
  // useState
} from 'react';
import { ImgSelectContext, useImgSelectContext } from 'contexts/imgSelectContext';
import { ProjectContext } from 'contexts/projectContext';
import { useQuery } from 'react-query';
import getImages from 'services/get-images';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';
// import ImagePreview from 'components/ImagePreview';
import { ImImages } from 'react-icons/im'

const ImageSelector: FC = () => {
  const ctx = useImgSelectContext();
  const { show } = useContext(ImgSelectContext);

  const openSelector = () => {
    ctx.setCurrentState(true);
  }

  return (
    <>
      <div
        className='image-selector-icon'
        role='button'
        onClick={openSelector}
        data-html={true}
        data-tooltip='select an image&#13;&#10;画像を選択'>
        <ImImages size={30} color={'#666'} />
      </div>
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
              <div className="image-item-box" onClick={() => setImage(v)}>
                <img src={v} alt={v} title={v} decoding='async' className='image-item' />
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

  return <div className="spinner"></div>
}

export default ImageSelector;

