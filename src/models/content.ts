export type Content = {
  user: string;
  title: string;
  content: string;
}

const isContent = (race: unknown): race is Content => {
  const c = race as Content;
  return (
    typeof c?.user === 'string' &&
    typeof c?.title === 'string' &&
    typeof c?.content === 'string'
  )
}

export { isContent };
