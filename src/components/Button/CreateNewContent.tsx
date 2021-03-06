import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useMatch } from 'react-router';

const CreateNewContent: FC = () => {
  const New = useMatch('/local/new-contents');

  if (!New) {
    return (
      <Link to='/local/new-contents' className="create-new-link">
        <BsFillPlusSquareFill size={32} color={'#008600'} />
      </Link>
    )
  }

  return <></>
}

export default CreateNewContent;

