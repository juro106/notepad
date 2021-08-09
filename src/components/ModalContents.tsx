import { FC } from 'react';

const ModalContents: FC<{ id: string, elRef: React.RefObject<HTMLDivElement> }> = ({ id, elRef, children }) => {
  return (
    <div id={id} ref={elRef}>
      {children}
    </div>
  );
}

export default ModalContents;
