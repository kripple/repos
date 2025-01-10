import type { FetchArgs } from '@reduxjs/toolkit/query';
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { config } from '@/api/config';

// TODO: investigate using async-mutex to lock requests until rate limit is reset

export const baseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: config.baseUrl })(
      args,
      api,
      extraOptions,
    );

    // bail out of re-tries immediately if rate limited,
    // because we know successive re-retries would be redundant
    if (
      (result.error?.status === 403 || result.error?.status === 429) &&
      result.meta?.response?.headers.get('x-ratelimit-remaining') === '0'
    ) {
      retry.fail(result.error, result.meta);
    }

    return result;
  },
  {
    maxRetries: 5,
  },
);
