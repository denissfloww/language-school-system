import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { SchedulerComponent } from './SchedulerComponent';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchScheduleGroups, fetchScheduleLessonTypes, selectScheduleState } from '../../redux/reducers/schedule/scheduleReducer';
import { selectAuthState } from '../../redux/reducers/auth/authReducer';
import { RoleTypes } from '../../interfaces/IRole';

const Schedule = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchScheduleLessonTypes());
        dispatch(fetchScheduleGroups());
    }, []);

    const { user } = useSelector(selectAuthState);
    const { lessonTypes, groups } = useSelector(selectScheduleState);

    const isCanEdit = !user?.roles?.some(role => role.name == RoleTypes.Student);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Расписание - {APP_NAME}</title>
            </Helmet>
            <Box
                component='main'
                sx={{
                    backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Toolbar />

                <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ margin: '15px' }}>
                        <SchedulerComponent lessonTypes={lessonTypes} groups={groups} isCanEdit={isCanEdit} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Schedule;
