import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { TagNum } from 'models/content';

const getTags = async (
  project: string,
  pub?: boolean,
  options?: Options,
): Promise<TagNum[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  // console.log(data)
  const response = await ky.get(
    pub
    ? `${process.env.REACT_APP_API_URL}/public/tags-all`
    : `${process.env.REACT_APP_API_URL}/tags/${project}/`,
    mergedOptions,
  );

  const results = (await response.json()) as unknown[];

  if (!Array.isArray(results)) {
    throw Error('API type error');
  }
  // console.log('get-content=>', results);

  return results
}

export default getTags;

