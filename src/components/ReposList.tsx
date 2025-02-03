import { useCallback, useMemo, useState } from 'react';

import { Repo } from '@/components/Repo';
import { SearchTools } from '@/components/SearchTools';
import { useDefaultValue } from '@/hooks/useDefaultValue';
import { useRepos } from '@/hooks/useRepos';
import type { SortDirection, SortKey } from '@/types/sorting';
import { sortByKey } from '@/utils/sort';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax?: number }) {
  if (itemsMax === 0) throw Error('no.');
  const placeholder = 'placeholder' as const;
  const empty: { [key in string]?: undefined } = {} as const;

  // filter
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedRepo, setSelectedRepo] = useState<string>();

  const [showLinks, setShowLinks] = useState<boolean>(false);
  const toggleShowLinks = useCallback(() => {
    setShowLinks((current) => !current);
  }, []);

  // sort
  const [sortKey, _setSortKey] = useState<SortKey>('updated_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('initial');
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

  const sortedIds: typeof ids = useMemo(() => {
    if (sortKey === 'name') {
      return ids; // this is the initial sort order
    } else if (sortKey === 'updated_at') {
      return sortedByUpdatedAt;
    } else {
      return ids;
    }
  }, [sortKey, ids, sortedByUpdatedAt]);

  const displayIds =
    itemsMax && sortedIds.length < itemsMax
      ? itemsMax
        ? Array.from({ length: itemsMax }, () => placeholder)
        : []
      : sortedIds && sortDirection === 'reverse'
        ? [...sortedIds].reverse()
        : sortedIds;

  const sortByAlphabet = useCallback(() => {
    if (sortKey === 'name') {
      setSortDirection((current) =>
        current === 'initial' ? 'reverse' : 'initial',
      );
    } else {
      setSortKey('name');
      setSortDirection('initial');
    }
  }, [sortKey]);

  const sortByTime = useCallback(() => {
    if (sortKey === 'updated_at') {
      setSortDirection((current) =>
        current === 'initial' ? 'reverse' : 'initial',
      );
    } else {
      setSortKey('updated_at');
      setSortDirection('initial');
    }
  }, [sortKey]);

  return (
    <div className="repos-list" data-testid="ReposList">
      <SearchTools
        selectedRepo={selectedRepo}
        setSearchTerm={setSearchTerm}
        showLinks={showLinks}
        sortByAlphabet={sortByAlphabet}
        sortByTime={sortByTime}
        sortKey={sortKey}
        toggleShowLinks={toggleShowLinks}
      />

      {displayIds.map((id, index) => {
        const repo = id === placeholder ? undefined : repos[id];
        const repoData = repo || empty;
        const selected = id.toString() === selectedRepo;
        const match =
          searchTerm &&
          repoData.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const hide =
          (Boolean(searchTerm) && !match) || (showLinks && !repoData.has_pages);
        const key = repoData.name || `${placeholder}-${index}`;

        return (
          <Repo
            data={repo}
            hide={hide}
            highlight={match ? searchTerm : undefined}
            key={key}
            order={index}
            selected={selected}
            setSelected={setSelectedRepo}
            showLink={showLinks}
          />
        );
      })}
    </div>
  );
}
