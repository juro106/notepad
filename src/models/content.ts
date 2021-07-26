export type Content = {
  user: string;
  title: string;
  slug: string;
  tags?: string[];
  content: string;
}
export type RelatedContents = {[s: string]: Content[]};

export type RelatedList = RelatedContents[]

const isContent = (arg: unknown): arg is Content => {
  const c = arg as Content;
  return (
    typeof c?.user === 'string' &&
    typeof c?.title === 'string' &&
    typeof c?.slug === 'string' &&
    (Array.isArray(c?.tags) || c?.tags === undefined) &&
    typeof c?.content === 'string'
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
