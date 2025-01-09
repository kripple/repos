import { api } from '@/api/createApi';

export const useProfile = () => {
  return api.useGetProfileQuery('profile');
};
