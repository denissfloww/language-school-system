import { IPageDataResponse } from '../../../services/responses/types';
import { ILessonType } from '../../../interfaces/ILessonType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import LessonTypesService from '../../../services/LessonTypesService';
import { useSelector } from 'react-redux';
import GroupsService from '../../../services/GroupsService';

interface InitialState {
    lessonTypesData?: IPageDataResponse<ILessonType>;
    page: number;
    rowsPerPage: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    page: 0,
    rowsPerPage: 10,
    isLoading: false,
};

const lessonTypesSlice = createSlice({
    name: 'lessonTypes',
    initialState,
    reducers: {
        setLessonTypes: (state, action: PayloadAction<IPageDataResponse<ILessonType> | undefined>) => {
            state.lessonTypesData = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
        },
        setLessonTypesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLessonTypes, setPage, setLessonTypesLoading, setRowsPerPage } = lessonTypesSlice.actions;

export const fetchLessonTypesAction = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLessonTypesLoading(true));
            const lessonTypes = await LessonTypesService.getLessonTypes(page + 1, rowPerPage);
            dispatch(setLessonTypes(lessonTypes));
            if (lessonTypes.data.length == 0) {
                dispatch(setPage(0));
            }
            dispatch(setLessonTypesLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const createOrUpdateLessonTypesAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            if (values.id) {
                await LessonTypesService.updateLessonType(values);
            } else {
                await LessonTypesService.createLessonType(values);
            }

            const { page, rowsPerPage } = getState().lessonTypes;
            dispatch(fetchLessonTypesAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const deleteLessonTypeAction = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await LessonTypesService.deleteLessonType(id);
            const { page, rowsPerPage } = getState().lessonTypes;
            dispatch(fetchLessonTypesAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const selectLessonTypesState = (state: RootState) => state.lessonTypes;

export default lessonTypesSlice.reducer;
