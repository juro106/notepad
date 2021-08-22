import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
// import { Content, isContentsList } from 'models/content';
import { RelatedList } from 'models/content';

const getRelated = async (
  project?: string,
  slug?: string,
  isLoggedIn?: boolean,
  options?: Options,
): Promise<RelatedList> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky.get(
    isLoggedIn
      ? `${process.env.REACT_APP_API_URL}/related/${project}/${slug}`
      : `${process.env.REACT_APP_API_URL}/public/related/${slug}`,
    mergedOptions,
  );

  let results = await response.json();

  // if (typeof results !== RelatedList) {
  //   throw Error('API type error');
  // }

  return results;
}
export default getRelated;

