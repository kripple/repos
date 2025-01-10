import { api } from '@/api/endpoints';

export const useProfile = () => {
  return api.useGetProfileQuery();
};
