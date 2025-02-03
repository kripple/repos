import classNames from 'classnames';
import { useCallback } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { Highlight } from '@/components/Highlight';
import { SelectedRepo } from '@/components/SelectedRepo';
import { SvgIcon } from '@/components/SvgIcon';
import { format } from '@/utils/format';

import '@/components/repo.css';

export function Repo({
  data,
  hide,
  highlight,
  showLink,
  selected,
  setSelected,
}: {
  data?: RepoType;
  hide: boolean;
  highlight?: string;
  order: number;
  showLink?: boolean;
  selected?: boolean;
  setSelected: SetState<string | undefined>;
}) {
  const { id, name, has_pages, updated_at } = data
    ? data
    : {
        id: -1,
      };
  const pagesUrl =
    has_pages && name ? `https://kellyripple.com/${name}` : undefined;
  const showPagesLinkButton = has_pages && showLink;

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
      {showPagesLinkButton ? (
        <a
          className="repo-link-button"
          href={pagesUrl}
          rel="noreferrer"
          tabIndex={0}
          target="_blank"
        >
          <SvgIcon icon="link" />
        </a>
      ) : null}
      <button
        className="repo-title"
        data-testid="SelectRepoButton"
        disabled={!name || id < 0}
        onClick={selectRepo}
        value={id}
      >
        <Highlight highlight={highlight} name={name || ''} />
      </button>
      <button
        className="repo-data-button"
        disabled={!name || id < 0}
        onClick={selectRepo}
        value={id}
      >
        {updated_at ? format(updated_at) : 'MM/DD/YY'}
      </button>
    </>
  );

  if (hide) return null;
  return (
    <div className={classNames('repo', { selected })} data-testid="Repo">
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
