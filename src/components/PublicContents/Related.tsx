import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content, RelatedContents, RelatedList } from 'models/content';
import { useParams } from 'react-router';
import { useLayout } from 'hooks/useLayout';
import RelatedMenu from 'components/common/RelatedMenu';

// public
const Related: FC<{ data: RelatedList | undefined }> = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <div className='related-contents'>
        <RelatedMenu />
        {data.map((v, i) => (
          <ItemBlock key={`block_${i}`} data={v} />
        ))}
      </div>
    )
  }

  return <div className='related-contents'></div>
}

const ItemBlock: FC<{ data: RelatedContents }> = ({ data }) => {
  if (data) {
    return (
      <>
        {Object.entries(data).map(v => (
          <div className='item-block' key={`ul_${v[0]}`} >
            <h3 className='related-heading'>
              <Link to={`/${v[0]}`} className='related-heading-link'>
                {v[0]}
              </Link>
            </h3>
            <List data={v[1]} />
          </div>
        ))}
      </>
    )
  }

  return <></>
}

const List: FC<{ data: Content[] }> = ({ data }) => {
  const { grid } = useLayout();
  const { slug } = useParams();

  if (data && data.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : 'related-item-list'}>
        {data.map(v => (
          slug !== v.slug ?
            <Item data={v} />
            : ''
        ))}
      </ul>
    );
  }
  return <></>;
}


const Item: FC<{ data: Content }> = ({ data }) => {
  const { title, slug, content } = data
  const { grid } = useLayout();

  return (
    <li key={`li_${title}`} className={grid ? 'grid-list-item' : 'item-arrow'}>
      <Link to={`/${slug.trim()}`} className={grid ? 'grid-item-link' : 'item-link'}>
        <div className={grid ? 'item-content-grid' : 'item-content'}>
          <div className='item-title'>{title}</div>
          <div className='item-dscr'>{content.slice(0, 80)}</div>
        </div>
      </Link>
    </li>
  )
}

export default Related;

