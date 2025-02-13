export const format = (string: string) =>
  new Date(string).toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
  });
