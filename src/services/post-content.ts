import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Content } from 'models/content';
import { Message, isMessage } from 'models/message';

const postContent = async (
  data: Content | undefined,
  options?: Options,
): Promise<Message> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: data },
    ...options,
  }
  // console.log(data)
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/api/post-content`,
    mergedOptions,
  );

  const results = (await response.json());

  if (!isMessage(results)) {
    throw Error('API type error');
  }
  // console.log(results)

  return results
}
export default postContent;
