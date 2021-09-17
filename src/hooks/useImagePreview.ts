import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { openPreview as openFunc, closePreview as closeFunc } from 'ducks/image/actions';

export const useImagePreview = () => {
  const dispatch = useDispatch(); 
  const source = useSelector(state => state.image.imagePreview.source);
  const isPreview = useSelector(state => state.image.imagePreview.isPreview);

  const openPreview = useCallback((source: string) => {
    dispatch(openFunc(source));
  },[dispatch]);

  const closePreview = useCallback(() => {
    dispatch(closeFunc());
  },[dispatch]);

  return { source, isPreview, openPreview, closePreview }
}

