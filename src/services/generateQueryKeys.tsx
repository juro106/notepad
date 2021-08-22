export type QueryContentsType = 'contents' | 'contents-all' | 'tags' | 'tags-all' | 'images-all';

export type QueryKeysOptionsType = {
  sort_by: 'created_at' | 'updated_at' | 'name',
  order_by: 'DESC' | 'ASC',
  embed: 'date',
}

export type QueryKeysArray = [
  contentsType: QueryContentsType,
  project: string,
  slug?: string,
  options?: QueryKeysOptionsType,
];


export const keyItems: { [key: string]: string } = {
  page: 'page',
  contents: 'contents',
  contentsAll: 'contents-all',
  tags: 'tags',
  tagsAll: 'tags-all',
  imagesAll: 'images-all',
  created_at: 'created_at',
  updated_at: 'updated_at',
  DESC: 'DESC',
  ASC: 'ASC',
  name: 'name',
  date: 'date',
}

type argObj = {
  contentsType: QueryContentsType,
  project: string,
  slug?: string,
  options?: QueryKeysOptionsType
}

export const generateQueryKeys = (arg: argObj): QueryKeysArray => {
  const { contentsType, project, slug, options } = arg;

  return [contentsType, project, slug && slug, options && options];
}

