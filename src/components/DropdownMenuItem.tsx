/* eslint-disable react/jsx-no-bind */
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
// import Paper from '@mui/material/Paper';

import { useCallback, useState } from 'react';

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
