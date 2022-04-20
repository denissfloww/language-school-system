import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DashboardPage from '../../components/Pages/DashboardPage';
import StudentsGrid from './Grid';

const StudentsSettings = () => {
    return (
        <>
            <DashboardPage title='Управление учениками'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление учениками
                </Typography>

                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent='center'>
                        <StudentsGrid />
                    </Grid>
                </Container>
            </DashboardPage>
        </>
    );
};

export default StudentsSettings;
