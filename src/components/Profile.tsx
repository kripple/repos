import { Avatar } from '@/components/Avatar';
import { SvgIcon } from '@/components/SvgIcon';
import { useProfile } from '@/hooks/useProfile';

import '@/components/profile.css';

export function Profile() {
  const { websiteUrl, name, username, location, repos } = useProfile();

  return (
    <div className="profile">
      <Avatar />
      <div className="contents">
        <div className="title">{name}</div>

        <div className="details">
          <div>
            <SvgIcon icon="octocat" />
            <span className="label">Username: </span>
            {username}
          </div>

          <div>
            <SvgIcon icon="location" />
            <span className="label">Location: </span>
            {location}
          </div>

          <div>
            <SvgIcon icon="repo" />
            <span className="label">Repos: </span>
            {repos}
          </div>

          <a href={websiteUrl} rel="noreferrer" tabIndex={0} target="_blank">
            <SvgIcon icon="link" />
            <span className="label">Website: </span>
            {websiteUrl.replace('https://', '')}
          </a>
        </div>
      </div>
    </div>
  );
}
