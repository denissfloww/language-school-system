import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

interface InitialState {
    brands: string[];
    models: string[];
    transmissions: string[];
    fuelTypes: string[];
}

const initialState: InitialState = {
    brands: [],
    models: [],
    transmissions: [],
    fuelTypes: [],
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setScheduleEvents: (state, action: PayloadAction<string[]>) => {
            state.brands = action.payload;
        },
    },
});

export const { setScheduleEvents } = scheduleSlice.actions;

export const fetchBrands = (): AppThunk => {
    return async dispatch => {
        try {
          console.log('f')
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectScheduleState = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
