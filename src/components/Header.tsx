import { SvgIcon } from '@/components/SvgIcon';

import '@/components/header.css';

export function Header({ id }: { id: string }) {
  return (
    <header className="header">
      <div className="contents">
        <label
          aria-hidden="true"
          className="theme-toggle-label"
          htmlFor={id}
          tabIndex={0}
        >
          <SvgIcon icon="sun" id="light-mode" />
          <SvgIcon icon="moon" id="dark-mode" />
        </label>
      </div>
    </header>
  );
}
