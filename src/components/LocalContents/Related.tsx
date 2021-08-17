import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Content, RelatedContents, RelatedList } from 'models/content';
import { useParams } from 'react-router';
import { ProjectContext } from 'contexts/projectContext';

// const Related: FC<{data: Content[] | undefined }> = ({ data }) => {
const Related: FC<{
  data: RelatedList | undefined,
}> = ({
  data,
}) => {
  if (data && data.length > 0) {
    return (
      <div className='related-contents'>
      {data.map((v, i) => (
        <ItemBlock key={`block_${i}`} data={v} />
      ))}
      </div>
    )
  }

  return <div className='related-contents'></div>
}

const ItemBlock: FC<{ data: RelatedContents }> = ({ data }) => {
  const { project } = useContext(ProjectContext);
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
            <ul className='item-list'>
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
  const { project } = useContext(ProjectContext);
  const { slug } = useParams();
  if (data && data.length > 0) {
    return (
      <>
        {data.map(v => (
          slug !== v.slug ?
            <li key={`li_${v.title}`} className='item-arrow'>
              <Link to={`/local/${project}/${v.slug.trim()}`} className='item-link'>
                <div className='item-title'>{v.title}</div>
                <div className='item-dscr'>{v.updated_at}: {v.content.slice(0, 80)}</div>
              </Link>
            </li>
            : ''
        ))}
      </>
    )
  }

  return <></>
}

export default Related;

    // return (
    //   <>
    //     {data.map((v, k) => (
    //       <div key={`p_${k}`} className='item'>
    //         <Link to={`/v1/${v.slug.trim()}`} className="item-link">
    //           {v.user === 'tagName' 
    //           ?  <h3 className="related-items-heading">{v.title}</h3>
    //           :  <div className="item-title">{v.title}</div>}
    //           <div className="item-dscr">{v.content.slice(0, 80)}</div>
    //         </Link>
    //       </div>
    //     ))}
    //     </>
    // )
