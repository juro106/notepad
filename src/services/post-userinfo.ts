import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContent } from 'models/content';

const getContent = async (
  Authorization: {
    idToken: string;
  },
  options?: Options,
): Promise<Content> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
  }
  // console.log(data)
  const response = await ky.get(
    `${process.env.REACT_APP_API_URL}/secret/userinfo`,
  );

  const results = (await response.json()) as unknown;

  if (!isContent(results)) {
    throw Error('API type error');
  }
  // console.log('get-content=>', results);

  return results
}

export default getContent;

