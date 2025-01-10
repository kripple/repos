import { HttpResponse } from 'msw';

export const ErrorResponse = {
  RateLimit: () => HttpResponse.json(
    { error: 'Forbidden' },
    {
      status: 403,
      headers: {
        'x-ratelimit-remaining': '0',
      },
    },
  ),
  NotFound: () => HttpResponse.json(
    { error: 'Not Found' },
    {
      status: 404,
    },
  ),
} as const;
