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
      {/*
  :is(html[data-theme='light'], #theme-toggle:checked ~ .theme) #sun {
    opacity: 0;
    transform: rotate(-360deg);
  }
  :is(html[data-theme='light'], #theme-toggle:checked ~ .theme) #moon {
    opacity: 1;
    transform: rotate(-360deg);
  } */}

      <input
        aria-hidden={true}
        id={toggleId}
        style={{ display: 'none' }}
        type="checkbox"
      />
      <div className="theme">{children}</div>
    </>
  );
}
