import { useState, useCallback } from 'react';

export const useForceUpdate = () => {
  const [, forceUpdate] = useState<undefined | boolean>(undefined);
  return useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
}
