import { api } from '@/api/endpoints';

export const useRepo = (name: string) => {
  return api.useGetRepoQuery(name);
};
