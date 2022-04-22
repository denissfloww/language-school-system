import DashboardPage from '../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CostGrid from './Grid';

const CostSettings = () => {
    return (
        <>
            <DashboardPage title='Управление тарифами'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление тарифами
                </Typography>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent='center'>
                        <CostGrid />
                    </Grid>
                </Container>
            </DashboardPage>
        </>
    );
};

export default CostSettings;
