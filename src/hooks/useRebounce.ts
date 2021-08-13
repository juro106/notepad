import { useState, useEffect, useCallback } from 'react';

function useDebounce(fn: () => any, ms: number = 0, args: any[] = []) {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, args);
};

export default function useDebouncedQuery(onChange: (query: string) => void) {
  const [searchQuery, setSearchQuery] = useState('');

  useDebounce(
    () => {
      onChange(searchQuery);
    },
    400,
    [searchQuery]
  );

  const clearQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  return { searchQuery, setSearchQuery, clearQuery };
}
