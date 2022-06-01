import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Tabs, useTheme } from '@mui/material';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import UpdateUserForm from './Form';
import UpdatePasswordForm from './UpdatePasswordForm';
import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import TabPanel from '../../../components/Tabs/TabPanel';

const UpdateUserPage = () => {
    const { id } = useParams();
    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log(id);
    return (
        <>
            <DashboardPage title='Изменение пользователя'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Изменение пользователя
                </Typography>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        flexGrow: 1,
                        height: '100%',
                        padding: 4,
                        overflow: 'auto',
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab
                                icon={<AccountBoxIcon />}
                                sx={{ textTransform: 'none', fontSize: '12pt' }}
                                iconPosition='start'
                                label='Основные данные'
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
                        <UpdateUserForm />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <UpdatePasswordForm />
                    </TabPanel>
                </Paper>
            </DashboardPage>
        </>
    );
};

export default UpdateUserPage;
