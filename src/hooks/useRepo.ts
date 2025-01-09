import { api } from '@/api/createApi';

export const useRepo = (name: string) => {
  return api.useGetRepoQuery(name);
};
