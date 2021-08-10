import { useRef } from 'react';

// element の外側の領域をタップしたときに、closeAction を実行する
export const useCloseModal = (closeAction: () => void) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const closeModal = (element: HTMLElement) => {
    if (elementRef.current && !elementRef.current.contains(element)) {
      closeAction();
      window.scrollTo(0, 0);
    }
  };

  return { elementRef, closeModal };
}

