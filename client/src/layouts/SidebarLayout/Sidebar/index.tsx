import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './SidebarMenu/listItems';
import * as React from 'react';

const drawerWidth: number = 240;

const SidebarWrapper = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
        background: theme.palette.primary,
    },
}));

const Sidebar = () => {
    return (
        <SidebarWrapper variant='permanent' open={true}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
        </SidebarWrapper>
    );
};

export default Sidebar;
