import type { Repo as RepoType } from '@/api/types';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { TextLink } from '@/components/TextLink';
import { useLanguages } from '@/hooks/useLanguages';

import '@/components/selected-repo.css';

export function SelectedRepo({
  data,
  deselectRepo,
}: {
  data: RepoType;
  deselectRepo?: () => void;
}) {
  const {
    name,
    html_url,
    description,
    created_at,
    updated_at,
    homepage,
    language,
    license,
    size,
    default_branch,
    has_pages,
  } = data;
  const pagesUrl =
    name === 'kripple.github.io'
      ? 'https://kripple.github.io'
      : has_pages && name
        ? `https://kripple.github.io/${name}`
        : undefined;
  const { currentData } = useLanguages(name);
  const languages = currentData ? Object.keys(currentData) : undefined;
  const formatDate = (value: string) => value.substring(0, 10);
  const formatSize = (value: number) => `${value} Kb`;

  return (
    <Modal
      actions={
        <>
          {pagesUrl ? (
            <a
              className="button-primary"
              href={pagesUrl}
              rel="noreferrer"
              tabIndex={0}
              target="_blank"
            >
              Website
            </a>
          ) : null}
          <a
            className="button-secondary"
            href={html_url}
            rel="noreferrer"
            tabIndex={0}
            target="_blank"
          >
            Source
          </a>
        </>
      }
      onClose={deselectRepo}
      title={name}
    >
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
        <TextLink label="Homepage" url={homepage}>
          {homepage?.replace('https://', '')}
        </TextLink>
        <Text label="Default Branch">{default_branch}</Text>
        <Text label="Created On">{formatDate(created_at)}</Text>
        <Text label="Last Updated">{formatDate(updated_at)}</Text>
        <Text label="Size">{formatSize(size)}</Text>
      </div>
    </Modal>
  );
}
