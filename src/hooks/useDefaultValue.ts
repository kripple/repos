import { useMemo } from 'react';

export function useDefaultValue<T>(defaultValue: T, data?: T) {
  const memo = useMemo(() => defaultValue, []);
  return data || memo;
}
