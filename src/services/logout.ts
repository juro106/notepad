import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';

type Message = {
  message: string
}
const Logout = async (
  options?: Options,
): Promise<Message> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  const response = await ky.get(
    `${process.env.REACT_APP_API_URL}/secret/logout`,
    mergedOptions,
  );

  let results = (await response.json());

  return results;
}
export default Logout;


