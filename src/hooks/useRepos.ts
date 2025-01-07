import { api } from '@/api';

export const useRepos = (max: string) => {
  return api.useGetReposQuery(
    { page: 0, perPage: max },
    {
      selectFromResult: ({ currentData }) => ({
        repos: currentData ? [...currentData] : [],
      }),
      skip: !max,
    },
  );
};
