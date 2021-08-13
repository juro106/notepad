import { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi'

type TrashIconProps = {
  size?: number;
  color?: string;
}

const TrashIcon: FC<TrashIconProps> = ({ size=26, color='#f00' }) => {
  return <HiOutlineTrash size={size} color={color} />
}

export default TrashIcon;

