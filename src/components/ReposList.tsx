/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';

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

  const { currentData } = useRepos({
    itemsMax,
  });
  const isDisabled = Object.keys(repos).length === 0;

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
      {Object.values(repos)?.map((repo, index) => {
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
            order={index}
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
