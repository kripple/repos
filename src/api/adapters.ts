import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Repo } from '@/api/types';

export const reposAdapter = createEntityAdapter<Repo>({
  sortComparer: (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  },
});
