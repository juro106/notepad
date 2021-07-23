import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContentsList } from 'models/content';

const getContentsAll = async (
  options?: Options,
): Promise<Content[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/api/get-contents-all`,
    mergedOptions,
  );

  let results = (await response.json()) as unknown[];
  if (results === null) {
    results = [];
  }

  if (!isContentsList(results)) {
    throw Error('API type error');
  }

  return results;
}
export default getContentsAll;

