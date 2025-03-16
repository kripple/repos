import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { DropdownMenuItem } from '@/components/DropdownMenuItem';
import { SvgIcon } from '@/components/SvgIcon';

import '@/components/dropdown-menu.css';

export function DropdownMenu({
  anchor,
  closeMenu,
  menuLabel,
  menuItems,
}: {
  anchor: HTMLDivElement;
  closeMenu: () => void;
  menuLabel: string;
  menuItems: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }[];
}) {
  return (
    <Menu
      anchorEl={anchor}
      className="dropdown-menu"
      elevation={10}
      keepMounted={true}
      onClose={closeMenu}
      open={true}
    >
      <MenuList dense>
        <MenuItem onClick={closeMenu}>
          <ListItemText className="dropdown-menu-header dropdown-menu-item">
            <span>{menuLabel}</span>
            <span className="dropdown-menu-button">
              <SvgIcon icon="close" />
            </span>
          </ListItemText>
        </MenuItem>

        {menuItems.map((item) => (
          <DropdownMenuItem {...item} closeMenu={closeMenu} key={item.label} />
        ))}
      </MenuList>
    </Menu>
  );
}
