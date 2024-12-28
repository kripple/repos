import { api } from '@/api';

export const useProfile = () => {
  return api.useGetProfileQuery('profile', {
    selectFromResult: ({ currentData }) => ({
      name: currentData?.name || '',
      username: currentData?.login || '',
      websiteUrl: currentData?.blog || '',
      githubUrl: currentData?.html_url || '',
      location: currentData?.location || '',
      repos: currentData?.public_repos || '',
      avatarUrl: currentData?.avatar_url || '',
    }),
  });
};
