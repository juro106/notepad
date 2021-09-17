// project アクションタイプの定数
export const OPEN_TOAST = 'OPEN_TOAST' as const;
export const CLOSE_TOAST = 'CLOSE_TOAST' as const;
export const TOGGLE_TOAST = 'TOGGLE_TOAST' as const;

export const openToast = (source?: string) => ({
    type: OPEN_TOAST,
    payload: {
        source
    }
});

export const closeToast = () => ({
    type: CLOSE_TOAST,
});

export const toggleToast = () => ({
    type: TOGGLE_TOAST,
});

export type Actions = ReturnType<typeof openToast | typeof closeToast | typeof toggleToast>

