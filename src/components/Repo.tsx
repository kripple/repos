import { useEffect } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { SvgIcon } from '@/components/SvgIcon';
import { useLanguages } from '@/hooks/useLanguages';
import { format } from '@/utils/format';

import '@/components/repo.css';

export function Repo({
  data,
  hide,
  highlight,
  showLink,
  showUpdatedAt,
  selected,
  setSelected,
}: {
  data: RepoType;
  hide?: boolean;
  highlight?: string;
  order: number;
  showLink?: boolean;
  showUpdatedAt?: boolean;
  selected?: boolean;
  setSelected: SetState<string | undefined>;
}) {
  const {
    id,
    name,
    html_url,
    description,
    created_at,
    updated_at,
    homepage,
    language,
    has_pages,
    license,
    default_branch,
  } = data;
  const { currentData } = useLanguages(name, { selected });
  const pagesUrl = `https://kellyripple.com/${name}`;

  useEffect(() => {
    currentData && console.log({ currentData });
  }, [currentData]);

  const __html = highlight
    ? name.replace(
        highlight,
        `<span style="color: var(--title-color); font-weight: 900">${highlight}</span>`,
      )
    : name;

  const subtitle = showUpdatedAt ? `(${format(updated_at)})` : undefined;
  const showPagesLinkButton = has_pages && showLink;

  return (
    <div
      className={`repo${selected ? ' selected' : ''}`}
      style={hide ? { display: 'none' } : undefined}
    >
      {showPagesLinkButton ? (
        <a
          className="repo-button"
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
        onClick={(event) => {
          setSelected(event.currentTarget.value);
        }}
        value={id}
      >
        <span className="repo-name" dangerouslySetInnerHTML={{ __html }}></span>
        {subtitle ? <span className="repo-subtitle">{subtitle}</span> : null}
      </button>
      <div className="repo-details">
        {description ? (
          <div>
            <span className="label">Description: </span>
            {description}
          </div>
        ) : null}

        {language ? (
          <div>
            <span className="label">Language: </span>
            {language}
          </div>
        ) : null}

        {license ? (
          <a href={license.url} rel="noreferrer" tabIndex={0} target="_blank">
            <span className="label">License: </span>
            {license.name}
          </a>
        ) : null}

        {has_pages ? (
          <a href={pagesUrl} rel="noreferrer" tabIndex={0} target="_blank">
            <span className="label">Pages Site: </span>
            {pagesUrl.replace('https://', '')}
          </a>
        ) : null}

        {homepage ? (
          <a href={homepage} rel="noreferrer" tabIndex={0} target="_blank">
            <span className="label">Website: </span>
            {homepage.replace('https://', '')}
          </a>
        ) : null}

        <div>
          <span className="label">Default Branch: </span>
          {default_branch}
        </div>

        <div>
          <span className="label">Created On: </span>
          {created_at}
        </div>

        <div>
          <span className="label">Last Updated: </span>
          {updated_at}
        </div>

        <a href={html_url} rel="noreferrer" tabIndex={0} target="_blank">
          <SvgIcon icon="octocat" />
          <span className="label">View on Github</span>
        </a>
      </div>
      <button
        className="close-button"
        onClick={() => {
          setSelected(undefined);
        }}
      >
        <SvgIcon icon="close" />
      </button>
    </div>
  );
}
