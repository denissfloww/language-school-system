import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import UserInfoForm from '../UserInfoForm';
import ChangePasswordForm from '../ChangePasswordForm';
import { Tabs, useTheme } from '@mui/material';
import StudentGroupInfoTable from '../StudentInfo/GroupInfoTable';
import TeacherGroupInfoTable from '../TeacherInfo/GroupInfoTable';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/reducers/auth/authReducer';
import { RoleTypes } from '../../../interfaces/IRole';

const PersonalPageTabs = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { user } = useSelector(selectAuthState);

    return (
        <>
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
                        {user?.roles.some(role => role.name == RoleTypes.Teacher) ? (
                            <Grid item md={12}>
                                <TeacherGroupInfoTable />
                            </Grid>
                        ) : null}
                        {user?.roles.some(role => role.name == RoleTypes.Student) ? (
                            <Grid item md={12}>
                                <StudentGroupInfoTable />
                            </Grid>
                        ) : null}
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
        </>
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

export default PersonalPageTabs;
