import type { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { reposAdapter } from '@/api/adapters';
import { baseQuery } from '@/api/baseQuery';
import type { Language, Profile, Repo } from '@/api/types';

/**
 * TODO:
 *
 * 1. normalize & transform responses
 * 2. add db
 * 3. add fallback api
 */

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
    getLanguages: build.query<Language, { repo: string; username: string }>({
      query: ({ repo, username }) => `/repos/${username}/${repo}/languages`,
    }),
    getProfile: build.query<Profile, { username: string }>({
      query: ({ username }) => `/users/${username}`,
    }),
  }),
});
export type Api = typeof api;
