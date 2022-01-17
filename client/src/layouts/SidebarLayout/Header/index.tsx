import { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
//import { SidebarContext } from 'src/contexts/SidebarContext';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const HeaderWrapper = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function Header() {
    //const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

    return (
        <HeaderWrapper position='absolute' open={true}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge='start'
                    color='secondary'
                    aria-label='open drawer'
                    sx={{
                        marginRight: '36px',
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Photos
                </Typography>
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </HeaderWrapper>
    );
}

export default Header;
