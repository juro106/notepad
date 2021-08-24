import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content, RelatedContents, RelatedList } from 'models/content';
import { useLayout } from 'hooks/useLayout';
import RelatedMenu from 'components/common/RelatedMenu';

// new
const Related: FC<{ data: RelatedList | undefined }> = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <div className="related-contents">
        <RelatedMenu />
        {data.map((v, i) => (
          <ItemBlock key={`block_${i}`} data={v} />
        ))}
      </div>
    )
  }

  return <></>
}

const ItemBlock: FC<{ data: RelatedContents }> = ({ data }) => {
  const { grid } = useLayout();

  if (data) {
    return (
      <>
        {Object.entries(data).map(v => (
          <div className="item-block" key={`ul_${v[0]}`} >
            <h3 className='related-heading'>
              <Link to={`/local/${v[0]}`} className='related-heading-link'>
                {v[0]}
              </Link>
            </h3>
            {v[1] &&
              <ul className={grid ? 'grid-list' : 'related-item-list'}>
                {v[1].map(x => (
                  <Item key={x.slug} data={x} />
                ))}
              </ul>}
          </div>
        ))}
      </>
    )
  }

  return <></>
}

const Item: FC<{ data: Content }> = ({ data }) => {
  const { title, project, slug, updated_at, content } = data;
  const { grid } = useLayout();

  return (
    <>
      <li className={grid ? 'grid-list-item' : 'item-arrow'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : 'item-link'}>
          <div className='item-title'>{title}</div>
          <div className='item-dscr'>{updated_at}: {content.slice(0, 80)}</div>
        </Link>
      </li>
    </>
  )
}

export default Related;

