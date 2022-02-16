import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
    children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <Box
                component='main'
                sx={{
                    backgroundColor: theme => (theme.palette.grey[100]),
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default SidebarLayout;
