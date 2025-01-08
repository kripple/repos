/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';

import type { Repo as RepoType } from '@/api';
import { itemsPerPage } from '@/api';
import { Repo } from '@/components/Repo';
import { SvgIcon } from '@/components/SvgIcon';
import { useRepos } from '@/hooks/useRepos';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax: number }) {
  if (itemsMax === 0) throw Error('no.');

  // const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [repos, setRepos] = useState<{
    [key: string]: Pick<RepoType, 'name' | 'updated_at'> & {
      hide?: boolean;
      highlight?: string;
    };
  }>({});
  // const [sortOrder, setSortOrder] = useState<(keyof typeof repos)[]>([]);
  const [page, setPage] = useState<number>(1);
  const { currentData, isFetching } = useRepos({
    itemsMax,
    page,
  });

  // const [selectedRepo, setSelectedRepo] = useState<string>();
  // const selectRepo = (event) => {
  //   setSelectedRepo()
  // }

  useEffect(() => {
    // console.log({ currentData });
    if (!currentData || currentData.length === 0) return;

    setRepos((current) => {
      const draft = { ...current };
      currentData.map(({ name, updated_at }) => {
        draft[name] = { name, updated_at };
      });
      return draft;
    });

    // const names = currentData.map(({ name }) => name);
    // setSortOrder(names);
  }, [currentData]);

  useEffect(() => {
    const lastPage = Math.ceil(itemsMax / itemsPerPage);
    if (!currentData || currentData.length === 0 || isFetching) return;

    setPage((currentPage) => {
      // console.log({ currentPage, lastPage });
      return currentPage === lastPage ? currentPage : currentPage + 1;
    });
  }, [currentData, isFetching]);

  return (
    <>
      <div className={`search-bar${isFocused ? ' focus-visible' : ''}`}>
        <label htmlFor="search-bar">
          <SvgIcon icon="search" />
        </label>
        <input
          id="search-bar"
          onBlur={() => setIsFocused(false)}
          onChange={(event) => {
            const searchInputValue = event.target.value;
            console.log({ searchInputValue });
            setRepos((current) => {
              const draft = { ...current };

              Object.values(current).map((item) => {
                const match = item.name.includes(event.target.value);
                draft[item.name].highlight = match
                  ? searchInputValue
                  : undefined;
                draft[item.name].hide = !match;
              });

              return draft;
            });
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={isFocused ? undefined : 'Search'}
          type="search"
        ></input>
      </div>
      <div className="repos-list">
        {Object.values(repos)?.map((repo) => (
          <Repo
            hide={repo.hide}
            highlight={repo.highlight}
            key={repo.name}
            name={repo.name}
          />
        ))}
      </div>
    </>
  );
}
