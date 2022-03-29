import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../../interfaces/IGroup';
import { AppThunk, RootState } from '../../store';
import GroupsService from '../../../services/GroupsService';
import StudentsService from '../../../services/StudentsService';
import {IAutoCompleteValues, IStudentAutoCompleteValue} from './types';
import { setLoading } from '../global/globalReducer';
import { IPageDataResponse } from '../../../services/responses/types';
import TeachersService from "../../../services/TeacherService";

interface InitialState {
    groupsData?: IPageDataResponse<IGroup>;
    studentsAutocompleteValues: IStudentAutoCompleteValue[];
    teachersValues: IAutoCompleteValues[];
    currentGroup: IGroup | null;
}

const initialState: InitialState = {
    studentsAutocompleteValues: [],
    teachersValues: [],
    currentGroup: null,
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
        setCurrentGroup: (state, action: PayloadAction<IGroup>) => {
            state.currentGroup = action.payload;
        },
        setTeacherAutocompleteValues: (state, action: PayloadAction<IAutoCompleteValues[]>) => {
            state.teachersValues = action.payload
        }
    },
});

export const { setGroups, setStudentsAutocompleteValues, setCurrentGroup, setTeacherAutocompleteValues } = groupsSlice.actions;

export const fetchGroups = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const groupsData = await GroupsService.getGroups(page, rowPerPage);
            dispatch(setGroups(groupsData));
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchFormData = (): AppThunk => {
    return async dispatch => {
        try {
            const students = StudentsService.getStudents();
            const teachers = await TeachersService.getTeachers();

            const studentsAutoCompleteValues: IStudentAutoCompleteValue[] = students.map(student => {
                return { label: student.firstName, value: String(student.id) };
            });

            const teachersValues: IAutoCompleteValues[] = teachers.data.map((teacher) => {
                return { label: `${teacher.lastName} ${teacher.firstName}`, value: String(teacher.id) };
            })
            console.log(teachersValues)

            dispatch(setStudentsAutocompleteValues(studentsAutoCompleteValues));
            dispatch(setTeacherAutocompleteValues(teachersValues))
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchGroupById = (id: number): AppThunk => {
    return async dispatch => {
        try {
            const group = await GroupsService.getGroupById(id);
            dispatch(setCurrentGroup(group));
        } catch (e) {
            console.log(e);
        }
    };
};

export const createOrUpdateGroup = (groupCreateValues: any): AppThunk => {
    return async dispatch => {
        try {
            GroupsService.createGroup(groupCreateValues);
        } catch (e) {
            console.log(e);
        }
    };
};

export const deleteGroup = (): AppThunk => {
    return async dispatch => {
        try {
            console.log('fsdf');
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectGroupsState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
