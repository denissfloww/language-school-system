import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../../interfaces/IGroup';
import { AppThunk, RootState } from '../../store';
import GroupsService from '../../../services/GroupsService';
import StudentsService from '../../../services/StudentsService';
import { IPageDataResponse } from '../../../services/responses/types';
import TeachersService from '../../../services/TeacherService';
import { IAutoCompleteValues, IStudentAutoCompleteValue } from '../../../interfaces/displayed/type';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import { AxiosError } from 'axios';

interface InitialState {
    groupsData?: IPageDataResponse<IGroup>;
    studentsAutocompleteValues: IStudentAutoCompleteValue[];
    teachersValues: IAutoCompleteValues[];
    page: number;
    rowsPerPage: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    studentsAutocompleteValues: [],
    teachersValues: [],
    page: 0,
    rowsPerPage: 10,
    isLoading: false,
};

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<IPageDataResponse<IGroup>>) => {
            state.groupsData = action.payload;
        },
        setStudentsAutocompleteValues: (state, action: PayloadAction<IStudentAutoCompleteValue[]>) => {
            state.studentsAutocompleteValues = action.payload;
        },
        setTeacherAutocompleteValues: (state, action: PayloadAction<IAutoCompleteValues[]>) => {
            state.teachersValues = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
        },
        setGroupLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setGroups, setStudentsAutocompleteValues, setTeacherAutocompleteValues, setPage, setRowsPerPage, setGroupLoading } =
    groupsSlice.actions;

export const fetchGroups = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setGroupLoading(true));
            const groupsData = await GroupsService.getGroups(page + 1, rowPerPage);
            dispatch(setGroups(groupsData));
            if (groupsData.data.length == 0) {
                dispatch(setPage(0));
            }
            dispatch(setGroupLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const fetchFormData = (): AppThunk => {
    return async dispatch => {
        try {
            const students = await StudentsService.getStudents();
            const teachers = await TeachersService.getTeachers();

            const studentsAutoCompleteValues: IStudentAutoCompleteValue[] = students.map(student => {
                return { label: `${student.firstName} ${student.lastName}`, value: String(student.id) };
            });

            const teachersValues: IAutoCompleteValues[] = teachers.data.map(teacher => {
                return { label: `${teacher.lastName} ${teacher.middleName ?? ''} ${teacher.firstName}`, value: String(teacher.id) };
            });
            dispatch(setStudentsAutocompleteValues(studentsAutoCompleteValues));
            dispatch(setTeacherAutocompleteValues(teachersValues));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const createOrUpdateGroup = (values: any): AppThunk => {
    return async dispatch => {
        try {
            let message: string;

            if (values.id) {
                await GroupsService.updateGroup(values);
                message = 'Успешно обновлено!';
            } else {
                await GroupsService.createGroup(values);
                message = 'Успешно добавлено!';
            }

            toast.success(message, toastConfig);
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const deleteGroup = (id: number): AppThunk => {
    return async dispatch => {
        try {
            await GroupsService.deleteGroup(id);
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const selectGroupsState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
