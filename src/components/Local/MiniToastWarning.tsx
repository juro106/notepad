import { FC } from 'react';
import { useLayout } from 'hooks/useLayout';

const MiniToastWarning: FC<{
  slug: string,
  deleteFunc: (arg: string) => void,
}> = ({ slug, deleteFunc }) => {
  const { grid } = useLayout();
  const handleDelete = async (arg: string) => {
    deleteFunc(arg);
  }

  return (
    <div className={grid ? 'select-box-grid' : "select-box"}>
      <div className={grid ? 'button-yes-grid' : "button-yes"} onClick={() => handleDelete(slug)}>☓ delete</div>
      {/*<div className={grid ? 'button-no-grid' : "button-no"} onClick={() => closeToast()}>cancel</div>*/}
    </div>
  );
}

export default MiniToastWarning;

