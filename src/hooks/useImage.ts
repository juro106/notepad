import { useSelector } from 'store';

export function useImage(): string {
  const imagePath = useSelector(state => state.image.imageSource.source);

  return imagePath;
}

