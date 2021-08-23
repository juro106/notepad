// Actions
export const TOGGLE_MODAL = 'TOGGLE_MODAL'  as const;

// Action Creators
export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export type Actions = ReturnType<typeof toggleModal>

