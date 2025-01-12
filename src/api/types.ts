export type Profile = {
  avatar_url: string;
  blog: string;
  html_url: string;
  location: string;
  login: string;
  name: string;
  public_repos: number;
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
};

export type RateLimit = {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
      resource: string;
    };
    graphql: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
      resource: string;
    };
    integration_manifest: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
      resource: string;
    };
    search: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
      resource: string;
    };
  };
  // This object is deprecated, use 'core' instead.
  // rate: {
  //   limit: number;
  //   remaining: number;
  //   reset: number;
  //   used: number;
  //   resource: string;
  // };
};

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  language: string | null;
  has_pages: boolean;
  license: License | null;
  default_branch: string;
};

export type CacheKey = string | undefined;
