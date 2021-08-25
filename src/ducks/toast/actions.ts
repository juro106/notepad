// project アクションタイプの定数
export const OPEN_TOAST = 'OPEN_TOAST' as const;
export const CLOSE_TOAST = 'CLOSE_TOAST' as const;
export const TOGGLE_TOAST = 'TOGGLE_TOAST' as const;

export const openToast = (slug: string) => ({
  type: OPEN_TOAST,
  payload: {
    slug
  } 
});

export const closeToast = (slug: string) => ({
  type: CLOSE_TOAST,
  payload: {
    slug
  } 
});

export const toggleToast = (slug: string) => ({
  type: TOGGLE_TOAST,
  payload: {
    slug
  } 
});

export type Actions = ReturnType<typeof openToast | typeof closeToast | typeof toggleToast>

