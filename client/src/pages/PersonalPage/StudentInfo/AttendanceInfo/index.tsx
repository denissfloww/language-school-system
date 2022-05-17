import * as React from 'react';
import { Typography, useTheme } from '@mui/material';
import { IStudentAttendance } from './types';
import moment from 'moment';
import { AttendanceEnumDisplay } from '../../../../interfaces/IAttendance';
import ReactDataGrid from 'react-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendanceDataAction, selectProfileState } from '../../../../redux/reducers/profile/profileReducer';

const StudentAttendanceInfo = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const testData: IStudentAttendance[] = [
        {
            groupId: 1,
            groupName: '345dfg',
            attendances: {
                studentId: '2',
                studentName: 'Тестовый Т',
                attendances: [
                    {
                        id: 5,
                        date: '2022-05-09T10:00:00.000Z',
                        result: 'goodAbsent',
                    },
                    {
                        id: 6,
                        date: '2022-05-11T10:00:00.000Z',
                        result: 'attended',
                    },
                    {
                        id: 7,
                        date: '2022-05-16T10:00:00.000Z',
                        result: 'attended',
                    },
                    {
                        id: 8,
                        date: '2022-05-18T10:00:00.000Z',
                        result: 'attended',
                    },
                    {
                        date: '2022-05-23T10:00:00.000Z',
                        result: '',
                    },
                    {
                        date: '2022-05-25T10:00:00.000Z',
                        result: '',
                    },
                    {
                        date: '2022-05-30T10:00:00.000Z',
                        result: '',
                    },
                    {
                        date: '2022-06-01T10:00:00.000Z',
                        result: '',
                    },
                    {
                        date: '2022-06-06T10:00:00.000Z',
                        result: '',
                    },
                    {
                        date: '2022-06-08T10:00:00.000Z',
                        result: '',
                    },
                ],
            },
        },
    ];
    useEffect(() => {
        dispatch(fetchStudentAttendanceDataAction());
    }, []);

    const { attendanceStudentData } = useSelector(selectProfileState);

    return (
        <>
            {attendanceStudentData.length ? (
                <>
                    <Typography variant='h6'>Успеваемость по группам</Typography>
                    {attendanceStudentData.map(studentAttendance => (
                        <>
                            <Paper sx={{ p: 2, mt: 2 }}>
                                <Typography variant='subtitle1'>
                                    Группа: <b>{studentAttendance.groupName}</b>
                                </Typography>
                                <StudentAttendanceDataGrid attendanceData={studentAttendance} />
                            </Paper>
                        </>
                    ))}
                </>
            ) : null}
        </>
    );
};

const StudentAttendanceDataGrid = (props: { attendanceData: IStudentAttendance }) => {
    const columns: any[] = [];
    const { attendanceData } = props;
    attendanceData.attendances.attendances.forEach(attendance => {
        columns.push({
            key: attendance.date,
            name: moment(attendance.date).format('DD.MM.YYYY'),
            width: 100,
        });
    });
    const row: any = {};
    attendanceData.attendances.attendances.forEach(att => {
        row[att.date] = AttendanceEnumDisplay[att.result];
    });
    const gridData: any[] = [];
    gridData.push(row);

    return (
        <>
            <ReactDataGrid
                columns={columns}
                enableCellSelect={true}
                rowGetter={i => gridData[i]}
                rowsCount={gridData.length}
                minHeight={100}
                minWidth={1025}
            />
        </>
    );
};

export default StudentAttendanceInfo;
