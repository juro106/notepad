import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Content, RelatedContents, RelatedList } from 'models/content';

// const Related: FC<{data: Content[] | undefined }> = ({ data }) => {
const Related: FC<{ data: RelatedList | undefined }> = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <div className="related-contents">
        {data.map((v, i) => (
          <ItemBlock key={`block_${i}`} data={v} />
        ))}
      </div>
    )
  }

  return <div className="related-contents">メモがありません。</div>
}

const ItemBlock: FC<{ data: RelatedContents }> = ({ data }) => {
  if (data) {
    return (
      <>
        {Object.entries(data).map(v => (
          <div className="item-block" key={`ul_${v[0]}`} >
            <h3 className="related-heading">{v[0]}</h3>
            <ul className="item-list">
              <Item data={v[1]} />
            </ul>
          </div>
        ))}
      </>
    )
  }

  return <></>
}

const Item: FC<{ data: Content[] }> = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <>
        {data.map(v => (
          <li key={`li_${v.title}`} className="item">
            <Link to={`/v1/${v.slug.trim()}`} className="item-link">
              <div className='item-title'>{v.title}</div>
              <div className='item-dscr'>{v.content.slice(0, 80)}</div>
            </Link>
          </li>
        ))}
      </>
    )
  }

  return <></>
}

export default Related;

