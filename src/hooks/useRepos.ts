import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useRepos = ({
  itemsMax,
  page,
}: {
  itemsMax?: number;
  page: number;
}) => {
  return api.useGetReposQuery(
    {
      itemsPerPage: config.itemsPerPage,
      page,
      username: config.username,
    },
    {
      selectFromResult: ({ currentData, isFetching }) => ({
        currentData,
        isFetching,
      }),
      skip: !itemsMax,
    },
  );
};
