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
import LanguageService from '../../../services/LanguageService';

interface InitialState {
    groupsData?: IPageDataResponse<IGroup>;
    studentsAutocompleteValues: IStudentAutoCompleteValue[];
    teachersValues: IAutoCompleteValues[];
    languagesValues: IAutoCompleteValues[];
    page: number;
    rowsPerPage: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    studentsAutocompleteValues: [],
    teachersValues: [],
    languagesValues: [],
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
        setLanguagesAutocompleteValues: (state, action: PayloadAction<IAutoCompleteValues[]>) => {
            state.languagesValues = action.payload;
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

export const {
    setGroups,
    setStudentsAutocompleteValues,
    setTeacherAutocompleteValues,
    setPage,
    setRowsPerPage,
    setGroupLoading,
    setLanguagesAutocompleteValues,
} = groupsSlice.actions;

export const fetchGroupsAction = (page: number, rowPerPage: number): AppThunk => {
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

export const fetchFormDataAction = (): AppThunk => {
    return async dispatch => {
        try {
            const students = await StudentsService.getStudents();
            const teachers = await TeachersService.getTeachers();
            const languages = await LanguageService.getLanguages();

            const studentsAutoCompleteValues: IStudentAutoCompleteValue[] = students.map(student => {
                return { label: `${student.firstName} ${student.lastName}`, value: String(student.id) };
            });

            const teachersValues: IAutoCompleteValues[] = teachers.data.map(teacher => {
                return { label: `${teacher.lastName} ${teacher.middleName ?? ''} ${teacher.firstName}`, value: String(teacher.id) };
            });

            const languagesValues: IAutoCompleteValues[] = languages.data.map(language => {
                return { label: language.name, value: String(language.id) };
            });

            dispatch(setStudentsAutocompleteValues(studentsAutoCompleteValues));
            dispatch(setTeacherAutocompleteValues(teachersValues));
            dispatch(setLanguagesAutocompleteValues(languagesValues));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const createOrUpdateGroupAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            if (values.id) {
                await GroupsService.updateGroup(values);
            } else {
                await GroupsService.createGroup(values);
            }
            const { page, rowsPerPage } = getState().groups;
            dispatch(fetchGroupsAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const deleteGroupAction = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await GroupsService.deleteGroup(id);
            const { page, rowsPerPage } = getState().groups;
            dispatch(fetchGroupsAction(page, rowsPerPage));
            toast.success('Запись успешно удалена', toastConfig);
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
