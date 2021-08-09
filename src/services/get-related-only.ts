import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { RelatedList } from 'models/content';

// type Auth = {
//   Authorization: string;
// }

const getRelatedOnly = async (
  data: {
    project: string;
    tags: string[];
  },
  // Auth: Auth,
  options?: Options,
): Promise<RelatedList> => {

  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: data },
    // ...{ headers: Auth },
    ...options,
  }
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/get-related-only`,
    mergedOptions,
  );

  let results = await response.json();

  // if (typeof results !== RelatedList) {
  //   throw Error('API type error');
  // }

  return results;
}

export default getRelatedOnly;

