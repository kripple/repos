/* eslint-disable react/jsx-no-bind */
// import debounce from 'just-debounce';
import { useEffect, useState } from 'react';

import { config } from '@/api/config';
import type { Repo as RepoType } from '@/api/types';
import { Repo } from '@/components/Repo';
import { SvgIcon } from '@/components/SvgIcon';
import { useRepos } from '@/hooks/useRepos';

import '@/components/repos-list.css';

export function ReposList({ itemsMax }: { itemsMax?: number }) {
  if (itemsMax === 0) throw Error('no.');

  const [selectedRepo, setSelectedRepo] = useState<string>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [repos, setRepos] = useState<{
    [key: string]: RepoType & {
      hide?: boolean;
      highlight?: string;
    };
  }>({});

  const [page, setPage] = useState<number>(1);
  const { currentData, isFetching } = useRepos({
    itemsMax,
    page,
  });
  const isDisabled = Object.keys(repos).length === 0;

  useEffect(() => {
    // function doStuff() {}
    // window.addEventListener('resize', debounce(doStuff, 200, true));
    // doStuff();
  }, []);

  useEffect(() => {
    if (!currentData || currentData.length === 0) return;

    setRepos((current) => {
      const draft = { ...current };
      currentData.map((data) => {
        draft[data.name] = data;
      });
      return draft;
    });

    // const names = currentData.map(({ name }) => name);
    // setSortOrder(names);
  }, [currentData]);

  useEffect(() => {
    if (!itemsMax) return;
    const lastPage = Math.ceil(itemsMax / config.itemsPerPage);
    if (!currentData || currentData.length === 0 || isFetching) return;

    setPage((currentPage) =>
      currentPage === lastPage ? currentPage : currentPage + 1,
    );
  }, [currentData, itemsMax, isFetching]);

  return (
    <datalist className="repos-list">
      <div
        className={`search-bar${isFocused ? ' focus-visible' : ''}${isDisabled ? ' disabled' : ''}`}
        style={selectedRepo ? { display: 'none' } : undefined}
      >
        <div className="search-bar-contents">
          <label htmlFor="search-bar">
            <SvgIcon icon="search" />
          </label>
          <input
            autoComplete="off"
            disabled={isDisabled}
            id="search-bar"
            onBlur={() => setIsFocused(false)}
            onChange={(event) => {
              const searchInputValue = event.target.value;
              console.log({ searchInputValue });
              setRepos((current) => {
                const draft: typeof current = {};

                Object.values(current).map((item) => {
                  const match = item.name.includes(event.target.value);
                  draft[item.name] = {
                    ...current[item.name],
                    highlight: match ? searchInputValue : undefined,
                    hide: !match,
                  };
                });

                return {
                  ...current,
                  ...draft,
                };
              });
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={isFocused ? undefined : 'Search'}
            type="search"
          ></input>
        </div>
        {/* <button></button>
        <button></button>
        <button></button> */}
      </div>
      {Object.values(repos)?.map((repo) => {
        const selected = repo.name === selectedRepo;

        return (
          <Repo
            close={() => {
              setSelectedRepo(undefined);
            }}
            data={repo}
            hide={repo.hide}
            highlight={repo.highlight}
            key={repo.name}
            select={(event) => {
              setSelectedRepo(event.target.value);
            }}
            selected={selected}
          />
        );
      })}
    </datalist>
  );
}
