export type Message = {
  status?: number;
  message: string;
  updated_at?: string;
  data?: string;
}

const isMessage = (arg: unknown): arg is Message => {
  const c = arg as Message;
  return (
    typeof c?.message === 'string' &&
    (typeof c?.status === 'number' || c?.status === undefined || c?.status === null) &&
    (typeof c?.updated_at === 'string' || c?.updated_at === undefined || c?.updated_at === null) &&
    (typeof c?.data === 'string' || c?.data === undefined || c?.data === null)
  );
}

export { isMessage };
