import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DashboardPage from '../../components/Pages/DashboardPage';
import * as React from 'react';
import ReportsGrid from './Grid';

const ReportSettingsPage = () => {
    return (
        <DashboardPage title='Управление отчётами'>
            <Typography variant='h4' sx={{ mb: 6 }}>
                Управление отчётами
            </Typography>
            <Container maxWidth='lg' sx={{ mb: 4 }}>
                <ReportsGrid />
            </Container>
        </DashboardPage>
    );
};

export default ReportSettingsPage;
