import { useProfile } from '@/hooks/useProfile';

import '@/components/avatar.css';

export function Avatar() {
  const { avatarUrl } = useProfile();

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

      {/* <div className="contents">
        <svg data-icon="frame" viewBox="0 0 24 24">
          <path d="m11.9991 0.00409829a11.9991 11.9991 0 0 0 -11.9991 11.9991 11.9991 11.9991 0 0 0 11.9991 11.9991 11.9991 11.9991 0 0 0 11.9991 -11.9991 11.9991 11.9991 0 0 0 -11.9991 -11.9991zm0 0.497583a11.4933 11.4933 0 0 1 11.4933 11.4933 11.4933 11.4933 0 0 1 -11.4933 11.4933 11.4933 11.4933 0 0 1 -11.4933 -11.4933 11.4933 11.4933 0 0 1 11.4933 -11.4933z"></path>
        </svg>
      </div> */}
    </div>
  );
}
