import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';

import '@/components/header.css';

export function Header({ id }: { id: string }) {
  const onKeyDown = useOnKeyDown();

  return (
    <header className="header">
      <div className="contents">
        <label
          aria-label="theme toggle"
          className="theme-toggle-label"
          htmlFor={id}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          <SvgIcon icon="sun" id="light-mode" />
          <SvgIcon icon="moon" id="dark-mode" />
        </label>
      </div>
    </header>
  );
}
