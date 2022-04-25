import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../utils/helperFunc';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/reducers/auth/authReducer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon } from '@mui/material';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import LogoutButton from '../../../components/Buttons/LogoutButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";

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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    const { user } = useSelector(selectAuthState);
    const [child, setChild] = React.useState<null | HTMLElement>(null);
    const open = Boolean(child);
    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setChild(event.currentTarget);
    };
    const closeMenu = () => {
        setChild(null);
    };
    return (
        <HeaderWrapper color='transparent' position='absolute' open={true}>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
                <IconButton onClick={openMenu}>
                    <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`, 35)} />
                </IconButton>

                <Menu
                    anchorEl={child}
                    open={open}
                    onClose={closeMenu}
                    onClick={closeMenu}
                    PaperProps={{
                        sx: {
                            overflow: 'visible',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'white',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem style={{ pointerEvents: 'none' }}>
                        <b>{user?.firstName} {user?.lastName}</b>
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to='/dashboard/personal'>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize='small' />
                        </ListItemIcon>
                        Профиль
                    </MenuItem>
                    <Divider />
                    <LogoutButton parent={MenuItem}>
                        <ListItemIcon>
                            <Logout fontSize='small' />
                        </ListItemIcon>
                        Выйти
                    </LogoutButton>
                </Menu>
            </Toolbar>
        </HeaderWrapper>
    );
}

export default Header;
