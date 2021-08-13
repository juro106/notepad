import { FC } from 'react';
import { Message } from 'models/message';

const ResponseMessage: FC<{ data: Message | undefined }> = ({ data }) => {

  return (
    <div className="update-info">
      {data && <span className="message">last update: {data.updated_at}</span>}
    </div>
  );

}

export default ResponseMessage;

