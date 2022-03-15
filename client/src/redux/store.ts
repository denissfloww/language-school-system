import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import scheduleReducer from './reducers/scheduleReducer';
import groupsReducer from './reducers/groups/groupsReducer';
import usersReducer from './reducers/users/usersReducer';
import authReducer from './reducers/auth/authReducer';
import globalReducer from "./reducers/global/globalReducer";

const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        groups: groupsReducer,
        users: usersReducer,
        auth: authReducer,
        global: globalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
