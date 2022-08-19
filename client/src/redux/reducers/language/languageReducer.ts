import { INewPageDataResponse, IPageDataResponse } from '../../../services/responses/types';
import { ILanguage } from '../../../interfaces/ILanguage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import LanguageService from '../../../services/LanguageService';

interface InitialState {
    languagesData?: INewPageDataResponse<ILanguage>;
    page: number;
    limit: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    page: 0,
    limit: 10,
    isLoading: false,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguages: (state, action: PayloadAction<INewPageDataResponse<ILanguage> | undefined>) => {
            state.languagesData = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setLanguagesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLanguages, setPage, setLanguagesLoading, setRowsPerPage } = languageSlice.actions;

export const fetchLanguagesAction = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLanguagesLoading(true));
            const languages = await LanguageService.getLanguages(page + 1, rowPerPage);
            dispatch(setLanguages(languages));
            if (languages.data.length == 0) {
                dispatch(setPage(0));
            }
            dispatch(setLanguagesLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const deleteLanguageAction = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await LanguageService.deleteLanguage(id);
            const { page, limit } = getState().languages;
            dispatch(fetchLanguagesAction(page, limit));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const createOrUpdateLanguageAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            if (values.id) {
                await LanguageService.updateLanguage(values);
            } else {
                await LanguageService.createLanguage(values);
            }

            const { page, limit } = getState().languages;
            dispatch(fetchLanguagesAction(page, limit));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const selectLanguagesState = (state: RootState) => state.languages;

export default languageSlice.reducer;
