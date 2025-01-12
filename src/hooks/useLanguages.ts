import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useLanguages = (
  repo: string,
  {
    selected = false,
  }: {
    selected?: boolean;
  },
) => {
  return api.useGetLanguagesQuery(
    { repo, username: config.username },
    { skip: !selected },
  );
};
