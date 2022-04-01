import { IPageDataResponse } from '../../../services/responses/types';
import { ILessonType } from '../../../interfaces/ILessonType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import LessonTypesService from '../../../services/LessonTypesService';
import { setGroupLoading } from '../groups/groupsReducer';

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
        setLessonTypes: (state, action: PayloadAction<IPageDataResponse<ILessonType>>) => {
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

export const fetchLessonTypes = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            console.log('тута')
            dispatch(setGroupLoading(true));
            const lessonTypes = await LessonTypesService.getLessonTypes(page + 1, rowPerPage);
            dispatch(setLessonTypes(lessonTypes));
            if (lessonTypes.data.length == 0) {
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

export const createLessonTypes = (values: any): AppThunk => {
    return async dispatch => {
        try {
            let message: string = 'Успешно добавлено!';
            await LessonTypesService.createLessonType(values)
            toast.success(message, toastConfig);
        }
        catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    }

}

export const selectLessonTypesState = (state: RootState) => state.lessonTypes;

export default lessonTypesSlice.reducer;
