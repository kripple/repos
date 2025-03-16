import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';

import { SvgIcon } from '@/components/SvgIcon';

export function DropdownMenuItem({
  label,
  selected,
  closeMenu,
  ...props
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  closeMenu: () => void;
}) {
  const onClick = useCallback(() => {
    props.onClick();
    closeMenu();
  }, []);

  return (
    <span>
      <Divider className="dropdown-menu-divider" />
      <MenuItem onClick={onClick}>
        <ListItemIcon className="dropdown-menu-icon">
          {selected ? <SvgIcon icon="check" /> : null}
        </ListItemIcon>
        <ListItemText className="dropdown-menu-item">{label}</ListItemText>
      </MenuItem>
    </span>
  );
}
