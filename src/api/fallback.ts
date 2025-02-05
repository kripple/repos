export const fallbackRoutes = ['profile', 'repos', 'languages'] as const;
export type FallbackRoute = Union<typeof fallbackRoutes>;
export function isFallbackRoute(value: string): value is FallbackRoute {
  return (fallbackRoutes as readonly string[]).includes(value);
}

export const fallbackFor = (route: FallbackRoute) => async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CLOUDFLARE_WORKER_URL}/${route}`,
    );
    const { data } = await response.json();
    return { data };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const languagesQuery = fallbackFor('languages');
export const profileQuery = fallbackFor('profile');
export const reposQuery = fallbackFor('repos');
