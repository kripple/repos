import { useMemo } from 'react';

import { api, itemsPerPage } from '@/api';

export const useRepos = ({
  itemsMax,
  page,
}: {
  itemsMax: number;
  page: number;
}) => {
  const params = useMemo(
    () => ({
      page,
      itemsPerPage,
    }),
    [page],
  );

  return api.useGetReposQuery(params, {
    selectFromResult: ({ currentData, isFetching }) => ({
      currentData,
      isFetching,
    }),
    skip: !itemsMax || !itemsPerPage,
  });
};
