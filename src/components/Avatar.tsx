import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { currentData, isLoading } = useProfile();
  const avatarUrl = currentData?.avatar_url;

  const [lastShimmer, setLastShimmer] = useState<boolean>(false);
  const loaded = !isLoading && avatarUrl && lastShimmer;

  const unveil = useCallback(() => {
    setLastShimmer(true);
  }, []);

  return (
    <div className="avatar">
      <div className="circle-crop fancy-hover-effect">
        <div
          className="image"
          style={{
            backgroundImage: loaded ? `url(${avatarUrl})` : undefined,
          }}
        >
          <div
            className={classNames('avatar-shimmer', { loaded })}
            onAnimationIteration={
              !isLoading && !lastShimmer ? unveil : undefined
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
