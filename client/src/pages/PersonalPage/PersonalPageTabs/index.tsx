import Tab from '@mui/material/Tab';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UserInfoForm from '../UserInfoForm';
import ChangePasswordForm from '../ChangePasswordForm';
import { Tabs, useTheme } from '@mui/material';
import StudentGroupInfoTable from '../StudentInfo/GroupInfoTable';
import TeacherGroupInfoTable from '../TeacherInfo/GroupInfoTable';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/reducers/auth/authReducer';
import { allRoles, RoleTypes } from '../../../interfaces/IRole';
import StudentAttendanceInfo from '../StudentInfo/AttendanceInfo';
import TabPanel from '../../../components/Tabs/TabPanel';
import GroupsIcon from '@mui/icons-material/Groups';
import TableChartIcon from '@mui/icons-material/TableChart';
import StudentReports from '../StudentInfo/Reports';
import StudentsService from '../../../services/StudentsService';
import { useEffect, useState } from 'react';
import { IStudent } from '../../../interfaces/IStudent';

const PersonalPageTabs = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { user } = useSelector(selectAuthState);

    const tabs = [
        {
            label: 'Группы',
            icon: <GroupsIcon />,
            roles: allRoles(),
            content: (
                <Grid container spacing={3}>
                    {user?.roles.some(role => role.name == RoleTypes.Teacher) ? (
                        <Grid item md={12}>
                            <TeacherGroupInfoTable />
                        </Grid>
                    ) : null}
                    {user?.roles.some(role => role.name == RoleTypes.Student) ? (
                        <>
                            <Grid item md={12}>
                                <StudentGroupInfoTable />
                            </Grid>
                        </>
                    ) : null}
                </Grid>
            ),
        },
        {
            label: 'Успеваемость',
            icon: <TableChartIcon />,
            roles: [RoleTypes.Student],
            content: <StudentReportTabComponent />,
        },
        {
            label: 'Настройки',
            icon: <SettingsIcon />,
            roles: allRoles(),
            content: (
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
            ),
        },
        {
            label: 'Изменить пароль',
            icon: <KeyIcon />,
            roles: allRoles(),
            content: (
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
            ),
        },
    ];
    function renderUserTabs() {
        return tabs.map(value => {
            return user?.roles.some(val => value.roles.includes(val.name)) ? (
                <Tab icon={value.icon} sx={{ textTransform: 'none', fontSize: '12pt' }} iconPosition='start' label={value.label} />
            ) : null;
        });
    }

    function renderTabPanels() {
        let index = 0;

        const newIndex = () => {
            index = index + 1;
        };

        return tabs.map(tab => {
            return user?.roles.some(val => tab.roles.includes(val.name)) ? (
                <TabPanel index={index} value={value}>
                    {tab.content}
                    {newIndex()}
                </TabPanel>
            ) : null;
        });
    }

    return (
        <>
            <Grid item md={12}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        {user ? renderUserTabs() : null}
                    </Tabs>
                </Box>
                {user ? renderTabPanels() : null}
            </Grid>
        </>
    );
};

const StudentReportTabComponent = () => {
    const theme = useTheme();
    const { user } = useSelector(selectAuthState);
    const [student, setStudent] = useState<IStudent>();
    useEffect(() => {
        StudentsService.getStudentByUserId(Number(user?.id)).then(s => {
            setStudent(s);
        });
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        height: '100%',
                        padding: 2,
                        overflow: 'auto',
                    }}
                >
                    <Grid item md={12}>
                        <StudentAttendanceInfo />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item md={12}>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        height: '100%',
                    }}
                >
                    <Grid item sx={{ mt: 3 }}>
                        {student ? <StudentReports studentId={student.id} /> : null}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PersonalPageTabs;
