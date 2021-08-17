import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Content } from 'models/content';

const Main: FC<{ data: Content | undefined, }> = ({ data }) => {
  if (data)
    return (
      <>
        <Helmet>
          <title>{data.title}</title>
          <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${data.slug}`} />
        </Helmet>
        <main className="main-contents">
          <h1 className='content-title'>{data.title}</h1>
          {data.tags && data.tags.length > 0
            ?
            <div className='content-tags'>
              {data.tags.map(v => (
                data.tags !== undefined ?
                  data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                  : ''
              ))}
            </div>
            : ''}
          {data.content && data.content.length > 0 ? <div className='content-body'>{data.content}</div> : ''}
          {data.image && <img id='content-img' src={data.image} alt={data.image} decoding='async' />}
        </main>
      </>
    )

  return <></>
}

export default Main;

