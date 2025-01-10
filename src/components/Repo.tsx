// import { useRepo } from '@/hooks/useRepo';
import type { MouseEventHandler } from 'react';
import { useRef, useState } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { SvgIcon } from '@/components/SvgIcon';
import { useEffectOnce } from '@/hooks/useEffectOnce';

import '@/components/repo.css';

export function Repo({
  data: {
    name,
    html_url,
    description,
    created_at,
    updated_at,
    homepage,
    size,
    language,
    has_pages,
    license,
    default_branch,
  },
  hide,
  highlight,
  order,
  selected,
  select,
  close,
}: {
  data: RepoType;
  hide?: boolean;
  highlight?: string;
  selected?: boolean;
  order: number;
  select: OnClick;
  close: OnClick;
}) {
  const handler = useRef<NodeJS.Timeout>(null);
  const [show, setShow] = useState<boolean>(false);
  // const { currentData } = useRepo(name);

  useEffectOnce(() => {
    handler.current = setTimeout(() => {
      setShow(true);
    }, 70 * order);

    return () => {
      handler.current && clearTimeout(handler.current);
    };
  });

  const __html = highlight
    ? name.replace(
        highlight,
        `<span style="color: var(--title-color); font-weight: 900">${highlight}</span>`,
      )
    : name;

  return (
    <div
      className={`repo${selected ? ' selected' : ''}${show ? ' show' : ''}`}
      style={hide ? { display: 'none' } : undefined}
    >
      <option
        className="repo-contents"
        dangerouslySetInnerHTML={{ __html }}
        onClick={select as unknown as MouseEventHandler<HTMLOptionElement>}
        role={selected ? undefined : 'button'}
        value={name}
      ></option>
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
          <a
            href={`https://kellyripple.com/${name}`}
            rel="noreferrer"
            tabIndex={0}
            target="_blank"
          >
            <span className="label">Pages Site: </span>
            {`kellyripple.com/${name}`}
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
          <span className="label">Size: </span>
          {size}
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
        onClick={close as unknown as MouseEventHandler<HTMLButtonElement>}
      >
        <SvgIcon icon="close" />
      </button>
    </div>
  );
}
