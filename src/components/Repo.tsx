import classNames from 'classnames';
import { useCallback } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { Highlight } from '@/components/Highlight';
import { SelectedRepo } from '@/components/SelectedRepo';
// import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
// import { formatDate } from '@/utils/format';

import '@/components/repo.css';

export function Repo({
  data,
  hide,
  highlight,
  selected,
  setSelected,
}: {
  data?: RepoType;
  hide: boolean;
  highlight?: string;
  order: number;
  selected?: boolean;
  setSelected: SetState<string | undefined>;
}) {
  const onKeyDown = useOnKeyDown();
  const {
    id,
    name,
    has_pages,
    //  updated_at,
    // html_url,
  } = data
    ? data
    : {
        id: -1,
      };
  const pagesUrl =
    name === 'kripple.github.io'
      ? 'https://kripple.github.io'
      : has_pages && name
        ? `https://kripple.github.io/${name}`
        : undefined;

  const selectRepo = useCallback(
    (event: ClickEvent) => {
      setSelected?.(event.currentTarget.value);
    },
    [setSelected],
  );

  const deselectRepo = useCallback(() => {
    setSelected?.(undefined);
  }, [setSelected]);

  // memoize?
  const shared = (
    <>
      {/* <a
        className="repo-source-button"
        href={html_url}
        onKeyDown={onKeyDown}
        rel="noreferrer"
        tabIndex={0}
        target="_blank"
      >
        <SvgIcon icon="octocat" />
      </a> */}
      <button
        className="repo-title"
        data-testid="SelectRepoButton"
        disabled={!name || id < 0}
        onClick={selected ? deselectRepo : selectRepo}
        onKeyDown={onKeyDown}
        tabIndex={0}
        value={id}
      >
        <Highlight highlight={highlight} name={name || ''} />
        {/* <div className="repo-date">
          {updated_at ? formatDate(updated_at) : 'MM/DD/YY'}
        </div> */}
      </button>
      {/* {pagesUrl ? (
        <a
          className="repo-link-button"
          href={pagesUrl}
          onKeyDown={onKeyDown}
          rel="noreferrer"
          tabIndex={0}
          target="_blank"
        >
          <SvgIcon icon="link" />
        </a>
      ) : null} */}
    </>
  );

  if (hide) return null;
  return (
    <div
      className={classNames('repo', { selected, loading: !name })}
      data-testid="Repo"
    >
      {data && selected ? (
        <SelectedRepo
          data={data}
          deselectRepo={deselectRepo}
          pagesUrl={pagesUrl}
        >
          {shared}
        </SelectedRepo>
      ) : (
        shared
      )}
    </div>
  );
}
