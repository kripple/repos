import type { RepoEntities } from '@/api/types';
import type { SortKey } from '@/types/sort';

export const sortByKey = (collection: RepoEntities, key: SortKey) =>
  Object.values(collection)
    .sort(({ [key]: a }, { [key]: b }) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
    .map(({ id }) => id);
