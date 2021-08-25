import { FC, memo, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import getTags from 'services/get-tags';
import deleteContent from 'services/delete-content';
import { TagNum } from 'models/content';
import { useProject } from 'hooks/useProject';
import ContentsListHeader from 'components/common/ContentsListHeader';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import { useLayout } from 'hooks/useLayout';

const LocalTags: FC = () => {
  const title = 'タグ一覧';

  return (
    <LocalPageOuter title={title} suspense={true}>
      <main>
        <Visuallyhidden children={title} />
        <ContentsListHeader />
        <Fetch />
      </main>
    </LocalPageOuter>
  );
}

const Fetch: FC = () => {
  const project = useProject();
  const { data } = useQuery(['tags-all', project, { sort_by: 'name', order_by: 'ASC' }], () => getTags(project));

  if (data) {
    return <ContentsList project={project} data={data} />
  }

  return <></>
}

const ContentsList: FC<{ project: string, data: TagNum[] }> = ({ project, data }) => {
  const [list, setList] = useState<TagNum[]>(data);
  const { grid } = useLayout();

  const deleteItem = async (slug: string) => {
    console.log('deleteItem!!!!');
    setList(list.filter(item => item.name !== slug));
    const msg = await deleteContent(project, slug);
    console.log(msg);
  }

  if (list && list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "item-list"}>
        {list.map(tag => (
          <Item key={`${tag.name}`} tag={tag} deleteItem={deleteItem} />
        ))}
      </ul>
    )
  } else {
    return (
      <div className='info-nocontent'>
        <p>タグがありません</p>
      </div>
    );
  }
}

const Item: FC<{ tag: TagNum, deleteItem: (arg: string) => void }> = memo(({ tag, deleteItem }) => {
  const { grid } = useLayout();
  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  return (
    <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
      <Link to={`/local/${tag.project}/${tag.name}`} className={grid ? 'grid-item-link-tag' : "edit-item-link-tag"}>
        <div className="edit-list-tag-title">{tag.name}</div>
        <div className="edit-list-tag-number">({tag.number})</div>
      </Link>
      {tag.number === 0 &&
        <>
          {isToast && <MiniToastWarning slug={tag.name} closeToast={closeToast} deleteFunc={deleteItem} />}
          <div className={isToast ? 'hidden' : grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsToast(true)}>
            <TrashIcon />
          </div>
        </>
      }
    </li>
  );
});

export default LocalTags;

