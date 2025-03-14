export const formatDate = (string: string) =>
  new Date(string).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
  });

export const formatDateTime = (string: string) => string.substring(0, 10);
