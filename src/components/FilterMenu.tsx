import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import { SvgIcon } from '@/components/SvgIcon';
import type { SortKey } from '@/types/sort';

export function FilterMenu({
  closeMenu,
  sortByName,
  sortByLastUpdated,
  sortBySize,
  sortKey,
}: {
  closeMenu: () => void;
  sortByName: () => void;
  sortByLastUpdated: () => void;
  sortBySize: () => void;
  sortKey: SortKey;
}) {
  return (
    <Paper className="dropdown-menu" elevation={10}>
      <MenuList dense>
        <MenuItem onClick={closeMenu}>
          <ListItemText className="dropdown-menu-header dropdown-menu-item">
            <span>Select order</span>
            <span className="dropdown-menu-button">
              <SvgIcon icon="close" />
            </span>
          </ListItemText>
        </MenuItem>

        {[
          {
            label: 'Last updated',
            sortKey: 'updated_at',
            sort: sortByLastUpdated,
          },
          { label: 'Name', sortKey: 'name', sort: sortByName },
          { label: 'Size', sortKey: 'size', sort: sortBySize },
        ].map((item) => {
          const selected = item.sortKey === sortKey;

          return (
            <span key={item.label}>
              <Divider className="dropdown-menu-divider" />
              <MenuItem onClick={item.sort}>
                <ListItemIcon className="dropdown-menu-icon">
                  {selected ? <SvgIcon icon="check" /> : null}
                </ListItemIcon>
                <ListItemText className="dropdown-menu-item">
                  {item.label}
                </ListItemText>
              </MenuItem>
            </span>
          );
        })}
      </MenuList>
    </Paper>
  );
}
