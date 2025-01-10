import { Avatar } from '@/components/Avatar';
import { SvgIcon } from '@/components/SvgIcon';
import { useProfile } from '@/hooks/useProfile';

import '@/components/profile.css';

export function Profile() {
  const { currentData, isLoading } = useProfile();
  const {
    blog: websiteUrl,
    name,
    location,
    public_repos: repos,
  } = currentData || {};

  return (
    <div className="profile">
      <Avatar />
      <div className="profile-contents">
        <div className="title">{name}</div>

        <div className="details">
          <div>
            <SvgIcon icon="location" />
            <span className="label">Location: </span>
            <span className="text">{location}</span>
          </div>

          <div>
            <SvgIcon icon="repo" />
            <span className="label">Repos: </span>
            <span className="text">{repos}</span>
            {/* <span className="text"></span> */}
          </div>

          <a href={websiteUrl} rel="noreferrer" tabIndex={0} target="_blank">
            <SvgIcon icon="link" />
            <span className="label">Website: </span>
            <span className="text">{websiteUrl?.replace('https://', '')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
