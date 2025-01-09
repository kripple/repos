import { useMemo } from 'react';

import { config } from '@/api/config';
import { api } from '@/api/createApi';

export const useRepos = ({
  itemsMax,
  page,
}: {
  itemsMax?: number;
  page: number;
}) => {
  const params = useMemo(
    () => ({
      page,
      itemsPerPage: config.itemsPerPage,
    }),
    [page],
  );

  return api.useGetReposQuery(params, {
    selectFromResult: ({ currentData, isFetching }) => ({
      currentData,
      isFetching,
    }),
    skip: !itemsMax,
  });
};
