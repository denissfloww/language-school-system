import Typography from '@mui/material/Typography';
import React from 'react';
import DashboardPage from '../../components/Pages/DashboardPage';
import Container from '@mui/material/Container';
import TestsGrid from './Grid';

const StudentTestsPage = () => {
    return (
        <>
            <DashboardPage title='Управление учениками'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление тестами
                </Typography>

                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <TestsGrid />
                </Container>
            </DashboardPage>
        </>
    );
};

export default StudentTestsPage;
