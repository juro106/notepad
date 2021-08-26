import { FC } from 'react';
import TrashIcon from 'components/Button/TrashIcon';
import { useLayout } from 'hooks/useLayout';

const TrashAndCancel: FC<{ isCancel: boolean, setIsCancel: (arg: boolean) => void }> = ({ isCancel, setIsCancel }) => {
  const { grid } = useLayout();

  return (
    <div className={grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsCancel(!isCancel)}>
      {isCancel ? <div className='button-no'>cancel</div> : <TrashIcon />}
    </div>
  );
}

export default TrashAndCancel;

