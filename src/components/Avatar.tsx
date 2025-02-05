import classNames from 'classnames';
import { useCallback, useState } from 'react';

import fallbackImage from '@/assets/avatar.png';
import { Image } from '@/components/Image';
import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { currentData, isLoading: profileIsLoading } = useProfile();
  const avatarUrl = currentData?.avatar_url;

  const [lastShimmer, setLastShimmer] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const unveil = useCallback(() => {
    setLastShimmer(true);
  }, []);

  return (
    <div
      className="avatar"
      data-loaded={!profileIsLoading}
      data-testid="Avatar"
    >
      <div className="circle-crop">
        <div className="image-frame">
          {avatarUrl ? (
            <Image
              alt="Avatar"
              className="image"
              fallback={fallbackImage}
              setIsLoading={setIsLoadingImage}
              src={avatarUrl}
            ></Image>
          ) : null}
          <div
            className={classNames('avatar-shimmer', {
              loaded: !isLoadingImage && lastShimmer,
            })}
            data-testid="AvatarShimmer"
            onAnimationIteration={
              !profileIsLoading && !lastShimmer ? unveil : undefined
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
