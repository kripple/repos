import { api } from '@/api/endpoints';

export const useRateLimit = () => {
  const timestamp = Date.now().toString();
  return api.useGetRateLimitQuery(timestamp); // do not cache
};
