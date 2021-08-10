import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Message, isMessage } from 'models/message';

const deleteProject = async (
  projectName: string,
  options?: Options,
): Promise<Message> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  }
  // console.log(data)
  const response = await ky.delete(
    `${process.env.REACT_APP_API_URL}/projects/${projectName}`,
    mergedOptions,
  );

  const results = (await response.json()) as unknown;
  console.log(results);

  if (!isMessage(results)) {
    throw Error('API type error');
  }

  return results
}

export default deleteProject;

