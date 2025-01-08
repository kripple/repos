import { itemsPerPage } from '@/api';
import { repos } from '@/data/repos';

const all = Object.values(repos);
const pageCount = Math.ceil(all.length / itemsPerPage);

type Pages = { [key: string]: typeof all };
export const pages = Array.from({ length: pageCount }).reduce(
  (result: Pages, _, i) => {
    const index = i;
    result[(index + 1).toString()] = all.slice(
      index * itemsPerPage,
      (index + 1) * itemsPerPage,
    );
    return result;
  },
  {} as Pages,
);

export const isPage = (page: unknown): page is keyof typeof pages => {
  if (typeof page !== 'string') return false;
  return Object.keys(pages).includes(page);
};
