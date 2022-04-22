import { APP_NAME } from '../../settings';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Autocomplete, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataGrid from "./DataGrid";

const Journal = () => {
    const studentsWithMarks = [
        {
            id: 23,
            studentName: 'Иванов Иван',
            attendances: [
                {
                    date: '20.12.2021',
                    result: 'Н',
                },

                {
                    date: '31.12.2021',
                    result: 'Н',
                },
                {
                    date: '11.01.2022',
                    result: 'Н',
                },
                {
                    date: '12.01.2021',
                    result: 'Н',
                },
                {
                    date: '15.03.2021',
                    result: 'Н',
                },
                {
                    date: '16.03.2021',
                    result: 'Н',
                },
            ],
        },
        {
            id: 26,
            studentName: 'Иванов Сергей',
            attendances: [
                {
                    date: '20.12.2021',
                    result: 'Н',
                },
                {
                    date: '21.12.2021',
                    result: 'Н',
                },
                {
                    date: '31.12.2021',
                    result: 'Н',
                },
                {
                    date: '11.01.2022',
                    result: 'Н',
                },
                {
                    date: '12.01.2021',
                    result: 'Н',
                },
                {
                    date: '15.03.2021',
                    result: 'Н',
                },
                {
                    date: '16.03.2021',
                    result: 'Н',
                },
            ],
        },
        {
            id: 27,
            studentName: 'Сергеев Иван',
            attendances: [
                {
                    date: '20.12.2021',
                    result: 'Н',
                },
                {
                    date: '21.12.2021',
                    result: 'Н',
                },
                {
                    date: '31.12.2021',
                    result: 'Н',
                },
                {
                    date: '11.01.2022',
                    result: 'Н',
                },
                {
                    date: '12.01.2021',
                    result: 'Н',
                },
                {
                    date: '15.03.2021',
                    result: 'Н',
                },
                {
                    date: '16.03.2021',
                    result: 'Н',
                },
            ],
        },
        {
            id: 28,
            studentName: 'Сергеев Петр',
            attendances: [
                {
                    date: '20.12.2021',
                    result: 'Н',
                },
                {
                    date: '21.12.2021',
                    result: 'Н',
                },
                {
                    date: '31.12.2021',
                    result: 'Н',
                },
                {
                    date: '11.01.2022',
                    result: 'Н',
                },
                {
                    date: '12.01.2021',
                    result: 'Н',
                },
                {
                    date: '15.03.2021',
                    result: 'Н',
                },
                {
                    date: '16.03.2021',
                    result: 'Н',
                },
            ],
        },
    ];
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Журнал - {APP_NAME}</title>
            </Helmet>
            <Box
                component='main'
                sx={{
                    // backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                    m: 3,
                    minHeight: '100% !important',
                }}
            >
                <Toolbar />

                <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: 300, mb: 3 }}
                    renderInput={params => <TextField {...params} label='Группа' />}
                />


                <Paper style={{ height: '85%', width: '100%' }}>
                    <DataGrid/>
                </Paper>
            </Box>
        </>
    );
};


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
];

export default Journal;
