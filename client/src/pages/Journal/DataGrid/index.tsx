import React, { useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectJournalState, setJournalData } from '../../../redux/reducers/journal/journalReducer';
import { AttendanceEnum, AttendanceEnumDisplay } from "../../../interfaces/IAttendance";
const { DropDownEditor } = Editors;

const AttendanceType = [
    { id: AttendanceEnum.Attended, title: 'П', value: 'П', text: 'П' },
    { id: AttendanceEnum.Absent, title: 'Н', value: 'Н', text: 'Н' },
    { id: AttendanceEnum.GoodAbsent, title: 'Ну', value: 'Ну', text: 'Ну' },
];

const AttendanceTypeEditor = <DropDownEditor options={AttendanceType} />;

export default function JournalDataGrid() {
    const { events, groupAttendance, journalData } = useSelector(selectJournalState);
    const dispatch = useDispatch();
    useEffect(() => {
        const data = groupAttendance.map(attendance => {
            const row: any = {
                names: attendance.studentName,
            };
            attendance.attendances.forEach(att => {
                row[att.date] = AttendanceEnumDisplay[att.result];
            });
            return row;
        });

        dispatch(setJournalData(data));
    }, [groupAttendance]);

    const columns = [];
    columns.push({
        key: 'names',
        name: '',
        width: 100,
        frozen: true,
    });

    for (const event of events) {
        columns.push({
            key: event,
            name: moment(event).format('DD.MM.YYYY'),
            editor: AttendanceTypeEditor,
            // editor: DropdownCustomEditor,
            width: 100,
            editable: true,
            editorOptions: {
                editOnClick: true,
            },
        });
    }

    const onGridRowsUpdated = (props: any) => {
        console.log(props)
        const { fromRow, toRow, updated } = props;
        const data = journalData.slice();
        for (let i = fromRow; i <= toRow; i++) {
            data[i] = { ...data[i], ...updated };
        }
        dispatch(setJournalData(data));
    };

    return (
        <ReactDataGrid
            columns={columns}
            onGridRowsUpdated={onGridRowsUpdated}
            enableCellSelect={true}
            rowGetter={i => journalData[i]}
            rowsCount={journalData.length}
            minHeight={900}
        />
    );
}
