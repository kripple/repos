import { SvgIcon } from '@/components/SvgIcon';

import '@/components/sort-menu.css';

export function SortMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <ul className="sort-menu">
      <li className="sort-menu-item sort-menu-title">
        Select order{' '}
        <button className="close-sort-menu" onClick={closeMenu} tabIndex={0}>
          <SvgIcon icon="close" />
        </button>
      </li>
      <li className="sort-menu-item">Last updated</li>
      <li className="sort-menu-item">Name</li>
      <li className="sort-menu-item">Size</li>
      <li className="sort-menu-item">Deployed</li>
    </ul>
  );
}
