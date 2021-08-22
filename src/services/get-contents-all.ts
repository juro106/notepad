import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content, isContentsList } from 'models/content';

const getContentsAll = async (
  project?: string,
  isLoggedIn?: boolean, // public or local 他のユーザーのデータ閲覧問題があるので分けている。
  sort?: string, // sort
  options?: Options,
): Promise<Content[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }

  const parameter = sort ? sort : '';
  const response = await ky.get(
    isLoggedIn
      ? `${process.env.REACT_APP_API_URL}/pages/${project}/${parameter}`
      : `${process.env.REACT_APP_API_URL}/public/contents-all${parameter}`,
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

