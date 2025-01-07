import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userId = 'kripple';

type Profile = {
  avatar_url: string;
  blog: string;
  html_url: string;
  location: string;
  login: string;
  name: string;
  public_repos: string;
};

type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  size: number;
  language: string;
  homepage: string | null;
  has_pages: boolean;
  license?: License;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  tags_url: string;
  languages_url: string;
};

type CacheKey = string | undefined;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, CacheKey>({
      query: () => `/users/${userId}`,
    }),
    getRepos: builder.query<Repo[], { page: number; perPage: string }>({
      query: ({ page, perPage }) =>
        `/users/${userId}/repos?per_page=${perPage}&page=${page}&sort=updated`,
    }),
    getRepo: builder.query<Repo, CacheKey>({
      query: (repoId: string) => `/repos/${userId}/${repoId}`,
    }),
    getLanguages: builder.query({
      query: (repoId: string) => `/repos/${userId}/${repoId}/languages`,
    }),
  }),
});
