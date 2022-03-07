import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UsersGrid from './Grid';

const UserSettings = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Управление пользователями - {APP_NAME}</title>
            </Helmet>
            <Container maxWidth='lg' sx={{ mt: 10, mb: 4 }}>
                <Typography variant='h4'>Управление пользователями</Typography>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: theme => theme.palette.grey[100],
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth='lg' sx={{ mb: 4 }}>
                        <Grid container spacing={3} justifyContent='center'>
                            <UsersGrid />
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </>
    );
};

export default UserSettings;
