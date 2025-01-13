import classNames from 'classnames';
import { useCallback } from 'react';

import type { Repo as RepoType } from '@/api/types';
import { Highlight } from '@/components/Highlight';
import { SvgIcon } from '@/components/SvgIcon';
import { Text } from '@/components/Text';
import { TextLink } from '@/components/TextLink';
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
  const languages = currentData ? Object.keys(currentData) : undefined;
  const pagesUrl = `https://kellyripple.com/${name}`;

  const subtitle = showUpdatedAt ? `(${format(updated_at)})` : undefined;
  const showPagesLinkButton = has_pages && showLink;

  const selectRepo = useCallback((event: ClickEvent) => {
    setSelected(event.currentTarget.value);
  }, []);

  const deselectRepo = useCallback(() => {
    setSelected(undefined);
  }, []);

  if (hide) return null;
  return (
    <div className={classNames('repo', { selected })}>
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
      <button className="repo-title" onClick={selectRepo} value={id}>
        <Highlight highlight={highlight} name={name} />
        {subtitle ? <span className="repo-subtitle">{subtitle}</span> : null}
      </button>
      <div className="repo-details">
        <Text label="Description">{description}</Text>
        <Text
          label={languages && languages.length > 1 ? 'Languages' : 'Language'}
        >
          {languages ? languages.join(', ') : language}
        </Text>
        <TextLink label="License" url={license?.url}>
          {license?.name}
        </TextLink>
        <TextLink label="Pages Site" url={has_pages ? pagesUrl : undefined}>
          {pagesUrl?.replace('https://', '')}
        </TextLink>
        <TextLink label="Website" url={homepage}>
          {homepage?.replace('https://', '')}
        </TextLink>
        <Text label="Default Branch">{default_branch}</Text>
        <Text label="Created On">{created_at}</Text>
        <Text label="Last Updated">{updated_at}</Text>
        <TextLink icon="octocat" url={html_url}>
          View on Github
        </TextLink>
      </div>
      <button className="close-button" onClick={deselectRepo}>
        <SvgIcon icon="close" />
      </button>
    </div>
  );
}
