import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useRepo = (repo: string) => {
  return api.useGetRepoQuery({ repo, username: config.username });
};
