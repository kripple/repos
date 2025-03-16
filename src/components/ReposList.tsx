import { useCallback, useMemo, useState } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { Repo } from '@/components/Repo';
import { SearchTools } from '@/components/SearchTools';
import { SelectedRepo } from '@/components/SelectedRepo';
import { useDefaultValue } from '@/hooks/useDefaultValue';
import { useRepos } from '@/hooks/useRepos';
import type { FilterKey } from '@/types/filter';
import type { SortKey } from '@/types/sort';
import { sortByKey } from '@/utils/sort';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax?: number }) {
  if (itemsMax === 0) throw Error('no.');
  const placeholder = 'placeholder' as const;
  const empty: { [key in string]?: undefined } = {} as const;
  const [selectedRepo, setSelectedRepo] = useState<string>();

  // search
  const [searchTerm, setSearchTerm] = useState<string>();

  // filter
  const [filterKey, setFilterKey] = useState<FilterKey>('all');

  // sort
  const [sortKey, _setSortKey] = useState<SortKey>('updated_at');
  const setSortKey = useCallback((value?: SortKey) => {
    _setSortKey(value || 'name');
  }, []);

  const { currentData } = useRepos({
    itemsMax,
  });
  const ids = useDefaultValue([], currentData?.ids);
  const repos = useDefaultValue({}, currentData?.entities);
  const sortedByUpdatedAt = useMemo(
    () => sortByKey(repos, 'updated_at'),
    [repos],
  );
  const sortedBySize = useMemo(() => sortByKey(repos, 'size'), [repos]);

  const sortedIds: typeof ids = useMemo(() => {
    if (sortKey === 'name') {
      return ids; // this is the initial sort order
    } else if (sortKey === 'updated_at') {
      return sortedByUpdatedAt;
    } else if (sortKey === 'size') {
      return sortedBySize;
    } else {
      return ids;
    }
  }, [sortKey, ids, sortedByUpdatedAt]);

  const displayIds =
    itemsMax && sortedIds.length < itemsMax
      ? itemsMax
        ? Array.from({ length: itemsMax }, () => placeholder)
        : []
      : sortedIds;

  const filtered = displayIds.filter((id) => {
    const repo = id === placeholder ? undefined : repos[id];
    const repoData = repo || empty;
    const match =
      searchTerm &&
      repoData.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const searchFilter = Boolean(searchTerm) && !match;
    const pagesFilter = filterKey === 'has_pages' && !repoData.has_pages;
    const licenseFilter =
      filterKey === 'missing_license' && repoData.license !== null;
    const hide = searchFilter || pagesFilter || licenseFilter;

    return !hide;
  });

  const selectedRepoData = filtered.reduce(
    (result, id) => {
      if (
        selectedRepo &&
        id !== placeholder &&
        id.toString() === selectedRepo
      ) {
        result = repos[id];
      }
      return result;
    },
    undefined as RepoType | undefined,
  );

  const deselectRepo = useCallback(() => {
    setSelectedRepo(undefined);
  }, []);

  return (
    <div className="repos-list" data-testid="ReposList">
      {selectedRepoData ? (
        <SelectedRepo data={selectedRepoData} deselectRepo={deselectRepo} />
      ) : null}

      <SearchTools
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        setSearchTerm={setSearchTerm}
        setSortKey={setSortKey}
        sortKey={sortKey}
      />

      {/* 90 results for source repositories sorted by last updated	 Clear filter */}

      {filtered.map((id, index) => {
        const repo = id === placeholder ? undefined : repos[id];
        const repoData = repo || empty;
        const selected = id.toString() === selectedRepo;
        const match =
          searchTerm &&
          repoData.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const order = index + 1;
        const key = repoData.name || `${placeholder}-${order}`;

        return (
          <Repo
            data={repo}
            highlight={match ? searchTerm : undefined}
            key={key}
            order={order}
            repoCount={displayIds.length}
            selected={selected}
            setSelected={setSelectedRepo}
          />
        );
      })}
    </div>
  );
}
