import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';

const getTags = async (
  project: string,
  options?: Options,
): Promise<string[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  // console.log(data)
  const response = await ky.get(
    `${process.env.REACT_APP_API_URL}/tags/${project}/`,
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

