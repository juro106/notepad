import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { ImageFile } from 'models/image-file'

const getImages = async (
  project?: string,
  options?: Options,
): Promise<ImageFile[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky.get(
    `${process.env.REACT_APP_API_URL}/images/${project}/all`,
    mergedOptions,
  );

  let results = (await response.json());
  if (results === null) {
    results = [];
  }

  return results;
}

export default getImages;


