import { Avatar } from '@/components/Avatar';
import { Text } from '@/components/Text';
import { TextLink } from '@/components/TextLink';
import { useProfile } from '@/hooks/useProfile';

import '@/components/profile.css';

export function Profile() {
  const { currentData } = useProfile();

  return (
    <div className="profile" data-testid="Profile">
      <Avatar />
      <div className="profile-contents">
        <div className="title">{currentData?.name}</div>
        <div className="details">
          <Text icon="location" label="Location">
            {currentData?.location}
          </Text>
          <Text icon="repo" label="Repos">
            {currentData?.public_repos?.toString()}
          </Text>
          <TextLink icon="link" label="Website" url={currentData?.blog}>
            {currentData?.blog?.replace('https://', '')}
          </TextLink>
        </div>
      </div>
    </div>
  );
}
