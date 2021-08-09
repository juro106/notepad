export type Content = {
  user: string;
  title: string;
  slug: string;
  updated_at?: string;
  tags?: string[];
  content: string;
  project?: string;
  image?: string;
}
export type RelatedContents = {[s: string]: Content[]};

export type RelatedList = RelatedContents[]

const isContent = (arg: unknown): arg is Content => {
  const c = arg as Content;
  return (
    typeof c?.user === 'string' &&
    typeof c?.title === 'string' &&
    typeof c?.slug === 'string' &&
    (typeof c?.updated_at === 'string' || c?.updated_at === undefined) &&
    (Array.isArray(c?.tags) || c?.tags === undefined) &&
    typeof c?.content === 'string' &&
    (typeof c?.project === 'string' || c?.project === undefined) &&
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
