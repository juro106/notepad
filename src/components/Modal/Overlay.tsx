import { FC } from 'react';

const Overlay: FC <{
  id: string;
  onClose: (element: HTMLDivElement) => void;
}> = ({
  id,
  onClose, 
  children,
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClose && e.target instanceof HTMLDivElement) {
      onClose(e.target);
    }
  }

  return (
    <div id={id} className='overlay' onClick={onClickHandler}>
      {children}
    </div>
  );
}

export default Overlay;

