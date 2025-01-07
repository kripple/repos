import { api } from '@/api';

export const useRepo = (name: string) => {
  return api.useGetRepoQuery(name);
};
