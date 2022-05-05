import { IPageDataResponse } from '../../../services/responses/types';
import { IFeed } from '../../../interfaces/IFeed';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { toastConfig } from '../../../utils/toastConfig';
import FeedsService from '../../../services/FeedService';

interface InitialState {
    feedsData?: IPageDataResponse<IFeed>;
    feed?: IFeed;
    page: number;
    rowsPerPage: number;
    isLoading: boolean;
}

const initialState: InitialState = {
    page: 0,
    rowsPerPage: 10,
    isLoading: false,
};
const feedsReducer = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeeds: (state, action: PayloadAction<IPageDataResponse<IFeed> | undefined>) => {
            state.feedsData = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
        },
        setFeedsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setFeed: (state, action: PayloadAction<IFeed>) => {
            state.feed = action.payload;
        },
    },
});

export const { setFeeds, setPage, setFeedsLoading, setRowsPerPage, setFeed } = feedsReducer.actions;

export const fetchFeedsAction = (page: number, rowPerPage: number): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setFeedsLoading(true));
            const feeds = await FeedsService.getFeeds(page + 1, rowPerPage);
            dispatch(setFeeds(feeds));
            if (feeds.data.length == 0) {
                dispatch(setPage(0));
            }
            dispatch(setFeedsLoading(false));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    };
};

export const createOrUpdateFeedAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            if (values.id) {
                await FeedsService.updateFeed(values);
            } else {
                await FeedsService.createFeed(values);
            }

            const { page, rowsPerPage } = getState().feeds;
            dispatch(fetchFeedsAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const getFeedByIdAction = (id: number): AppThunk => {
    return async dispatch => {
        try {
            const feed = await FeedsService.getFeed(id);
            dispatch(setFeed(feed));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const deleteFeedAction = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await FeedsService.deleteFeed(id);
            const { page, rowsPerPage } = getState().feeds;
            dispatch(fetchFeedsAction(page, rowsPerPage));
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
            console.log(e);
        }
    };
};

export const selectFeedsState = (state: RootState) => state.feeds;

export default feedsReducer.reducer;
