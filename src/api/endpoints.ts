import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/api/baseQuery';
import type { CacheKey, Profile, RateLimit, Repo } from '@/api/types';
// import { imageData } from '@/data/avatar';
// import { profile } from '@/data/profile';

// TODO: normalize & transform responses

export const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    // getLanguages: build.query({
    //   query: (repo: string) => `/repos/${config.username}/${repo}/languages`,
    // }),
    getProfile: build.query<Profile, { username: string }>({
      query: ({ username }) => `/users/${username}`,
    }),
    getRateLimit: build.query<RateLimit, CacheKey>({
      query: () => '/rate_limit', // per IP
    }),
    getRepo: build.query<Repo, { repo: string; username: string }>({
      query: ({ repo, username }) => `/repos/${username}/${repo}`,
    }),
    getRepos: build.query<
      Repo[],
      { itemsPerPage: number; page: number; username: string }
    >({
      query: ({ itemsPerPage, page, username }) =>
        `/users/${username}/repos?per_page=${itemsPerPage}&page=${page}&sort=updated`,
    }),
  }),
});
export type Api = typeof api;
