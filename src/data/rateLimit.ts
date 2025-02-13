// https://api.github.com/rate_limit

export const rateLimit = {
  resources: {
    core: {
      limit: 60,
      remaining: 50,
      reset: 1736380210,
      used: 10,
      resource: 'core',
    },
    graphql: {
      limit: 0,
      remaining: 0,
      reset: 1736380222,
      used: 0,
      resource: 'graphql',
    },
    integration_manifest: {
      limit: 5000,
      remaining: 5000,
      reset: 1736380222,
      used: 0,
      resource: 'integration_manifest',
    },
    search: {
      limit: 10,
      remaining: 10,
      reset: 1736376682,
      used: 0,
      resource: 'search',
    },
  },
  // The rate object is closing down. Use 'core' instead.
  rate: {
    limit: 60,
    remaining: 50,
    reset: 1736380210,
    used: 10,
    resource: 'core',
  },
} as const;
