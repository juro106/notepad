import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Message, isMessage } from 'models/message';

const DeleteContent = async (
  data: string,
  options?: Options,
): Promise<Message> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...{ json: { slug: data } },
    ...options,
  }
  // console.log(data)
  const response = await ky.post(
    `${process.env.REACT_APP_API_URL}/api/delete-content`,
    mergedOptions,
  );

  const results = (await response.json());

  if (!isMessage(results)) {
    throw Error('API type error');
  }
  // console.log(results)

  return results
}
export default DeleteContent;
