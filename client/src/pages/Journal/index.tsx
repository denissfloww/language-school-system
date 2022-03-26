import { APP_NAME } from '../../settings';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import DataGrid from 'react-data-grid';
import Grid from '@mui/material/Grid';
import { Autocomplete, TextField } from '@mui/material';
import type { Column } from 'react-data-grid';

const list = [
    { id: 1, junkInfo: 'whatever' },
    { id: 2, junkInfo: 'whatever' },
    { id: 3, junkInfo: 'whatever' },
    { id: 4, junkInfo: 'whatever' },
    { id: 5, junkInfo: 'whatever' },
    { id: 6, junkInfo: 'last drop of horchata' },
    { id: 9823476, junkInfo: 'whatever' },
    { id: 32454, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
    { id: 345, junkInfo: 'whatever' },
];


interface Row {
    id: number;
    title: string;
    client: string;
    area: string;
    country: string;
    contact: string;
    assignee: string;
    progress: number;
    startTimestamp: number;
    endTimestamp: number;
    budget: number;
    transaction: string;
    account: string;
    version: string;
    available: boolean;
}

function getColumns(): readonly Column<Row>[] {
    return [
        {
            key: 'id',
            name: 'id',
            width: 60,
            locked: true,
            resizable: false,
        },
        {
            key: 'junkInfo',
            name: 'junkInfo',
            width: 60,
            locked: true,
            resizable: false,
        },
    ];
}

const Journal = () => {
    const columns = getColumns();

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
                <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: 300, mb: 3 }}
                    renderInput={params => <TextField {...params} label='Movie' />}
                />
                {/*<DataGrid*/}
                {/*    columns={columns}*/}
                {/*    minHeight={1000}*/}
                {/*    rowGetter={(i: number) => list[i]}*/}
                {/*    rowsCount={list.length}*/}
                {/*/>*/}
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
