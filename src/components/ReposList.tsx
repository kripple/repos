import { useCallback, useMemo, useState } from 'react';

import { Repo } from '@/components/Repo';
import { SearchTools } from '@/components/SearchTools';
import { useRepos } from '@/hooks/useRepos';
import type { SortDirection, SortKey } from '@/types/sorting';
import { sortByKey } from '@/utils/sort';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax?: number }) {
  if (itemsMax === 0) throw Error('no.');

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
  const setSortKey = (value?: SortKey) => {
    _setSortKey(value || 'name');
  };

  const { currentData, isLoading } = useRepos({
    itemsMax,
  });
  const ids = currentData?.ids || [];
  const repos = currentData?.entities || {};

  const sortedByUpdatedAt = useMemo(
    () => sortByKey(repos, 'updated_at'),
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
    <div className="repos-list">
      <SearchTools
        disabled={isLoading || !ids || ids.length === 0}
        selectedRepo={selectedRepo}
        setSearchTerm={setSearchTerm}
        showLinks={showLinks}
        sortByAlphabet={sortByAlphabet}
        sortByTime={sortByTime}
        sortKey={sortKey}
        toggleShowLinks={toggleShowLinks}
      />

      {displayIds.map((id, index) => {
        const repo = repos[id];
        const selected = id.toString() === selectedRepo;
        const match =
          searchTerm &&
          repo.name.toLowerCase().includes(searchTerm.toLowerCase());
        const hide =
          (Boolean(searchTerm) && !match) || (showLinks && !repo.has_pages);

        return (
          <Repo
            data={repo}
            hide={hide}
            highlight={match ? searchTerm : undefined}
            key={repo.name}
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
