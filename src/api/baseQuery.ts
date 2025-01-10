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
    const meta = {
      ...result.meta,
      rateLimit: result.meta?.response?.headers?.get('x-ratelimit-limit'),
      rateLimitRemaining: result.meta?.response?.headers?.get(
        'x-ratelimit-remaining',
      ),
      rateLimitUsed: result.meta?.response?.headers?.get('x-ratelimit-used'),
      rateLimitReset: result.meta?.response?.headers?.get('x-ratelimit-reset'),
      rateLimitResource: result.meta?.response?.headers?.get(
        'x-ratelimit-resource',
      ),
    };
    const errorCode = result.error?.status;

    // bail out of re-tries immediately if rate limited,
    // because we know successive re-retries would be redundant
    if (
      (errorCode === 403 || errorCode === 429) &&
      meta.rateLimitRemaining === '0'
    ) {
      retry.fail(result.error, meta);
    }

    return {
      ...result,
      meta,
    };
  },
  {
    maxRetries: 5,
  },
);
