import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content, RelatedContents, RelatedList } from 'models/content';
import { useParams } from 'react-router';
import { useLayout } from 'hooks/useLayout';
import { useProject } from 'hooks/useProject';
import RelatedMenu from 'components/common/RelatedMenu';

// local
const Related: FC<{ data: RelatedList | undefined, project: string, }> = ({ data, project, }) => {

  if (data && data.length > 0) {
    return (
      <div className='related-contents'>
        <RelatedMenu />
        {data.map((v, i) => (
          <ItemBlock key={`block_${i}`} data={v} project={project} />
        ))}
      </div>
    )
  }

  return <></>
}

const ItemBlock: FC<{ data: RelatedContents, project: string }> = ({ data, project }) => {
  const { slug } = useParams();
  const { grid } = useLayout();

  if (data) {
    return (
      <>
        {Object.entries(data).map(v => (
          <div className='item-block' key={`ul_${v[0]}`} >
            <h3 className='related-heading'>
              <Link to={`/local/${project}/${v[0]}`} className='related-heading-link'>
                {v[0]}
              </Link>
            </h3>
            <ul className={grid ? 'grid-list' : 'related-item-list'}>
              {v[1].map(x => (
                x.slug !== slug
                  ? <ListItem key={x.slug} data={x} />
                  : ''
              ))}
            </ul>
          </div>
        ))}
      </>
    )
  }

  return <></>
}

const ListItem: FC<{ data: Content }> = ({ data }) => {
  const { title, slug, updated_at, content } = data;
  const { grid } = useLayout();
  const project = useProject();

  return (
    <>
      <li key={`li_${title}`} className={grid ? 'grid-list-item' : 'item-arrow'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : 'item-link'}>
          <div className={grid ? 'item-content-grid' : 'item-content'}>
            <div className='item-title'>{title}</div>
            <div className='item-dscr'>{updated_at}: {content.slice(0, 80)}</div>
          </div>
        </Link>
      </li>
    </>
  )
}

export default Related;

