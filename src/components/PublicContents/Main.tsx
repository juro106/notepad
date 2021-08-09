import { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Content } from 'models/content';

const Main: FC<{ data: Content | undefined, }> = ({ data }) => {
  if (data)
    return (
      <HelmetProvider>
        <Helmet>
          <title>{data.title}</title>
          <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${data.slug}`} />
        </Helmet>
        <main className="main-contents">
          <h1 className='content-title'>{data.title}</h1>
          {data.tags && data.tags.length > 1
            ?
            <div className='content-tags'>
              {data.tags.map((v, k) => (
                data.tags !== undefined ?
                  data.tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                  : ''
              ))}
            </div>
            : ''}
          {data.content && data.content.length > 0 ? <div className='content-body'>{data.content}</div> : ''}
        </main>
      </HelmetProvider>
    )

  return <></>
}

export default Main;

