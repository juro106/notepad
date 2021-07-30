import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContent } from 'models/content';

const getContent = async (
  data: {
    slug: string;
    uid: string;
  },
  options?: Options,
): Promise<Content> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: data },
    ...options,
  }
  // console.log(data)
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/get-content`,
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
