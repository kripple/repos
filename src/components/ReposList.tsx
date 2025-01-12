import { useMemo, useState } from 'react';

import { Repo } from '@/components/Repo';
import { SvgIcon } from '@/components/SvgIcon';
import { useRepos } from '@/hooks/useRepos';
import type { SortDirection, SortKey } from '@/types/sorting';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax?: number }) {
  if (itemsMax === 0) throw Error('no.');

  // visual state
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // filter
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedRepo, setSelectedRepo] = useState<string | undefined>();
  const [linksFilter, setLinksFilter] = useState<boolean>(false);

  // sort

  const [sortKey, _setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('initial');
  const setSortKey = (value?: SortKey) => {
    _setSortKey(value || 'name');
  };

  const { currentData, isLoading } = useRepos({
    itemsMax,
  });
  type RepoEntitys = NonNullable<typeof currentData>['entities'];
  const ids = currentData?.ids || [];
  const repos: RepoEntitys = currentData?.entities || {};
  const isDisabled = isLoading || !ids || ids.length === 0;

  const sortedByUpdatedAt = useMemo(
    () =>
      Object.values(repos)
        .sort(({ updated_at: a }, { updated_at: b }) => {
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        })
        .map(({ id }) => id),
    [repos],
  );

  const sortedIds: typeof ids = (() => {
    if (sortKey === 'name') {
      return ids; // this is the initial sort order
    } else if (sortKey === 'updated_at') {
      return sortedByUpdatedAt;
    } else {
      return ids;
    }
  })();
  const displayIds =
    sortDirection === 'reverse' ? [...sortedIds].reverse() : sortedIds;
  const searchInputId = 'search';

  return (
    <div className="repos-list">
      <div
        className="search-tools"
        style={selectedRepo ? { display: 'none' } : undefined}
      >
        <div
          className={`search-bar${isFocused ? ' focus-visible' : ''}${isDisabled ? ' disabled' : ''}`}
        >
          <label htmlFor={searchInputId}>
            <SvgIcon icon="search" />
          </label>
          <input
            autoComplete="off"
            disabled={isDisabled}
            id={searchInputId}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={isFocused ? undefined : 'Search'}
            type="search"
          ></input>
        </div>
        <div className="button-set">
          <button
            className="filter-button"
            onClick={() => {
              setLinksFilter((current) => !current);
            }}
            title={linksFilter ? 'show all projects' : 'show deployed projects'}
          >
            <SvgIcon icon="link" size="medium" />
          </button>
          <button
            className="filter-button"
            onClick={() => {
              if (sortKey === 'name') {
                setSortDirection((current) =>
                  current === 'initial' ? 'reverse' : 'initial',
                );
              } else {
                setSortKey('name');
                setSortDirection('initial');
              }
            }}
            title="sort by name"
          >
            <SvgIcon icon="sortByAlphabet" size="medium" />
          </button>
          <button
            className="filter-button"
            onClick={() => {
              if (sortKey === 'updated_at') {
                setSortDirection((current) =>
                  current === 'initial' ? 'reverse' : 'initial',
                );
              } else {
                setSortKey('updated_at');
                setSortDirection('initial');
              }
            }}
            title="sort by last updated"
          >
            <SvgIcon icon="sortByTime" size="medium" />
          </button>
        </div>
      </div>
      {displayIds.map((id, index) => {
        const repo = repos[id];

        const selected = id.toString() === selectedRepo;

        const match = searchTerm && repo.name.includes(searchTerm);

        const filterHasNoMatch = Boolean(searchTerm) && !match;
        const filterLinks = linksFilter && !repo.has_pages;
        const hide = filterHasNoMatch || filterLinks;

        return (
          <Repo
            data={repo}
            hide={hide}
            highlight={match ? searchTerm : undefined}
            key={repo.name}
            order={index}
            selected={selected}
            setSelected={setSelectedRepo}
            showLink={linksFilter}
            showUpdatedAt={sortKey === 'updated_at'}
          />
        );
      })}
    </div>
  );
}
