import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

interface IPageProps {
    title: string;
    children: React.ReactNode;
}

const DashboardPage = (props: IPageProps) => {
    const { title, children } = props;

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>
                    {title} - {APP_NAME}
                </title>
            </Helmet>
            <Container maxWidth='lg' sx={{ mt: 2, mb: 4 }}>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: theme => theme.palette.grey[100],
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Container>
        </>
    );
};

export default DashboardPage;
