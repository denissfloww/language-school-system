import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface InitialState {
    isLoading: boolean;
}

const initialState: InitialState = {
    isLoading: false,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
