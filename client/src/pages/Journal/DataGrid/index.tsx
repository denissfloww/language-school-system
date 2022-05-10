import React, { useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalAttendanceAction, selectJournalState, setJournalData } from '../../../redux/reducers/journal/journalReducer';
import { AttendanceEnum, AttendanceType } from '../../../interfaces/IAttendance';
import _ from 'lodash';
import JournalService from '../../../services/JournalService';

const { DropDownEditor } = Editors;

const AttendanceTypeEditor = <DropDownEditor options={AttendanceType} />;

export default function JournalDataGrid() {
    const { events, groupAttendance, journalData, selectedGroupId } = useSelector(selectJournalState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchJournalAttendanceAction());
    }, [groupAttendance]);

    const columns = [];
    columns.push({
        key: 'studentId',
        name: '',
        width: 0,
        hidden: true,
    });

    columns.push({
        key: 'studentName',
        name: '',
        width: 100,
        frozen: true,
    });

    for (const event of events) {
        columns.push({
            key: event,
            name: moment(event).format('DD.MM.YYYY'),
            editor: AttendanceTypeEditor,
            width: 100,
            editable: true,
            editorOptions: {
                editOnClick: true,
            },
        });
    }

    const onGridRowsUpdated = async (props: any) => {
        console.log(props);
        const { fromRow, toRow, updated, fromRowData } = props;
        const data = journalData.slice();
        for (let i = fromRow; i <= toRow; i++) {
            data[i] = { ...data[i], ...updated };
        }
        dispatch(setJournalData(data));

        const studentId = +fromRowData.studentId;
        const eventDate = props.cellKey;
        const groupId = Number(selectedGroupId);
        const attendanceMark = AttendanceType.find(attendance => attendance.value === updated[props.cellKey])?.id;

        await JournalService.putAttendance(studentId, groupId, eventDate, attendanceMark ?? AttendanceEnum.None);
    };

    const debouncedGridRowsUpdateCb = _.debounce((props: any) => {
        onGridRowsUpdated(props);
    }, 300);

    return (
        <ReactDataGrid
            columns={columns}
            onGridRowsUpdated={debouncedGridRowsUpdateCb}
            enableCellSelect={true}
            rowGetter={i => journalData[i]}
            rowsCount={journalData.length}
            minHeight={900}
        />
    );
}
