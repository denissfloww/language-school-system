import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import SidebarMenu from './SidebarMenu';
import AccountBox from './AccountBox';

const drawerWidth: number = 280;

const SidebarWrapper = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        padding: '10px',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
    },
    '& .MuiList-root': {
        '.MuiListItem-root': {
            borderRadius: '10px',
            '&.Mui-active, &:hover': {
                boxShadow: theme.sidebar.boxShadow,
                background: theme.sidebar.menuItemBgActive,
            },
            '&.Mui-selected': {
                boxShadow: theme.sidebar.boxShadow,
                color: theme.sidebar.menuItemColorActive,
                background: theme.sidebar.menuItemBgActive,
                '.MuiListItemIcon-root': {
                    color: theme.sidebar.menuItemIconColorActive,
                },
                '.MuiListItemText-primary': {
                    mr: 1,
                    color: 'textPrimary',
                    noWrap: true,
                },
            },
        },
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
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, marginLeft: '10px' }}>
                    Language School
                </Typography>
            </Toolbar>
            <AccountBox />
            <SidebarMenu />
        </SidebarWrapper>
    );
};

export default Sidebar;
