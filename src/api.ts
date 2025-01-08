import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userId = 'kripple' as const;
export const itemsPerPage = 10 as const;

type Profile = {
  avatar_url: string;
  blog: string;
  html_url: string;
  location: string;
  login: string;
  name: string;
  public_repos: number;
};

type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
};

export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  language: string | null;
  has_pages: boolean;
  license: License | null;
  default_branch: string;
};

type CacheKey = string | undefined;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, CacheKey>({
      query: () => `/users/${userId}`,
    }),
    getRepos: builder.query<Repo[], { page: number; itemsPerPage: number }>({
      query: ({ page, itemsPerPage }) =>
        `/users/${userId}/repos?per_page=${itemsPerPage}&page=${page}&sort=updated`,
    }),
    getRepo: builder.query<Repo, CacheKey>({
      query: (repoId: string) => `/repos/${userId}/${repoId}`,
    }),
    getLanguages: builder.query({
      query: (repoId: string) => `/repos/${userId}/${repoId}/languages`,
    }),
  }),
});

export type Api = typeof api;
