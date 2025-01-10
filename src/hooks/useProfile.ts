import { config } from '@/api/config';
import { api } from '@/api/endpoints';

export const useProfile = () => {
  return api.useGetProfileQuery({ username: config.username });
};
