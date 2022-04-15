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

const PersonalPage = () => {
    const { user } = useSelector(selectAuthState);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab
                                    icon={<AccountBoxIcon />}
                                    sx={{ textTransform: 'none', fontSize: '12pt' }}
                                    iconPosition='start'
                                    label='Информация'
                                />
                                <Tab
                                    icon={<SettingsIcon />}
                                    sx={{ textTransform: 'none', fontSize: '12pt' }}
                                    iconPosition='start'
                                    label='Настройки'
                                />
                                <Tab
                                    icon={<KeyIcon />}
                                    sx={{ textTransform: 'none', fontSize: '12pt' }}
                                    iconPosition='start'
                                    label='Изменить пароль'
                                />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <Typography variant='h6'>Группы (ученик)</Typography>
                                    <TableContainer component={Paper}>
                                        <Table aria-label='simple table'>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <b>Код</b>
                                                    </TableCell>
                                                    <TableCell>
                                                        <b>Название</b>
                                                    </TableCell>
                                                    <TableCell>
                                                        <b>Учитель</b>
                                                    </TableCell>
                                                    <TableCell>
                                                        <b>Сумма к оплате на май</b>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>1</TableCell>
                                                    <TableCell>Англ яз</TableCell>
                                                    <TableCell>Иван Сергеевич Иванов</TableCell>
                                                    <TableCell>5000Р</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <Paper
                                        sx={{
                                            backgroundColor: theme.palette.background.paper,
                                            flexGrow: 1,
                                            height: '100%',
                                            padding: 4,
                                            overflow: 'auto',
                                        }}
                                    >
                                        <UserInfoForm />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <Paper
                                        sx={{
                                            backgroundColor: theme.palette.background.paper,
                                            flexGrow: 1,
                                            height: '100%',
                                            padding: 4,
                                            overflow: 'auto',
                                        }}
                                    >
                                        <ChangePasswordForm />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Container>
        </DashboardPage>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default PersonalPage;
