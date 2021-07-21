import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content } from 'models/content';

const sendContent = async (
  data: Content,
  options?: Options,
): Promise<boolean> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: data },
    ...options,
  }
  console.log(data)
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/api/post-content`,
    mergedOptions,
  );

  const results = (await response.json());

  if (!results) {
    throw Error('API type error');
  }
  console.log(results)

  return results
}
export default sendContent;
