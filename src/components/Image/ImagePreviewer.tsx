import { FC } from 'react';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Modal/Overlay';
import ModalContents from 'components/Modal/ModalContents';
import { usePushState } from 'hooks/usePushState';
import { useImagePreview } from 'hooks/useImagePreview';

const ImagePreviewer: FC = () => {
  const { source, isPreview, closePreview } = useImagePreview();
  const { elementRef, closeModal } = useCloseModal(closePreview);
  usePushState(closePreview, isPreview);

  return (
    <Overlay id='modal-preview-wrapper' onClose={closeModal}>
      <ModalContents id='modal-preview-inner' elRef={elementRef}>
        <div id="modal-preview-img-outer">
          <img id='modal-preview-img' src={source} alt='' title={source} />
        </div>
        {/*<div className="button-preview-close" onClick={() => closePreview()}>☓ close</div>*/}
      </ModalContents>
    </Overlay>
  );
}

export default ImagePreviewer;

