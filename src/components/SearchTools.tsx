import classNames from 'classnames';
import { useCallback } from 'react';

import { SvgIcon } from '@/components/SvgIcon';
import { useFocus } from '@/hooks/useFocus';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { SortKey } from '@/types/sorting';

import '@/components/search-tools.css';

export function SearchTools({
  selectedRepo,
  setSearchTerm,
  sortByAlphabet,
  sortByTime,
  sortKey,
  toggleShowLinks,
}: {
  selectedRepo: string | undefined;
  setSearchTerm: SetState<string | undefined>;
  sortByAlphabet: () => void;
  sortByTime: () => void;
  sortKey: SortKey;
  toggleShowLinks: () => void;
}) {
  const searchInputId = 'search' as const;
  const { hasFocus, onBlur, onFocus } = useFocus();
  const onKeyDown = useOnKeyDown();
  const onChange = useCallback((event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div
      className="search-tools"
      data-testid="SearchTools"
      style={selectedRepo ? { display: 'none' } : undefined}
    >
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
          id={searchInputId}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={hasFocus ? undefined : 'Search'}
          role="search"
          type="search"
        ></input>
      </div>
      <div className="button-set">
        <button className="sort-button" onKeyDown={onKeyDown}>
          Sort <SvgIcon icon="arrowDown" />
        </button>
        {/* <button
          className={classNames('filter-button', {
            active: sortKey === 'name',
          })}
          onClick={sortByAlphabet}
          title="sort by name"
        >
          <SvgIcon icon="sortByAlphabet" size="medium" />
        </button> */}
        {/* <button
          className={classNames('filter-button', {
            active: sortKey === 'updated_at',
          })}
          onClick={sortByTime}
          title="sort by last updated"
        >
          <SvgIcon icon="sortByTime" size="medium" />
        </button> */}
      </div>
    </div>
  );
}
