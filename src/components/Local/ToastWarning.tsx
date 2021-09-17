import { FC } from 'react';
import { useCloseModal } from 'hooks/useCloseModal';
import { useWarning } from 'hooks/useWarning';
import { usePushState } from 'hooks/usePushState';
import Overlay from 'components/Modal/Overlay';
import ModalContents from 'components/Modal/ModalContents';

const ToastWarning: FC<{
  itemName: string,
  slug?: string,
  caption?: string,
  tags?: string[],
  deleteFunc: (arg1: string, arg2?: string[]) => Promise<void>,
}> = ({
  itemName,
  caption,
  slug,
  tags,
  deleteFunc,
}) => {
    const { dispatchClose } = useWarning();
    const { elementRef, closeModal } = useCloseModal(dispatchClose);
    usePushState(dispatchClose, true);

    const handleDelete = async (arg: string) => {

      slug && tags
        ? deleteFunc(slug, tags) // content
        : deleteFunc(arg); // else

      dispatchClose();
    }

    return (
      <Overlay id='modal-wrapper' onClose={closeModal}>
        <ModalContents id='modal-inner-toast-warning' elRef={elementRef}>
          <div className="toast-warning-box">
            <div className="toast-warning-message">
              <p><b>「{itemName}」を本当に削除しますか？</b></p>
              {caption ? <p>{caption}</p> : ''}
            </div>
            <div className="select-box">
              <div className="button-yes" onClick={() => handleDelete(itemName)}>☓ delete</div>
              <div className="button-no" onClick={() => dispatchClose()}>cancel</div>
            </div>
          </div>
        </ModalContents>
      </Overlay>
    );
  }

export default ToastWarning;

