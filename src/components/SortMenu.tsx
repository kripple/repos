import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import { SvgIcon } from '@/components/SvgIcon';
import type { SortKey } from '@/types/sorting';

import '@/components/sort-menu.css';

export function SortMenu({
  closeMenu,
  sortByName,
  sortByLastUpdated,
  sortKey,
}: {
  closeMenu: () => void;
  sortByName: () => void;
  sortByLastUpdated: () => void;
  sortKey: SortKey;
}) {
  return (
    <Paper className="mui-sort-menu" elevation={10}>
      <MenuList dense>
        <MenuItem onClick={closeMenu}>
          <ListItemText className="sort-menu-header sort-menu-item">
            <span>Select order</span>
            <span className="sort-menu-button">
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
          // { label: 'Size' },
          // { label: 'Deployed' },
        ].map((item) => {
          const selected = item.sortKey === sortKey;

          return (
            <span key={item.label}>
              <Divider className="sort-menu-divider" />
              <MenuItem onClick={item.sort}>
                <ListItemIcon className="sort-menu-icon">
                  {selected ? <SvgIcon icon="check" /> : null}
                </ListItemIcon>
                <ListItemText className="sort-menu-item">
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
