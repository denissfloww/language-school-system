import Typography from '@mui/material/Typography';
import * as React from 'react';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FeedsGrid from './Grid';

const FeedsPage = () => {

    return (
        <>
            <DashboardPage title='Объявления'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Объявления
                </Typography>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent='center'>
                        <FeedsGrid />
                    </Grid>
                </Container>
            </DashboardPage>
        </>
    );
};

export default FeedsPage;
