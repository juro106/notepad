import {FC} from 'react';

const DayHeading: FC<{text: string}> = ({text}) => {
  const newText = text.replace('-', '年').replace('-', '月');
  return <h3 className='YYYYmmdd-heading'>{`${newText}日`}</h3>;
}

export default DayHeading;

