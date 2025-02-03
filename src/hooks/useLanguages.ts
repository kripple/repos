import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useLanguages = (repo: string) => {
  return api.useGetLanguagesQuery({ repo, username: config.username });
};
