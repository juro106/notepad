import { useCallback } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { toggleToast, openToast, closeToast } from 'ducks/toast/actions';

export const useWarning = () => {
  const { isOpen, source } = useSelector(state => state.toast);
  const dispatch = useDispatch();

  const dispatchToggle = useCallback(() => {
    dispatch(toggleToast());
  }, [dispatch]);

  const dispatchOpen = useCallback((arg?: string) => {
    const item = arg ? arg : '';
    dispatch(openToast(item));
  }, [dispatch]);

  const dispatchClose = useCallback(() => {
    dispatch(closeToast());
  }, [dispatch]);

  return { source, isOpen, dispatchToggle, dispatchOpen, dispatchClose };
}

