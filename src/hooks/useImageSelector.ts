import { useCallback } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { openSelector, closeSelector } from 'ducks/image/actions';

type ReturnType = {
  openImageSelector: () => void;
  closeImageSelector: () => void;
  selectorState: boolean;
}

export const useImageSelector = (): ReturnType => {
  const dispatch = useDispatch();

  const selectorState = useSelector(state => state.image.imageSelector.selector);

  const openImageSelector = useCallback(() => {
    dispatch(openSelector());
  }, [dispatch]);

  const closeImageSelector = useCallback(() => {
    dispatch(closeSelector());
  }, [dispatch]);

  return { openImageSelector, closeImageSelector, selectorState };
}

