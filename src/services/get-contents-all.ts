import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContentsList } from 'models/content';

const getContentsAll = async (
  project?: string,
  pub?: boolean, // public or local 他のユーザーのデータ閲覧問題があるので分けている。
  options?: Options,
): Promise<Content[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky.get(
    pub 
    ? `${process.env.REACT_APP_API_URL}/public/contents-all`
    : `${process.env.REACT_APP_API_URL}/pages/${project}/`,
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

