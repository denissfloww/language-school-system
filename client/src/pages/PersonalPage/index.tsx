import DashboardPage from '../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../redux/reducers/auth/authReducer';
import { stringToColor } from '../../utils/helperFunc';
import { IRole, RoleTypesDisplay } from '../../interfaces/IRole';
import { Skeleton, Tabs, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserInfoForm from './UserInfoForm';
import KeyIcon from '@mui/icons-material/Key';
import ChangePasswordForm from './ChangePasswordForm';
import UserInfoHeader from './Components/UserInfoHeader';
import PersonalPageTabs from './PersonalPageTabs';

const PersonalPage = () => {
    const { user } = useSelector(selectAuthState);
    const theme = useTheme();

    return (
        <DashboardPage title='Профиль'>
            <Typography variant='h4' sx={{ mb: 6 }}>
                Ваш профиль
            </Typography>
            <Container maxWidth='lg' sx={{ mb: 4 }}>
                <Grid container spacing={3} justifyContent='center'>
                    <Box sx={{ width: '100%' }}>
                        {user ? (
                            <UserInfoHeader firstName={String(user.firstName)} lastName={String(user.lastName)} roles={user.roles} />
                        ) : (
                            <>
                                <Paper sx={{ width: '100%', mb: 2, height: '17vh', borderRadius: '10px' }}>
                                    <Skeleton variant='rectangular' sx={{ width: '100%', height: '100%' }} />
                                </Paper>
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <PersonalPageTabs />
                    </Grid>
                </Grid>
            </Container>
        </DashboardPage>
    );
};

export default PersonalPage;
