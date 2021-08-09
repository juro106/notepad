import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContent } from 'models/content';

const getContent = async (
  project?: string,
  slug?: string,
  pub?: boolean,
  options?: Options,
): Promise<Content> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  // console.log(data)
  const response = await ky.get(
    pub
    ? `${process.env.REACT_APP_API_URL}/public/${slug}`
    : `${process.env.REACT_APP_API_URL}/pages/${project}/${slug}`,
    mergedOptions,
  );

  const results = (await response.json()) as unknown;

  if (!isContent(results)) {
    throw Error('API type error');
  }
  // console.log('get-content=>', results);

  return results
}

export default getContent;
