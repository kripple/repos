import { useCallback, useRef, useState } from 'react';

import { DropdownMenu } from '@/components/DropdownMenu';
import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';

import '@/components/dropdown-button.css';

export function DropdownButton({
  label,
  menuLabel,
  menuItems,
}: {
  label: string;
  menuLabel: string;
  menuItems: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = useOnKeyDown();
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);

  const showMenu = useCallback(() => setShowDropdownMenu(true), []);
  const hideMenu = useCallback(() => setShowDropdownMenu(false), []);

  const selected = menuItems.find((item) => item.selected)?.label;

  return (
    <div className="dropdown-button-container" ref={ref}>
      <button
        className="dropdown-button"
        onClick={showMenu}
        onKeyDown={onKeyDown}
      >
        {label} by <span className="selected-input">{selected}</span>
        <SvgIcon icon="edit" />
      </button>
      {showDropdownMenu && ref.current !== null ? (
        <DropdownMenu
          anchor={ref.current}
          closeMenu={hideMenu}
          menuItems={menuItems}
          menuLabel={menuLabel}
        />
      ) : null}
    </div>
  );
}
