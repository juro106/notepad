import { FC, useState, useEffect } from 'react';
import { Message } from 'models/message';

const ResponseMessage: FC<{ data: Message | undefined }> = ({ data }) => {
  const [state1, update1] = useState<string | undefined>(undefined);
  const [state2, update2] = useState<string | undefined>(undefined);

  const showToast = (arg1: string, arg2: string) => {
    update1(arg1);
    update2(arg2);
    setTimeout(() => {
      update1(undefined)
      update2(undefined)
    }, 4000);
  }

  useEffect(() => {
    if (data) {
      const { message, updated_at } = data;
      const msg1 = `update ${message}!!`
      const msg2 = ` ${updated_at}`;
      showToast(msg1, msg2);
    }
  }, [data]);

  if (data) {
    return (
      <>
        <div className="info">
          <span className="message">last update: {data.updated_at}</span>
        </div>
        {state1 && state2
          ?
          <div className="toast-update">
            <div className='toast-contents'>
              <div className='toast-line1'>{state1}</div>
              <div className='toast-line2'>{state2}</div>
            </div>
          </div>
          : ''}
      </>
    );
  }

  return <></>
}

export default ResponseMessage;

