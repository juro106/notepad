import { FC } from 'react';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';
import { Message } from 'models/message';


const ToastWarning: FC<{
  itemName: string,
  caption?: string,
  isToast: boolean,
  changeState: (arg: boolean) => void
  closeToast: () => void
  deleteFunc: (arg: string) => Promise<Message>

}> = ({
  itemName,
  isToast,
  caption,
  changeState,
  closeToast,
  deleteFunc,
}) => {
    const { elementRef, closeModal } = useCloseModal(closeToast);

    const handleDelete = async (arg: string) => {
      const res = await deleteFunc(arg);
      console.log(res);
      closeToast();
      changeState(true); // 処理が終わったら再描写させる
    }

    if (isToast) {
      return (
        <Overlay id='modal-wrapper' onClose={closeModal}>
          <ModalContents id='modal-inner-toast-warning' elRef={elementRef}>
            <div className="toast-warning-box">
              <div className="toast-warning-message">
                <p><b>「{itemName}」を本当に削除しますか？</b></p>
                {caption ? <p>※プロジェクト内のすべてのコンテンツが消去されます。</p> : ''}
              </div>
              <div className="select-box">
                <div className="button-yes" onClick={() => handleDelete(itemName)}>☓ delete</div>
                <div className="button-no" onClick={() => closeToast()}>cancel</div>
              </div>
            </div>
          </ModalContents>
        </Overlay>
      );
    }

    return <></>;
  }

export default ToastWarning;

