import DashboardPage from '../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LanguageGrid from './Grid';

const LanguageSettings = () => {
    return (
        <>
            <DashboardPage title='Управление языками'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление языками
                </Typography>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent='center'>
                        <LanguageGrid />
                    </Grid>
                </Container>
            </DashboardPage>
        </>
    );
};

export default LanguageSettings;
