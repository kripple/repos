import type { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { reposAdapter } from '@/api/adapters';
import { baseQuery } from '@/api/baseQuery';
import { fallbackFor } from '@/api/fallback';
import type { Languages, Profile, Repo } from '@/api/types';

export const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    getLanguages: build.query<Languages, { repo: string; username: string }>({
      query: ({ repo, username }) => `/repos/${username}/${repo}/languages`,
    }),
    // getLanguagesFallback: build.query<
    //   Languages,
    //   { repo: string; username: string }
    // >({
    //   queryFn: fallbackFor('languages'),
    // }),
    getProfile: build.query<Profile, { username: string }>({
      query: ({ username }) => `/users/${username}`,
    }),
    getProfileFallback: build.query<Profile, { username: string }>({
      queryFn: fallbackFor('profile'),
    }),
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
    // getReposFallback: build.query<
    //   EntityState<Repo, number>,
    //   { itemsPerPage: number; page: number; username: string }
    // >({
    //   queryFn: fallbackFor('repos'),
    // }),
  }),
});
export type Api = typeof api;
