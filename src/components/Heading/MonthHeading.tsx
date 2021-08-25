import {FC} from 'react';

const MonthHeading: FC<{text: string}> = ({text}) => {
  const newText = text.replace('-', '年');
  return <h2 className='YYYYmm-heading'>{`${newText}月`}</h2>;
}

export default MonthHeading;

