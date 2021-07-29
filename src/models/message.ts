export type Message = {
  message: string;
  updated_at: string;
}

const isMessage = (arg: unknown): arg is Message => {
  const c = arg as Message;
  return (
    typeof c?.message === 'string' &&
    typeof c?.updated_at === 'string'
  );
}

export { isMessage };
