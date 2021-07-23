export type Content = {
  user: string;
  title: string;
  slug: string;
  tags?: string[];
  content: string;
}

const isContent = (arg: unknown): arg is Content => {
  const c = arg as Content;
  return (
    typeof c?.user === 'string' &&
    typeof c?.title === 'string' &&
    typeof c?.slug === 'string' &&
    (Array.isArray(c?.tags) || c?.tags === undefined) &&
    typeof c?.content === 'string'
  )
}

const isContentsList = (arg: unknown[]): arg is Content[] =>
  !arg.some((arg) => !isContent(arg)); // return を 省略している

export { isContent, isContentsList };
