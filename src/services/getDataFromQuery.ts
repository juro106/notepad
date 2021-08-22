import { queryClient } from 'index';

export const getDataFromQuery = (arg: string[]) => {
  return queryClient.getQueryData(arg);
}
