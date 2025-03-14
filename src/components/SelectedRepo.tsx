import type { Repo as RepoType } from '@/api/types';
import { SvgIcon } from '@/components/SvgIcon';
import { Text } from '@/components/Text';
import { TextLink } from '@/components/TextLink';
import { useLanguages } from '@/hooks/useLanguages';
import { formatDateTime } from '@/utils/format';

export function SelectedRepo({
  children,
  data,
  pagesUrl,
  deselectRepo,
}: {
  children: ReactNode;
  data: RepoType;
  pagesUrl?: string;
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
    default_branch,
  } = data;
  const { currentData } = useLanguages(name);
  const languages = currentData ? Object.keys(currentData) : undefined;

  return (
    <>
      {children}
      <div className="repo-details">
        <Text label="Description">{description}</Text>
        <Text
          label={languages && languages.length > 1 ? 'Languages' : 'Language'}
        >
          {languages ? languages.join(', ') : language}
        </Text>
        {/* <TextLink label="License" url={license?.url}>
          {license?.name}
        </TextLink> */}
        <Text label="License">{license?.name}</Text>
        <TextLink label="GitHub Pages URL" url={pagesUrl}>
          {pagesUrl?.replace('https://', '')}
        </TextLink>
        <TextLink label="URL" url={homepage}>
          {homepage?.replace('https://', '')}
        </TextLink>
        <Text label="Default Branch">{default_branch}</Text>
        <Text label="Created On">{formatDateTime(created_at)}</Text>
        <Text label="Last Updated">{formatDateTime(updated_at)}</Text>
        <TextLink icon="octocat" url={html_url}>
          View on Github
        </TextLink>
      </div>
      <button
        className="close-button"
        data-testid="CloseButton"
        onClick={deselectRepo}
        tabIndex={-1}
      >
        <SvgIcon icon="close" />
      </button>
    </>
  );
}
