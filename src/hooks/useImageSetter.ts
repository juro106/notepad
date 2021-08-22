import { useImgSelectContext } from 'contexts/imgSelectContext';

export const useImageSetter = (): (arg: string) => void  => {
  const ctx = useImgSelectContext();

  return ctx.setCurrentImgURL;
}

