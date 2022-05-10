import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import ScheduleService from '../../../services/ScheduleService';
import GroupsService from '../../../services/GroupsService';
import { IAutoCompleteValues } from '../../../interfaces/displayed/type';
import JournalService from '../../../services/JournalService';
import { AttendanceEnum, AttendanceEnumDisplay, IAttendance } from '../../../interfaces/IAttendance';

interface InitialState {
    isLoading: boolean;
    isDataGridLoading: boolean;
    events: string[];
    groups: IAutoCompleteValues[];
    selectedGroupId?: number;
    groupAttendance: IAttendance[];
    journalData: any[];
}

const initialState: InitialState = {
    isLoading: false,
    isDataGridLoading: false,
    events: [],
    groups: [],
    groupAttendance: [],
    journalData: [],
};

const journalReducer = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<string[]>) => {
            state.events = action.payload;
        },
        setJournalLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setDataGridLoading: (state, action: PayloadAction<boolean>) => {
            state.isDataGridLoading = action.payload;
        },
        setGroups: (state, action: PayloadAction<IAutoCompleteValues[]>) => {
            state.groups = action.payload;
        },
        setSelectedGroupId: (state, action: PayloadAction<number>) => {
            state.selectedGroupId = action.payload;
        },
        setAttendance: (state, action: PayloadAction<IAttendance[]>) => {
            state.groupAttendance = action.payload;
        },
        setJournalData: (state, action: PayloadAction<any>) => {
            state.journalData = action.payload;
        },
    },
});

export const { setEvents, setJournalLoading, setGroups, setSelectedGroupId, setDataGridLoading, setAttendance, setJournalData } =
    journalReducer.actions;

export const fetchEventsAction = (groupId: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setDataGridLoading(true));

            const events = await ScheduleService.getGroupEvents(groupId);
            dispatch(setEvents(events));

            dispatch(setDataGridLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const fetchJournalAttendanceAction = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { groupAttendance } = getState().journal;

            const data = groupAttendance.map(attendance => {
                const row: any = {
                    studentId: attendance.studentId,
                    studentName: attendance.studentName,
                };
                attendance.attendances.forEach(att => {
                    row[att.date] = AttendanceEnumDisplay[att.result];
                });
                return row;
            });

            dispatch(setJournalData(data));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const fetchGroupAttendanceAction = (groupId: number): AppThunk => {
    return async dispatch => {
        try {
            const attendance = await JournalService.getGroupAttendance(groupId);
            dispatch(setAttendance(attendance));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const fetchJournalDataAction = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setJournalLoading(true));
            const { user } = getState().auth;
            const groups = await GroupsService.getUserGroups(Number(user?.id));

            if (groups.length) {
                const groupsValues: IAutoCompleteValues[] = groups.map(group => {
                    return { label: group.name, value: String(group.id) };
                });
                dispatch(fetchEventsAction(groups[0].id));
                dispatch(fetchGroupAttendanceAction(groups[0].id));
                dispatch(setSelectedGroupId(groups[0].id));
                dispatch(setGroups(groupsValues));
            } else {
                dispatch(setGroups([]));
            }

            dispatch(setJournalLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const selectJournalState = (state: RootState) => state.journal;

export default journalReducer.reducer;
