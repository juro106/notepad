import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {initImages} from 'ducks/image/actions'

export const useInitImages = (): () => void  => {
  const dispatch = useDispatch();

  const dispatchInit = useCallback(() => {
    dispatch(initImages());
  }, [dispatch]);

  return dispatchInit;
}

