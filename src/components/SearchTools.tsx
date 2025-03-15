import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { SortMenu } from '@/components/SortMenu';
import { SvgIcon } from '@/components/SvgIcon';
import { useFocus } from '@/hooks/useFocus';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { SortKey } from '@/types/sorting';

import '@/components/search-tools.css';

export function SearchTools({
  // selectedRepo,
  setSearchTerm,
  setSortKey,
  sortKey,
  // toggleShowLinks,
}: {
  selectedRepo: string | undefined;
  setSearchTerm: SetState<string | undefined>;
  setSortKey: (value?: SortKey) => void;
  sortKey: SortKey;
  toggleShowLinks: () => void;
}) {
  const searchInputId = 'search' as const;
  const { hasFocus, onBlur, onFocus } = useFocus();
  const onKeyDown = useOnKeyDown();
  const onChange = useCallback((event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  }, []);

  const onClick = useCallback(() => setShowMenu((current) => !current), []);

  const sortByName = useCallback(() => {
    setSortKey('name');
    setShowMenu(false);
  }, []);

  const sortByLastUpdated = useCallback(() => {
    setSortKey('updated_at');
    setShowMenu(false);
  }, []);

  const [showMenu, setShowMenu] = useState<boolean>(false);

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
      <div className="sort-tools">
        <button className="sort-button" onClick={onClick} onKeyDown={onKeyDown}>
          Sort <SvgIcon icon="arrowDown" />
        </button>
        {showMenu ? (
          <SortMenu
            closeMenu={onClick}
            sortByLastUpdated={sortByLastUpdated}
            sortByName={sortByName}
            sortKey={sortKey}
          />
        ) : null}
      </div>
    </div>
  );
}
