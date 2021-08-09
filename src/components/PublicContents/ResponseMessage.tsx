import { FC } from 'react';
import { Message } from 'models/message';

const ResponseMessage: FC<{ data: Message | undefined }> = ({ data }) => {
  if (data) {
    return (
      <div className="info">
        <span className="message">update: {data.message} {data.updated_at}</span>
      </div>
    );
  }

  return <></>
}

export default ResponseMessage;

