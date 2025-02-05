import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const isQueryError = (
  error?: FetchBaseQueryError | SerializedError,
): error is FetchBaseQueryError => {
  if (!error) return false;
  return 'status' in error;
};
