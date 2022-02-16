import * as React from 'react';
import List from '@mui/material/List';
import { menu } from './items';
import { MenuItem } from "./MenuItem";

const SidebarMenu = () => {
    return (
        <List>
          {menu.map((item, key) => <MenuItem key={key} item={item} />)}
        </List>
    );
};

export default SidebarMenu;