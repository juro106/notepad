import { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi'

type TrashIconProps = {
  size?: number;
  color?: string;
  className?: string;
}

const TrashIcon: FC<TrashIconProps> = ({ className='icon-trash', size=26 }) => {
  return <HiOutlineTrash className={className} size={size} />
}

export default TrashIcon;

