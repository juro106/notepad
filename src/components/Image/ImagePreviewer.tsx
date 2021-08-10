import { FC, useEffect } from 'react';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';

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

    useEffect(() => {
      // プレビューが呼ばれたときに初めて pushState する。
      if (isPreview) {
      window.history.pushState(null, '', null);
      window.addEventListener('popstate',
        (event: PopStateEvent) => {
          event.preventDefault();
          // console.log('browser back');
          closePreview();
        },
        { once: true })
      }
    }, [closePreview, isPreview])

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

