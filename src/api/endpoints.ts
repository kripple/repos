import { createEntityAdapter } from '@reduxjs/toolkit';
import type { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/api/baseQuery';
import type { CacheKey, Profile, RateLimit, Repo } from '@/api/types';
// import { imageData } from '@/data/avatar';
// import { profile } from '@/data/profile';

// TODO: normalize & transform responses

const reposAdapter = createEntityAdapter<Repo>({
  sortComparer: (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    getRepos: build.query<
      EntityState<Repo, number>,
      { itemsPerPage: number; page: number; username: string }
    >({
      query: ({ itemsPerPage, page, username }) =>
        `/users/${username}/repos?per_page=${itemsPerPage}&page=${page}&sort=updated`,
      transformResponse(response: Repo[]) {
        return reposAdapter.addMany(reposAdapter.getInitialState(), response);
      },
    }),
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
  }),
});
export type Api = typeof api;
