import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../../interfaces/IGroup';
import { AppThunk, RootState } from '../../store';
import GroupsService from '../../../services/GroupsService';
import StudentsService from '../../../services/StudentsService';
import { IStudentAutoCompleteValue } from './types';
import { setLoading } from '../global/globalReducer';
import { IPageDataResponse } from '../../../services/responses/types';

interface InitialState {
    groupsData?: IPageDataResponse<IGroup>;
    studentsAutocompleteValues: IStudentAutoCompleteValue[];
    currentGroup: IGroup | null;
}

const initialState: InitialState = {
    studentsAutocompleteValues: [],
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
    },
});

export const { setGroups, setStudentsAutocompleteValues, setCurrentGroup } = groupsSlice.actions;

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

export const fetchStudentsForForm = (): AppThunk => {
    return async dispatch => {
        try {
            const students = StudentsService.getStudents();

            const studentsAutoCompleteValues: IStudentAutoCompleteValue[] = students.map(student => {
                return { label: student.firstName, value: String(student.id) };
            });

            dispatch(setStudentsAutocompleteValues(studentsAutoCompleteValues));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchGroupById = (id: number): AppThunk => {
    return async dispatch => {
        try {
            const group = GroupsService.getGroupById(id);
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
