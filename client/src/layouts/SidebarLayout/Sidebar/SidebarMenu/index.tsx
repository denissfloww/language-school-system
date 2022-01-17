import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './listItems';
import * as React from 'react';

const SidebarMenu = () => {
    return (
        <>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
        </>
    );
};

export default SidebarMenu;
