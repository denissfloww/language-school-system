import { IPageDataResponse } from '../../../services/responses/types';
import { ICost } from '../../../interfaces/ICost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import CostsService from '../../../services/CostsService';
import LanguageService from '../../../services/LanguageService';
import { fetchLanguagesAction } from '../language/languageReducer';

interface InitialState {
    costsData?: IPageDataResponse<ICost>;
    page: number;
    rowsPerPage: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    page: 0,
    rowsPerPage: 10,
    isLoading: false,
};

const costSlice = createSlice({
    name: 'lessonTypes',
    initialState,
    reducers: {
        setCosts: (state, action: PayloadAction<IPageDataResponse<ICost> | undefined>) => {
            state.costsData = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
        },
        setCostsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setCosts, setPage, setCostsLoading, setRowsPerPage } = costSlice.actions;

export const fetchCostsAction = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setCostsLoading(true));
            const costs = await CostsService.getCosts(page + 1, rowPerPage);
            dispatch(setCosts(costs));
            if (costs.data.length == 0) {
                dispatch(setPage(0));
            }
            dispatch(setCostsLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const deleteCostAction = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await CostsService.deleteCost(id);
            const { page, rowsPerPage } = getState().cost;
            dispatch(fetchCostsAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const createOrUpdateCostAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            if (values.id) {
                await CostsService.updateCost(values);
            } else {
                await CostsService.createCost(values);
            }

            const { page, rowsPerPage } = getState().cost;
            dispatch(fetchCostsAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const selectCostsState = (state: RootState) => state.cost;

export default costSlice.reducer;
