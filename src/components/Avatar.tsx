import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { currentData } = useProfile();
  const avatarUrl = currentData?.avatar_url;

  return (
    <div className="avatar">
      <div className="circle-crop fancy-hover-effect">
        {avatarUrl ? (
          <div
            className="image"
            style={{ backgroundImage: `url(${avatarUrl})` }}
          ></div>
        ) : null}
      </div>
    </div>
  );
}
