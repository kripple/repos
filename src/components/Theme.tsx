import type { ReactNode } from 'react';

import '@/components/theme.css';

export function Theme({
  children,
  toggleId,
}: {
  children: ReactNode;
  toggleId: string;
}) {
  return (
    <>
      <input
        aria-hidden={true}
        id={toggleId}
        style={{ display: 'none' }}
        type="checkbox"
      />
      <div className="app theme">{children}</div>
    </>
  );
}
