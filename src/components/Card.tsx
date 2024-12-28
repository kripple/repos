import { useProfile } from '@/hooks/useProfile';

import '@/components/card.css';

export function Card() {
  const { avatarUrl, githubUrl, websiteUrl, refetch, ...profile } =
    useProfile();

  return (
    <div className="card">
      <img className="avatar" src={avatarUrl} />

      <div className="details">
        {Object.entries(profile).map(([label, value]) => (
          <div key={label}>
            <span className="label">{label}: </span>
            {value}
          </div>
        ))}

        <div>
          <span className="label">Website: </span>
          <a
            className="button"
            href={websiteUrl}
            rel="noreferrer"
            tabIndex={0}
            target="_blank"
          >
            {websiteUrl.replace('https://', '')}
          </a>
        </div>

        <div>
          <a
            className="button"
            href={githubUrl}
            rel="noreferrer"
            tabIndex={0}
            target="_blank"
          >
            View on Github
          </a>
        </div>
      </div>
    </div>
  );
}
