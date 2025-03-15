import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import type { Repo as RepoType } from '@/api/types';
import { DateBadge } from '@/components/DateBadge';
import { Highlight } from '@/components/Highlight';
// import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';

import '@/components/repo.css';

export function Repo({
  data,
  highlight,
  order,
  repoCount,
  // selected,
  setSelected,
}: {
  data?: RepoType;
  highlight?: string;
  order: number;
  repoCount: number;
  selected?: boolean;
  setSelected: SetState<string | undefined>;
}) {
  const [toggle, setToggle] = useState<boolean>(true);
  const delay = 0.07 as const;
  const duration = 0.6 as const;
  const onKeyDown = useOnKeyDown();
  const {
    id,
    name,
    // has_pages,
    updated_at,
    // html_url,
  } = data ? data : {};
  const loading = !name;

  const ms = (delay * repoCount + duration * 2) * 1000;
  useInterval(
    () => {
      setToggle((value) => !value);
    },
    loading ? ms : null,
  );

  const selectRepo = useCallback(
    (event: ClickEvent) => {
      setSelected?.(event.currentTarget.value);
    },
    [setSelected],
  );

  // const deselectRepo = useCallback(() => {
  //   setSelected?.(undefined);
  // }, [setSelected]);

  return (
    <div
      className={classNames('repo', { loading })}
      data-testid="Repo"
      style={{
        animationName: toggle ? 'bounce' : 'bounce-repeat',
        animationDelay: `${delay * order}s`,
        animationDuration: `${duration}s`,
      }}
    >
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
        disabled={!name || !id}
        onClick={selectRepo}
        onKeyDown={onKeyDown}
        tabIndex={0}
        value={id}
      >
        <div className="repo-date">
          <DateBadge date={updated_at} />
        </div>
        <Highlight highlight={highlight} name={name || ''} />
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
    </div>
  );
}
