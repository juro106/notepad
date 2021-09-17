import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setImageSource } from 'ducks/image/actions';

export const useSetImage = (): (arg: string) => void  => {
  const dispatch = useDispatch();

  const setCurrentImage = useCallback((arg: string) => {
    dispatch(setImageSource(arg));
  }, [dispatch]);

  return setCurrentImage
}

