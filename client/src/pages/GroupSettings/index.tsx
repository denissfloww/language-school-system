import { Helmet } from 'react-helmet';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { APP_NAME } from '../../settings';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import GroupGrid from './Grid';
import { selectGlobalState } from '../../redux/reducers/global/globalReducer';

const GroupSettings = () => {
    const { isLoading } = useSelector(selectGlobalState);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Управление группами - {APP_NAME}</title>
            </Helmet>

            <Container maxWidth='lg' sx={{ mt: 10, mb: 4 }}>
                <Typography variant='h4'>Управление группами</Typography>
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
                            <GroupGrid />
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </>
    );
};

export default GroupSettings;
