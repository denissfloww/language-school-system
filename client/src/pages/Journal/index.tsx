import { APP_NAME } from '../../settings';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import JournalDataGrid from './DataGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    fetchEventsAction,
    fetchJournalDataAction,
    selectJournalState,
    setSelectedGroupId,
} from '../../redux/reducers/journal/journalReducer';
import Button from '@mui/material/Button';
import { selectAuthState } from '../../redux/reducers/auth/authReducer';
import { RoleTypes } from '../../interfaces/IRole';
import { Link } from 'react-router-dom';

const Journal = () => {
    const dispatch = useDispatch();

    const { groups, isLoading } = useSelector(selectJournalState);
    const { user } = useSelector(selectAuthState);
    const handleGroupChange = (event: any, value: any) => {
        dispatch(setSelectedGroupId(+value.value));
        dispatch(fetchEventsAction(+value.value));
    };

    useEffect(() => {
        dispatch(fetchJournalDataAction());
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Журнал - {APP_NAME}</title>
            </Helmet>
            <Box
                component='main'
                sx={{
                    backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                    m: 3,
                    minHeight: '100% !important',
                }}
            >
                <Toolbar />
                {!isLoading ? (
                    <>
                        {groups.length ? (
                            <>
                                <Autocomplete
                                    disablePortal
                                    options={groups}
                                    onChange={handleGroupChange}
                                    defaultValue={groups[0]}
                                    sx={{ width: 300, mb: 3 }}
                                    renderInput={params => <TextField {...params} label='Группа' />}
                                />

                                <Paper style={{ height: '85%', width: '100%' }}>
                                    <JournalDataGrid />
                                </Paper>
                            </>
                        ) : (
                            <Grid container>
                                <Grid item container>
                                    <Typography variant='h6'>
                                        Отсутствуют группы. Для добавления новой группы перейдите в раздел управления группами или свяжитесь
                                        с администратором.
                                    </Typography>
                                </Grid>
                                {user?.roles.some(role => role.name == RoleTypes.Admin) ? (
                                    <Grid item container sx={{ mt: 2 }}>
                                        <Button variant='contained' component={Link} to='/dashboard/settings/groups'>
                                            Управление группами
                                        </Button>
                                    </Grid>
                                ) : null}
                            </Grid>
                        )}
                    </>
                ) : null}
            </Box>
        </>
    );
};

export default Journal;
