/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';

import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { currentData, isLoading } = useProfile();
  const avatarUrl = currentData?.avatar_url;

  const [lastShimmer, setLastShimmer] = useState<boolean>(false);
  const loaded = !isLoading && avatarUrl && lastShimmer;

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
            className={`avatar-shimmer${loaded ? ' loaded' : ''}`}
            onAnimationIteration={
              !lastShimmer
                ? () => {
                    if (!isLoading) {
                      setLastShimmer(true);
                    }
                  }
                : undefined
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
