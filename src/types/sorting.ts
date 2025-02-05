export type SortDirection = 'initial' | 'reverse';

const sortKeys = ['name', 'updated_at'] as const;
export type SortKey = Union<typeof sortKeys>;

export const isSortKey = (value?: unknown): value is SortKey => {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  if (!(sortKeys as readonly string[]).includes(value)) return false;

  return true;
};
