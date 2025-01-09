import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@/api/config';
import type { CacheKey, Profile, RateLimit, Repo } from '@/api/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: (repoId: string) => `/repos/${config.username}/${repoId}/languages`,
    }),
    getProfile: builder.query<Profile, CacheKey>({
      query: () => `/users/${config.username}`,
    }),
    getRateLimit: builder.query<RateLimit, CacheKey>({
      query: () => 'https://api.github.com/rate_limit',
    }),
    getRepo: builder.query<Repo, CacheKey>({
      query: (repoId: string) => `/repos/${config.username}/${repoId}`,
    }),
    getRepos: builder.query<Repo[], { page: number; itemsPerPage: number }>({
      query: ({ page, itemsPerPage }) =>
        `/users/${config.username}/repos?per_page=${itemsPerPage}&page=${page}&sort=updated`,
    }),
  }),
});

export type Api = typeof api;
