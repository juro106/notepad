import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content } from 'models/content';
import DeleteContent from 'services/delete-content';

const Page: FC<{
  data: Content[] | undefined,
  changeState: (flg: boolean) => void,
}> = ({
  data,
  changeState,
}) => {

    const deleteItem = async (arg: string) => {
      const msg = await DeleteContent(arg);
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
                  <Link to={`/v1/${v.slug.trim()}`} className="item-link">
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
