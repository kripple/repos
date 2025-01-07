export const repo = {
  repos: {
    name: 'repos',
  },
  'kripple.github.io': {
    name: 'kripple.github.io',
  },
};

export const isRepo = (name: unknown): name is keyof typeof repo => {
  if (typeof name !== 'string') return false;
  return Object.keys(repo).includes(name);
};
