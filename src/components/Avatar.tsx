import classNames from 'classnames';
import { useCallback, useState } from 'react';

import fallbackImage from '@/assets/avatar.png';
import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { currentData, isLoading } = useProfile();
  const avatarUrl = currentData?.avatar_url;
  const url = !isLoading && !avatarUrl ? fallbackImage : avatarUrl;

  const [lastShimmer, setLastShimmer] = useState<boolean>(false);
  const loaded = Boolean(!isLoading && url && lastShimmer);

  const backgroundImage = loaded ? `url(${url})` : undefined;

  const unveil = useCallback(() => {
    setLastShimmer(true);
  }, []);

  return (
    <div className="avatar" data-loaded={!isLoading} data-testid="Avatar">
      <div className="circle-crop fancy-hover-effect">
        <div className="image" style={{ backgroundImage }}>
          <div
            className={classNames('avatar-shimmer', { loaded })}
            data-testid="AvatarShimmer"
            onAnimationIteration={
              !isLoading && !lastShimmer ? unveil : undefined
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
