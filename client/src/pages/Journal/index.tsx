import { APP_NAME } from '../../settings';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Autocomplete, Rating, Select, TextField } from '@mui/material';
import {
    DataGrid,
    GridColumns,
    GridRowsProp,
    GridCellEditCommitParams,
    MuiEvent,
    GridRenderCellParams,
    useGridApiContext,
} from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode, useState } from 'react';
// import DataGrid from "./DataGrid";

const Journal = () => {
    const arrayOfDates = ['20.12.2021', '21.12.2021', '31.12.2021', '11.01.2022', '12.01.2021', '15.03.2021', '16.03.2021'];

    let columns: GridColumns = [];
    columns.push({ field: 'studentName', headerName: '', type: 'string', width: 120 });

    arrayOfDates.forEach(value => {
        columns.push({
            field: value,
            headerName: value,
            width: 100,
            editable: true,
            sortable: false,
            filterable: false,
            type: 'singleSelect',
            valueOptions: ['Н', 'П', 'Ну'],
        });
    });

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

    const rows: GridRowsProp = studentsWithMarks.map(studentData => {
        let marks: any = {};
        arrayOfDates.forEach(date => {
            const marksData = studentData.attendances.filter(data => data.date === date);
            marksData.forEach(mark => {
                marks[date] = mark?.result;
            });
        });

        return {
            id: studentData.id,
            studentName: studentData.studentName,
            ...marks,
        };
    });

    console.log(rows);

    // const rows: GridRowsProp = [
    //     {
    //         id: 1,
    //         studentName: 'Иванов Иван',
    //         '20.10': 'Н',
    //         '24.10': 'П',
    //     },
    //     {
    //         id: 2,
    //         studentName: 'Иванов Сергей',
    //         '20.10': 'П',
    //         '24.10': 'Ну',
    //     },
    //     {
    //         id: 3,
    //         studentName: 'Сергеев Иван',
    //         '20.10': 'П',
    //         '24.10': 'Ну',
    //     },
    //     {
    //         id: 4,
    //         studentName: 'Сергеев Петр',
    //         '20.10': 'П',
    //         '24.10': 'Ну',
    //     },
    // ];

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

                {/*<DataGrid/>*/}
                <Paper style={{ height: '85%', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        onCellEditCommit={(params: any, event: MuiEvent) => {
                            console.log(params, event);
                        }}
                        pageSize={50}
                        rowsPerPageOptions={[5]}
                    />
                </Paper>
            </Box>
        </>
    );
};

// function renderRating(params: GridRenderCellParams<number>) {
//     return (
//         <Select
//             inputProps={{ readOnly: true }}
//             value={params.value}
//             fullWidth={true}
//             style={{ width: '100%', border: 'none !important', outline: 'none !important' }}
//         >
//             <MenuItem value={'10'}>Ten</MenuItem>
//             <MenuItem value={'20'}>Twenty</MenuItem>
//             <MenuItem value={'30'}>Thirty</MenuItem>
//         </Select>
//     );
// }

// function renderRatingEditInputCell(params: any) {
//     return <RatingEditInputCell {...params} />;
// }

// function RatingEditInputCell(props: GridRenderCellParams<string>) {
//     const { id, value, field } = props;
//     const apiRef = useGridApiContext();
//     const [open, setOpen] = useState(true);
//     const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
//         apiRef.current.setEditCellValue({ id, field, value: event.target.value });
//         setOpen(false);
//         // @ts-ignore
//         const input = event.target.querySelector<HTMLInputElement>(`input[value="${value}"]`);
//         input?.blur();
//     };
//
//     const handleRef = (element: any) => {
//         if (element) {
//             // @ts-ignore
//             const input = element.querySelector<HTMLInputElement>(`input[value="${value}"]`);
//             input?.focus();
//         }
//     };
//
//     return (
//         <>
//             {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
//             <Select
//               autoFocus={true}
//                 open={open}
//                 value={value}
//                 onChange={handleChange}
//                 displayEmpty
//                 fullWidth={true}
//                 style={{ width: '100%', border: 'none !important', outline: 'none !important' }}
//             >
//                 <MenuItem value={'10'}>Ten</MenuItem>
//                 <MenuItem value={'20'}>Twenty</MenuItem>
//                 <MenuItem value={'30'}>Thirty</MenuItem>
//             </Select>
//         </>
//     );
// }

// const rows: GridRowsProp = [
//     {
//         id: 1,
//         studentName: 'Иванов Иван',
//         '20.10': 'Н',
//         '24.10': 'П',
//     },
//     {
//         id: 2,
//         studentName: 'Иванов Сергей',
//         '20.10': 'П',
//         '24.10': 'Ну',
//     },
//     {
//         id: 3,
//         studentName: 'Сергеев Иван',
//         '20.10': 'П',
//         '24.10': 'Ну',
//     },
//     {
//         id: 4,
//         studentName: 'Сергеев Петр',
//         '20.10': 'П',
//         '24.10': 'Ну',
//     },
// ];

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
