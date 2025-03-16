const filterKeys = ['all', 'has_pages', 'missing_license'] as const;
export type FilterKey = Union<typeof filterKeys>;

export const isFilterKey = (value?: unknown): value is FilterKey => {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  if (!(filterKeys as readonly string[]).includes(value)) return false;

  return true;
};
