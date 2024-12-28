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

type CacheKey = string | undefined;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, CacheKey>({
      query: () => `/users/${userId}`,
    }),
    // getRepos: builder.query({
    //   query: () => `/users/${userId}/repos?per_page=25&sort=updated`,
    // }),
    // getRepo: builder.query({
    //   query: (repoId: string) => `/repos/${userId}/${repoId}`,
    // }),
    // getLanguages: builder.query({
    //   query: (languages_url: string) => languages_url,
    // }),
  }),
});
