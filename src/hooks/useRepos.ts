// import { useEffect, useState } from 'react';

import { config } from '@/api/config';
import { api } from '@/api/endpoints';

// because the rate limit is so strict,
// we want to make one longer request instead of many faster ones
export const useRepos = ({ itemsMax }: { itemsMax?: number }) => {
  return api.useGetReposQuery(
    {
      itemsPerPage: itemsMax as number, // itemsMax is a skip param
      page: 1,
      username: config.username,
    },
    {
      skip: !itemsMax,
    },
  );
};

// export const useRepoPages = ({ itemsMax }: { itemsMax?: number }) => {
//   const [page, setPage] = useState<number>(1);

//   const response = api.useGetReposQuery(
//     {
//       itemsPerPage: config.itemsPerPage,
//       page,
//       username: config.username,
//     },
//     {
//       selectFromResult: ({ currentData, isFetching }) => ({
//         currentData,
//         isFetching,
//       }),
//       skip: !itemsMax,
//     },
//   );
//   const { currentData, isFetching } = response;

//   useEffect(() => {
//     if (!itemsMax) return;
//     const lastPage = Math.ceil(itemsMax / config.itemsPerPage);
//     if (!currentData || currentData.length === 0 || isFetching) return;

//     setPage((currentPage) =>
//       currentPage === lastPage ? currentPage : currentPage + 1,
//     );
//   }, [currentData, itemsMax, isFetching]);

//   return response;
// };
