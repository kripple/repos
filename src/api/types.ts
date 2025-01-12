export type Profile = {
  avatar_url: string;
  blog: string;
  html_url: string;
  location: string;
  login: string;
  name: string;
  public_repos: number;
};

export type Language = {
  [key: string]: number;
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
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
