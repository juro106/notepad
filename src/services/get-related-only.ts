import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { RelatedList } from 'models/content';

const getRelatedOnly = async (
  data: {
    uid: string;
    tags: string[];
  },
  options?: Options,
): Promise<RelatedList> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: data },
    ...options,
  }
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/api/get-related-only`,
    mergedOptions,
  );

  let results = await response.json();

  // if (typeof results !== RelatedList) {
  //   throw Error('API type error');
  // }

  return results;
}

export default getRelatedOnly;

