import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';

const getProjects = async (
  options?: Options,
): Promise<string[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky(
    `${process.env.REACT_APP_API_URL}/projects-list`,
    mergedOptions,
  );

  let results = (await response.json());
  console.log(results);
  if (results === null) {
    results = [];
  }

  // if (!isContentsList(results)) {
  //   throw Error('API type error');
  // }

  return results;
}
export default getProjects;

