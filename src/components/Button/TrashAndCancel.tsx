import { FC } from 'react';
import TrashIcon from 'components/Button/TrashIcon';
import { useLayout } from 'hooks/useLayout';

const TrashAndCancel: FC<{ isCancel: boolean, setIsCancel: (arg: boolean) => void }> = ({ isCancel, setIsCancel }) => {
  const { grid } = useLayout();

  return (
    <div className={isCancel && grid ? 'delete-button-cancel' : grid ? 'delete-button-grid' : 'delete-button-default'}
      onClick={() => setIsCancel(!isCancel)}>
      {isCancel
        ? <div className={grid ? 'button-no-grid' : 'button-no'}>cancel</div>
        : <div className={grid ? 'button-trash-grid' : 'button-trash'}><TrashIcon /></div>}
    </div>
  );
}

export default TrashAndCancel;

