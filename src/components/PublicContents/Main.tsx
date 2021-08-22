import { FC, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Content } from 'models/content';

const Main: FC<{ data: Content }> = memo(({ data }) => {
  const { title, slug, tags, content, image, created_at, updated_at } = data;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${slug}`} />
      </Helmet>
      <main className="main-contents">
        <div className='time'>
          {created_at ? <time dateTime={created_at}>{created_at.slice(0, 10)}</time> : ''}
          {updated_at ? <time dateTime={updated_at} className='time-updated_at'>↺ {updated_at.slice(0, 10)}</time> : ''}
        </div>
        <h1 className='content-title'>{title}</h1>
        {tags && tags.length > 0
          ?
          <div className='content-tags'>
            {tags.map(v => (
              tags !== undefined ?
                tags.slice(-1)[0] === v ? `${v}` : `${v}, `
                : ''
            ))}
          </div>
          : ''}
        {content && content.length > 0 ? <div className='content-body'>{content}</div> : ''}
        {image && <img id='content-img' src={image} alt={image} decoding='async' />}
      </main>
    </>
  )
});

export default Main;

