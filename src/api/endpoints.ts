import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/api/baseQuery';
import { config } from '@/api/config';
import type { CacheKey, Profile, RateLimit, Repo } from '@/api/types';
import { imageData } from '@/data/avatar';
import { profile } from '@/data/profile';

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: PropertyKey]: any;
};

// TODO: normalize & transform responses

export const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    getLanguages: build.query({
      query: (repoId: string) =>
        `/repos/${config.username}/${repoId}/languages`,
    }),
    getProfile: build.query<Profile, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBaseQuery) => {
        const { data: response } = await fetchWithBaseQuery(
          `/users/${config.username}`,
        );
        const useFallback = (!(response && typeof response === 'object' && 'data' in response));

        if (!(response && typeof response === 'object' && 'data' in response)) {
          return {
            data: {
              ...profile,
              avatar_url: imageData,
            },
          };
        }
        const data: Data = response;

        return {
          data: {
            avatar_url: data.avatar_url,
            bio: data.bio,
            blog: data.blog,
            company: data.company,
            created_at: data.created_at,
            email: data.email,
            hireable: data.hireable,
            html_url: data.html_url,
            location: data.location,
            login: data.login,
            name: data.name,
            public_repos: data.public_repos,
            repos_url: data.repos_url,
            updated_at: data.updated_at,
          },
        };
      },
      // transformResponse: () => {

      // }
    }),
    getRateLimit: build.query<RateLimit, CacheKey>({
      query: () => '/rate_limit',
    }),
    getRepo: build.query<Repo, CacheKey>({
      query: (repoId: string) => `/repos/${config.username}/${repoId}`,
    }),
    getRepos: build.query<Repo[], { page: number; itemsPerPage: number }>({
      query: ({ page, itemsPerPage }) =>
        `/users/${config.username}/repos?per_page=${itemsPerPage}&page=${page}&sort=updated`,
    }),
  }),
});
export type Api = typeof api;
