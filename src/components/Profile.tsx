import { Avatar } from '@/components/Avatar';
import { Text } from '@/components/Text';
import { TextLink } from '@/components/TextLink';
import { useProfile } from '@/hooks/useProfile';

import '@/components/profile.css';

export function Profile() {
  const {
    currentData,
    // isLoading
  } = useProfile();
  const {
    blog: websiteUrl,
    name,
    location,
    public_repos: repos,
  } = currentData || {};

  return (
    <div className="profile" data-testid="Profile">
      <Avatar />
      <div className="profile-contents">
        <div className="title">{name}</div>
        <div className="details">
          <Text icon="location" label="Location">
            {location}
          </Text>
          <Text icon="repo" label="Repos">
            {repos?.toString()}
          </Text>
          <TextLink icon="link" label="Website" url={websiteUrl}>
            {websiteUrl?.replace('https://', '')}
          </TextLink>
        </div>
      </div>
    </div>
  );
}
