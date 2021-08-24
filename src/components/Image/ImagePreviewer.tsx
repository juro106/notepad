import { FC } from 'react';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Modal/Overlay';
import ModalContents from 'components/Modal/ModalContents';
import { usePushState } from 'hooks/usePushState';

const ImagePreviewer: FC<{
  url: string,
  isPreview: boolean,
  closePreview: () => void
}> = ({
  url,
  isPreview,
  closePreview
}) => {
    const { elementRef, closeModal } = useCloseModal(closePreview);
    usePushState(isPreview, closePreview);

    if (isPreview) {
      return (
        <Overlay id='modal-preview-wrapper' onClose={closeModal}>
          <ModalContents id='modal-preview-inner' elRef={elementRef}>
            <div id="modal-preview-img-outer">
              <img id='modal-preview-img' src={url} alt='' title={url}/>
            </div>
            {/*<div className="button-preview-close" onClick={() => closePreview()}>☓ close</div>*/}
          </ModalContents>
        </Overlay>
      );
    }

    return <></>;
  }

export default ImagePreviewer;

