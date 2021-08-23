import { FC, useState, useEffect } from 'react';
import LoginButton from 'components/Login/LoginButton';
import Spinner from 'components/common/Spinner';

const TimeOut: FC = () => {
  const [flg, setFlg] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlg(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  if (flg) {
    return (
      <div className='hi-people'>
        ログインが必要です。
        <LoginButton />
      </div>
    );
  }

  return <Spinner />
}

export default TimeOut;

