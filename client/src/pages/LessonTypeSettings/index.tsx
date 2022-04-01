import * as React from 'react';
import Container from '@mui/material/Container';
import DashboardPage from '../../components/Pages/DashboardPage';
import Grid from '@mui/material/Grid';
import LessonTypeGrid from './Grid';
import Typography from '@mui/material/Typography';

const LessonTypeSettings = () => {
    return (
        <>
            <DashboardPage title='Управление типами занятий'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление типами занятий
                </Typography>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent='center'>
                        <LessonTypeGrid />
                    </Grid>
                </Container>
            </DashboardPage>
        </>
    );
};

export default LessonTypeSettings;
