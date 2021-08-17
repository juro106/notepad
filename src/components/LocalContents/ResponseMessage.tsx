import { FC } from 'react';
import { Message } from 'models/message';

const ResponseMessage: FC<{ data: Message }> = ({ data }) => {
  const { updated_at } = data;

  return (
    <div className="update-info">
      {updated_at && <span className="message">🆙:{updated_at.slice(0, 19)}</span>}
    </div>
  );

}

export default ResponseMessage;

