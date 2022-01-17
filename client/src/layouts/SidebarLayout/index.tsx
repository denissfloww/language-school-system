import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
    children?: ReactNode;
}

const MainWrapper = styled(Box)(
    ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;            
`,
);

const MainContent = styled(Box)(
    ({ theme }) => `       
        flex: 1 1 auto;
        overflow: auto;
`,
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
    return (
        <>
            <Header />
            <Sidebar />
            {/*<Test/>*/}
            <Outlet />
        </>
    );
};

export default SidebarLayout;
