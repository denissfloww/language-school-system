import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import scheduleReducer from './reducers/scheduleReducer';

const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
