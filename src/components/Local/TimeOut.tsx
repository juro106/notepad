import { FC, useState, useEffect } from 'react';
import Spinner from 'components/common/Spinner';

const TimeOut: FC = () => {
  const [flg, setFlg] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlg(true);     
    }, 3000);
    return () => clearTimeout(timer);
  },[])

  if (flg) {
    return (
      <>
      <div className='center'>このページの閲覧にはログインが必要です。</div>
      </>
    );
  }

  return <Spinner />
}

export default TimeOut;

