import { SvgIcon } from '@/components/SvgIcon';
import { useProfile } from '@/hooks/useProfile';

import '@/components/card.css';

export function Card() {
  const { avatarUrl, githubUrl, websiteUrl, refetch, ...profile } =
    useProfile();

  return (
    <div className="card">
      <div className="details">
        <img
          className="avatar"
          src={avatarUrl}
          style={{
            
            height: '45px',
            padding: 0,
          }}
        />
        {/* <div >
          <div className="test"></div>
          <span className="label">Avatar: </span>
          <div className="group">
            <svg
              className="frame"
              height={100}
              viewBox="0 0 100 100"
              width={100}
            >
              <circle cx="50" cy="50" fill="none" r="50" />
            </svg>
            <img className="avatar" src={avatarUrl} />
          </div>
        </div> */}

        <div>
          <span className="label">Name: </span>
          {profile.name}
        </div>

        <div>
          <span className="label">Username: </span>
          {profile.username}
        </div>

        <div>
          <SvgIcon icon="location" />
          <span className="label">Location: </span>
          {profile.location}
        </div>

        <div>
          <SvgIcon icon="octocat" />
          <span className="label">Repos: </span>
          {profile.repos}
        </div>

        <a href={websiteUrl} rel="noreferrer" tabIndex={0} target="_blank">
          <SvgIcon icon="link" />
          <span className="label">Website: </span>
          {websiteUrl.replace('https://', '')}
        </a>

        <a
          className="label"
          href={githubUrl}
          rel="noreferrer"
          style={{
            justifyContent: 'center',
          }}
          tabIndex={0}
          target="_blank"
        >
          View on Github
        </a>
      </div>
    </div>
  );
}
