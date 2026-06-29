'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from './use-debounce';

type UseSearchOptions = {
  initialValue?: string;
  delay?: number;
};

export function useSearch({ initialValue = '', delay = 300 }: UseSearchOptions = {}) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function clear() {
    setValue('');
  }

  return {
    value,
    debouncedValue,
    setValue,
    clear,
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    },
  };
}
