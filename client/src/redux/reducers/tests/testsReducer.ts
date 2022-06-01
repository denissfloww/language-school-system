import { IPageDataResponse } from '../../../services/responses/types';
import { ILanguage } from '../../../interfaces/ILanguage';
import { ITest } from '../../../interfaces/ITest';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface InitialState {
    tests: ITest[];
}

const initialState: InitialState = {
    tests: [],
};

const testsSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        setTests: (state, action: PayloadAction<ITest[]>) => {
            state.tests = action.payload;
        },
    },
});

export const { setTests } = testsSlice.actions;

export const selectTestsState = (state: RootState) => state.tests;

export default testsSlice.reducer;
