import { useCallback } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { toggleToast } from 'ducks/toast/actions';

export const useWarning = (targetSlug: string) => {
  const stateSlug = useSelector(state => state.toast.slug);

  const dispatch = useDispatch();

  const dispatchToggleToast = useCallback(() => {
    dispatch(toggleToast(targetSlug));
  }, [dispatch]);

  return dispatchToggleToast;
}

