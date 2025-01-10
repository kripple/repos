import { useEffect, useState } from 'react';

import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useRepos = ({ itemsMax }: { itemsMax?: number }) => {
  const [page, setPage] = useState<number>(1);

  const response = api.useGetReposQuery(
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
  const { currentData, isFetching } = response;

  useEffect(() => {
    if (!itemsMax) return;
    const lastPage = Math.ceil(itemsMax / config.itemsPerPage);
    if (!currentData || currentData.length === 0 || isFetching) return;

    setPage((currentPage) =>
      currentPage === lastPage ? currentPage : currentPage + 1,
    );
  }, [currentData, itemsMax, isFetching]);

  return response;
};
