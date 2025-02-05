import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';

import { config } from '@/api/config';
import { api } from '@/api/endpoints';
import { isQueryError } from '@/api/type-guards';

export const useProfile = () => {
  const params = { username: config.username } as const;
  const [errorStatus, setErrorStatus] =
    useState<FetchBaseQueryError['status']>();
  const isRateLimitError = errorStatus === 403 || errorStatus === 429;
  const response = api.useGetProfileQuery(params);
  const [triggerFallback, fallbackResponse] =
    api.useLazyGetProfileFallbackQuery();

  useEffect(() => {
    if (!isQueryError(response.error)) return;
    const responseStatus = response.error.status;
    setErrorStatus((current) =>
      current === responseStatus ? current : responseStatus,
    );
  }, [response.error]);

  useEffect(() => {
    if (!isRateLimitError) return;
    triggerFallback(params);
  }, [isRateLimitError]);

  return isRateLimitError ? fallbackResponse : response;
};
