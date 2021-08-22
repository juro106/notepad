import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Content } from 'models/content';
import deleteContent from 'services/delete-content';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import Spinner from 'components/common/Spinner';

const Page: FC<{ data: Content[] | undefined, project: string, changeState: (flg: boolean) => void, }> = ({ data, project, changeState, }) => {

  if (data && data.length > 0) {
    return (
      <ul className='edit-list'>
        {data.map(v => (
          <Item
            key={v.slug}
            data={v}
            changeState={changeState}
          />
        ))}
      </ul>
    );
  } else if (data && data.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <Spinner />
}

const Item: FC<{ data: Content, changeState: (arg: boolean) => void }> = ({ data, changeState }) => {
  const { title, slug, content, project, created_at, tags } = data;
  const deleteItem = async (slug: string) => {
    const msg = await deleteContent(project, slug);
    console.log(msg);
    changeState(true);
  }

  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  return (
    <>
      {tags && tags[0] !== '_istag' ?
        <li className='edit-list-item'>
          <Link to={`/local/${project}/${slug.trim()}`} className="edit-item-link">
            <div className="item-title">{title}</div>
            <div className="item-dscr">{created_at.slice(0, 10)}: {content.slice(0, 100)}</div>
          </Link>
          <MiniToastWarning
            itemName={title}
            slug={slug}
            isToast={isToast}
            closeToast={closeToast}
            deleteFunc={deleteItem}
          />
          <div className="edit-delete">
            <div className={isToast ? 'hidden' : 'delete-button'} onClick={() => setIsToast(true)}>
              <TrashIcon />
            </div>
          </div>
        </li>
        : ''}
    </>
  );
}

export default Page;
