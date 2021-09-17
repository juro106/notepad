import { FC } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';

const DayHeading: FC<{ text: string }> = ({ text }) => {
  const newText = text.replace('-', '年').replace('-', '月');
  return <div className='date-header'><IoCalendarOutline /><h3 className='YYYYmmdd-heading'>{`${newText}日`}</h3></div>;
}

export default DayHeading;

