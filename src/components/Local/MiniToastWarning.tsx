import { FC } from 'react';

const MiniToastWarning: FC<{
  itemName: string,
  slug: string,
  isToast: boolean,
  changeState?: (arg: boolean) => void
  closeToast: () => void
  deleteFunc: (arg: string) => void,
  grid?: boolean,
}> = ({
  itemName,
  isToast,
  slug,
  changeState,
  closeToast,
  deleteFunc,
  grid,
}) => {

    const handleDelete = async (arg: string) => {
      deleteFunc(arg);
      closeToast();
      changeState && changeState(true); // 処理が終わったら再描写させる
    }

    if (isToast) {
      return (
        <div className={grid ? 'select-box-grid' : "select-box"}>
          <div className={grid ? 'button-yes-grid' : "button-yes"} onClick={() => handleDelete(slug)}>☓ delete</div>
          <div className={grid ? 'button-no-grid' : "button-no"} onClick={() => closeToast()}>cancel</div>
        </div>
      );
    }

    return <></>;
  }

export default MiniToastWarning;

