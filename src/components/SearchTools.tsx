import classNames from 'classnames';
import { useCallback } from 'react';

import { SvgIcon } from '@/components/SvgIcon';
import { useFocus } from '@/hooks/useFocus';
import type { SortKey } from '@/types/sorting';

import '@/components/search-tools.css';

export function SearchTools({
  disabled,
  selectedRepo,
  setSearchTerm,
  showLinks,
  sortByAlphabet,
  sortByTime,
  sortKey,
  toggleShowLinks,
}: {
  disabled: boolean;
  selectedRepo: string | undefined;
  setSearchTerm: SetState<string | undefined>;
  showLinks: boolean;
  sortByAlphabet: () => void;
  sortByTime: () => void;
  sortKey: SortKey;
  toggleShowLinks: () => void;
}) {
  const searchInputId = 'search' as const;
  const { hasFocus, onBlur, onFocus } = useFocus();
  const onChange = useCallback((event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div
      className="search-tools"
      style={selectedRepo ? { display: 'none' } : undefined}
    >
      <div
        className={classNames('search-bar', {
          'focus-visible': hasFocus,
          disabled,
        })}
      >
        <label htmlFor={searchInputId}>
          <SvgIcon icon="search" />
        </label>
        <input
          autoComplete="off"
          disabled={disabled}
          id={searchInputId}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={hasFocus ? undefined : 'Search'}
          type="search"
        ></input>
      </div>
      <div className="button-set">
        <button
          className={classNames('filter-button', { active: showLinks })}
          onClick={toggleShowLinks}
          title={showLinks ? 'show all projects' : 'show deployed projects'}
        >
          <SvgIcon icon="link" size="medium" />
        </button>
        <button
          className={classNames('filter-button', {
            active: sortKey === 'name',
          })}
          onClick={sortByAlphabet}
          title="sort by name"
        >
          <SvgIcon icon="sortByAlphabet" size="medium" />
        </button>
        <button
          className={classNames('filter-button', {
            active: sortKey === 'updated_at',
          })}
          onClick={sortByTime}
          title="sort by last updated"
        >
          <SvgIcon icon="sortByTime" size="medium" />
        </button>
      </div>
    </div>
  );
}
