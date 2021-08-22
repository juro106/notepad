export type Content = {
  user: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  content: string;
  project: string;
  image?: string;
}

export interface ContentForUpload {
  user: string;
  title: string;
  project?: string;
  slug: string;
  tags?: string[];
  content: string;
  image?: string;
}

export type TagNum = {
  name: string;
  number: number;
  project: string;
}

export type RelatedContents = {[s: string]: Content[]};

export type RelatedList = RelatedContents[]

const isContent = (arg: unknown): arg is Content => {
  const c = arg as Content;
  return (
    typeof c?.user === 'string' &&
    typeof c?.title === 'string' &&
    typeof c?.slug === 'string' &&
    typeof c?.content === 'string' &&
    typeof c?.project === 'string' &&
    // (typeof c?.created_at === 'string' || c?.created_at === undefined) &&
    typeof c?.created_at === 'string' &&
    (typeof c?.updated_at === 'string' || c?.updated_at === undefined) &&
    (Array.isArray(c?.tags) || c?.tags === undefined || c?.tags === null) &&
    (typeof c?.image === 'string' || c?.image === undefined || c?.image === null)
  );
}

const isContentsList = (arg: unknown[]): arg is Content[] =>
  !arg.some((arg) => !isContent(arg)); // return を 省略している

// const isRelated = (arg: unknown): arg is Related => {
//   const c = arg as Related;
//   return (
//     typeof c?.key === 'string'
//   );
// }
//
// const isRelatedList = (arg: unknown[]): arg is Related[] =>
//   !arg.some((arg) => !isRelated(arg)); // return を 省略している

export { isContent, isContentsList };

