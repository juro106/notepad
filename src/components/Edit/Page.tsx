import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content } from 'models/content';
import DeleteContent from 'services/delete-content';

const Page: FC<{
  data: Content[] | undefined,
  uid: string,
  changeState: (flg: boolean) => void,
}> = ({
  data,
  uid,
  changeState,
}) => {
    const deleteItem = async (slug: string) => {
      const msg = await DeleteContent({ uid, slug });
      console.log(msg);
      changeState(true);
    }

    if (data && data.length > 0) {
      return (
        <ul className='edit-list'>
          {data.map((v, k) => (
            <li key={`t_${k}`} className='edit-list-item'>
              <Link to={`/local/${v.slug.trim()}`} className="edit-item-link">
                <div className="item-title">{v.title}</div>
                <div className="item-dscr">{v.content.slice(0, 50)}</div>
              </Link>
              <div className="edit-delete">
                <div className='delete-button' onClick={() => deleteItem(`${v.slug}`)}>
                  delete ☒
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    return <div className='spinner'></div>
  }

export default Page;
