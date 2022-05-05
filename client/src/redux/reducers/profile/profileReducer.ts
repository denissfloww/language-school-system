import { getValidationUserInfoForm } from '../../../pages/PersonalPage/UserInfoForm/FormModel/validationSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import GroupsService from '../../../services/GroupsService';
import { IGroup } from '../../../interfaces/IGroup';

interface InitialState {
    validationSchema: any[];
    studentGroups: IGroup[];
    teacherGroups: IGroup[];
    isGridLoading: boolean;
}

const initialState: InitialState = {
    validationSchema: getValidationUserInfoForm(false),
    studentGroups: [],
    teacherGroups: [],
    isGridLoading: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserInfoValidation: (state, action: PayloadAction<any[]>) => {
            state.validationSchema = action.payload;
        },
        setStudentGroups: (state, action: PayloadAction<IGroup[]>) => {
            state.studentGroups = action.payload;
        },
        setTeacherGroups: (state, action: PayloadAction<IGroup[]>) => {
            state.teacherGroups = action.payload;
        },
        setGridLoading: (state, action: PayloadAction<boolean>) => {
            state.isGridLoading = action.payload;
        },
    },
});

export const { setUserInfoValidation, setStudentGroups, setGridLoading, setTeacherGroups } = profileSlice.actions;

export const fetchUserStudentGroupsAction = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setGridLoading(true));
            const { user } = getState().auth;
            const studentGroups = await GroupsService.getUserGroups(Number(user?.id));

            dispatch(setStudentGroups(studentGroups));
            dispatch(setGridLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const fetchUserTeacherGroupsAction = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setGridLoading(true));
            const { user } = getState().auth;
            const teacherGroups = await GroupsService.getUserGroups(Number(user?.id));

            dispatch(setTeacherGroups(teacherGroups));
            dispatch(setGridLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const selectProfileState = (state: RootState) => state.profile;

export default profileSlice.reducer;
