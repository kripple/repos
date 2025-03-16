import { useCallback, useState } from 'react';

import { SortMenu } from '@/components/SortMenu';
import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { SortKey } from '@/types/sort';

export function FilterButton({
  setSortKey,
  sortKey,
}: {
  setSortKey: (value?: SortKey) => void;
  sortKey: SortKey;
}) {
  const onKeyDown = useOnKeyDown();
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  const onClick = useCallback(() => setShowSortMenu((current) => !current), []);
  const sortBy = (key: SortKey) => {
    setSortKey(key);
    setShowSortMenu(false);
  };
  const sortByName = useCallback(() => sortBy('name'), []);
  const sortByLastUpdated = useCallback(() => sortBy('updated_at'), []);
  const sortBySize = useCallback(() => sortBy('size'), []);

  return (
    <>
      <button
        className="dropdown-button"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Filter <SvgIcon icon="arrowDown" />
      </button>
      {showSortMenu ? (
        <SortMenu
          closeMenu={onClick}
          sortByLastUpdated={sortByLastUpdated}
          sortByName={sortByName}
          sortBySize={sortBySize}
          sortKey={sortKey}
        />
      ) : null}
    </>
  );
}
