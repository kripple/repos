import classNames from 'classnames';
import { useCallback } from 'react';

import { DropdownButton } from '@/components/DropdownButton';
import { SvgIcon } from '@/components/SvgIcon';
import { useFocus } from '@/hooks/useFocus';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { FilterKey } from '@/types/filter';
import type { SortKey } from '@/types/sort';

import '@/components/search-tools.css';

export function SearchTools({
  setSearchTerm,
  setSortKey,
  sortKey,
  setFilterKey,
  filterKey,
}: {
  setSearchTerm: SetState<string | undefined>;
  setSortKey: (value?: SortKey) => void;
  sortKey: SortKey;
  setFilterKey: (value: FilterKey) => void;
  filterKey: FilterKey;
}) {
  const searchInputId = 'search' as const;
  const { hasFocus, onBlur, onFocus } = useFocus();
  const onKeyDown = useOnKeyDown();
  const onChange = useCallback((event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  }, []);

  const sortMenuItems = [
    {
      label: 'Last updated',
      selected: sortKey === 'updated_at',
      onClick: () => setSortKey('updated_at'),
    },
    {
      label: 'Name',
      selected: sortKey === 'name',
      onClick: () => setSortKey('name'),
    },
    {
      label: 'Size',
      selected: sortKey === 'size',
      onClick: () => setSortKey('size'),
    },
  ];

  const filterMenuItems = [
    {
      label: 'None',
      selected: filterKey === 'all',
      onClick: () => setFilterKey('all'),
    },
    {
      label: 'Has website',
      selected: filterKey === 'has_pages',
      onClick: () => setFilterKey('has_pages'),
    },
    // {
    //   label: 'No license',
    //   selected: filterKey === 'missing_license',
    //   onClick: () => setFilterKey('missing_license'),
    // },
  ];

  return (
    <div className="search-tools" data-testid="SearchTools">
      <div
        className={classNames('search-bar', {
          'focus-visible': hasFocus,
        })}
      >
        <label htmlFor={searchInputId}>
          <SvgIcon icon="search" />
        </label>
        <input
          autoComplete="off"
          data-testid="Search"
          id={searchInputId}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={hasFocus ? undefined : 'Search'}
          type="search"
        ></input>
      </div>

      <DropdownButton
        label="Sort"
        menuItems={sortMenuItems}
        menuLabel="Select order"
      />
      <DropdownButton
        label="Filter"
        menuItems={filterMenuItems}
        menuLabel="Select filter"
      />
    </div>
  );
}
