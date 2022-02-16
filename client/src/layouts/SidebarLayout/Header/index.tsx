import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../helpers/helperFunc';

const drawerWidth: number = 296;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const HeaderWrapper = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0 4px 2px -2px ' + theme.palette.grey[300],
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)' ,
    marginRight: '15px',
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

    return (
        <HeaderWrapper color='transparent' position='absolute' open={true}>
            <Toolbar
            >
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
                <Avatar {...stringAvatar('Полина Балуева', 35)} />
            </Toolbar>
        </HeaderWrapper>
    );
}

export default Header;
