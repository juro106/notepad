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
      const msg = await DeleteContent({uid, slug});
      console.log(msg);
      changeState(true);
    }

    if (data && data.length > 0) {
      return (
        <table className='edit-table'>
          <tbody>
            {data.map((v, k) => (
              <tr key={`t_${k}`} className='edit-tr'>
                <td className='edit-td'>
                  <Link to={`/${v.slug.trim()}`} className="item-link">
                    <div className="item-title">{v.title}</div>
                    <div className="item-dscr">{v.content.slice(0, 50)}</div>
                  </Link>
                </td>
                <td className='edit-td'>
                  <button
                    className='delete-button'
                    onClick={() => deleteItem(`${v.slug}`)}
                  >
                    delete ☒
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <></>;
  }

export default Page;
